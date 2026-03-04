
import { useEffect, useRef } from "react";

const LINES = [
  {
    PT: "código limpo.",
    EN: "clean code.",
    speed: 0.06,
    align: "flex-start",
    x: "8%",
    size: "clamp(44px,7vw,100px)",
    weight: 800,
    accent: false,
    delay: 0,
  },
  {
    PT: "interfaces que ficam na memória.",
    EN: "interfaces people remember.",
    speed: -0.04,
    align: "flex-end",
    x: "0%",
    size: "clamp(22px,3.2vw,46px)",
    weight: 300,
    accent: false,
    delay: 80,
  },
  {
    PT: "sistemas que escalam.",
    EN: "systems that scale.",
    speed: 0.09,
    align: "center",
    x: "0%",
    size: "clamp(34px,5.5vw,78px)",
    weight: 800,
    accent: true,
    delay: 160,
  },
  {
    PT: "do figma ao deploy.",
    EN: "figma to deploy.",
    speed: -0.07,
    align: "flex-start",
    x: "12%",
    size: "clamp(20px,2.8vw,40px)",
    weight: 300,
    accent: false,
    delay: 240,
  },
  {
    PT: "produtos digitais reais.",
    EN: "real digital products.",
    speed: 0.05,
    align: "flex-end",
    x: "0%",
    size: "clamp(28px,4.2vw,60px)",
    weight: 800,
    accent: false,
    delay: 120,
  },
];

function ParallaxLine({ textPT, textEN, lang, speed, align, x, size, weight, accent, delay }) {
  const ref     = useRef(null);
  const visible = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fade + slide ao entrar
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible.current) {
          visible.current = true;
          el.style.transition = `opacity .8s ${delay}ms cubic-bezier(.22,.68,0,1.2), transform .9s ${delay}ms cubic-bezier(.22,.68,0,1.2)`;
          el.style.opacity   = "1";
          el.style.transform = `translateX(${x}) translateY(0px)`;
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);

    // Parallax ao scrollar — só quando visível
    const onScroll = () => {
      if (!visible.current) return;
      const rect    = el.parentElement.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2 - window.innerHeight / 2;
      const shift   = centerY * speed;
      // Mantém o translateX, só muda Y
      el.style.transform = `translateX(${x}) translateY(${shift}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [speed, x, delay]);

  const text = lang === "EN" ? textEN : textPT;

  return (
    <div
      ref={ref}
      style={{
        display:        "flex",
        justifyContent: align,
        width:          "100%",
        opacity:        0,
        transform:      `translateX(${x}) translateY(32px)`,
        willChange:     "transform, opacity",
      }}
    >
      <span style={{
        fontFamily:    "Syne, sans-serif",
        fontSize:      size,
        fontWeight:    weight,
        lineHeight:    1.05,
        letterSpacing: weight === 800 ? "-.03em" : "-.01em",
        color:         accent ? "var(--accent)" : "var(--text)",
        whiteSpace:    "nowrap",
      }}>
        {text}
      </span>
    </div>
  );
}

export function ParallaxText({ lang }) {
  const sectionRef = useRef(null);

  // Linha horizontal animada que cruza a seção
  useEffect(() => {
    const el = sectionRef.current?.querySelector(".parallax-line-hr");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = "width 1.2s .1s cubic-bezier(.22,.68,0,1.2)";
          el.style.width      = "100%";
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding:   "clamp(80px,12vw,160px) clamp(24px,5vw,80px)",
        overflow:  "hidden",
        position:  "relative",
      }}
    >
      {/* Linha decorativa que aparece */}
      <div
        className="parallax-line-hr"
        style={{
          width:        0,
          height:       1,
          background:   "var(--border)",
          marginBottom: "clamp(48px,8vw,96px)",
        }}
      />

      {/* Linhas de texto em parallax */}
      <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px,3vw,36px)" }}>
        {LINES.map((line, i) => (
          <ParallaxLine
            key={i}
            lang={lang}
            textPT={line.PT}
            textEN={line.EN}
            speed={line.speed}
            align={line.align}
            x={line.x}
            size={line.size}
            weight={line.weight}
            accent={line.accent}
            delay={line.delay}
          />
        ))}
      </div>

      {/* Linha decorativa de saída */}
      <div
        className="parallax-line-hr"
        style={{
          width:       0,
          height:      1,
          background:  "var(--border)",
          marginTop:   "clamp(48px,8vw,96px)",
        }}
      />
    </section>
  );
}
