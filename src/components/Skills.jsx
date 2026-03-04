// ─────────────────────────────────────────────────────────────────────────────
// components/Skills.jsx — com animações
//
// Animações:
//   - Cards entram com stagger escalonado (não todos juntos)
//   - Ícone do card flutua em loop suave
//   - Barras crescem com easing + glow que pulsa ao terminar
//   - Porcentagem conta de 0 até o valor junto com a barra
//   - Tags extras aparecem em cascata uma a uma
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "./SectionLabel";

const SKILL_GROUPS = [
  {
    label: { PT: "Front-end", EN: "Front-end" },
    icon:  "◈",
    items: [
      { name: "React",        level: 85 },
      { name: "Next.js",      level: 75 },
      { name: "TypeScript",   level: 70 },
      { name: "Tailwind CSS", level: 80 },
      { name: "Figma",        level: 82 },
    ],
  },
  {
    label: { PT: "Back-end", EN: "Back-end" },
    icon:  "◇",
    items: [
      { name: "Node.js",    level: 78 },
      { name: "PostgreSQL", level: 72 },
      { name: "REST API",   level: 85 },
      { name: "MongoDB",    level: 65 },
    ],
  },
  {
    label: { PT: "Ferramentas", EN: "Tools" },
    icon:  "○",
    items: [
      { name: "Git / GitHub", level: 88 },
      { name: "Vite",         level: 82 },
      { name: "Vercel",       level: 80 },
      { name: "VS Code",      level: 90 },
    ],
  },
];

const EXTRA_TAGS = ["React Native", "Python", "Docker", "AWS", "GraphQL", "Prisma", "Jest", "Linux"];

// ── Contador 0 → target quando ativo ─────────────────────────────────────────
function useCountUp(target, active, delay, duration = 1100) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf;
    const startAt = performance.now() + delay;
    const step = (now) => {
      if (now < startAt) { raf = requestAnimationFrame(step); return; }
      const p = Math.min((now - startAt) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(e * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, delay, duration]);
  return val;
}

// ── Barra individual ──────────────────────────────────────────────────────────
function SkillBar({ name, level, barDelay, active }) {
  const [barW,   setBarW]  = useState(0);
  const [glowing, setGlow] = useState(false);
  const count = useCountUp(level, active, barDelay);

  useEffect(() => {
    if (!active) return;
    const t1 = setTimeout(() => setBarW(level), barDelay);
    const t2 = setTimeout(() => setGlow(true),  barDelay + 1300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [active, level, barDelay]);

  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:8 }}>
        <span style={{ fontFamily:"DM Sans,sans-serif", fontSize:13, color:"#aaaaaa" }}>{name}</span>
        <span style={{
          fontFamily:"Syne,sans-serif", fontSize:10, fontWeight:700,
          color:"var(--accent)", fontVariantNumeric:"tabular-nums",
          opacity: active ? 1 : 0, transition:"opacity .4s",
          minWidth:28, textAlign:"right",
        }}>{count}%</span>
      </div>

      <div style={{ width:"100%", height:2, background:"var(--border)", borderRadius:2, overflow:"hidden" }}>
        <div style={{
          height:"100%", width:`${barW}%`,
          background:"linear-gradient(90deg, var(--accent) 0%, rgba(200,240,101,.5) 100%)",
          borderRadius:2,
          transition:`width 1.15s ${barDelay}ms cubic-bezier(.22,.68,0,1.2)`,
          animation: glowing ? "barPulse 2.8s ease-in-out infinite" : "none",
        }}/>
      </div>
    </div>
  );
}

// ── Card de categoria ─────────────────────────────────────────────────────────
function SkillCard({ group, lang, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const cardDelay = index * 150;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:      "var(--surface)",
        border:          `1px solid ${hovered ? "rgba(200,240,101,.3)" : "var(--border)"}`,
        borderRadius:    4,
        padding:         "clamp(24px,3vw,36px)",
        height:          "100%",
        boxShadow:       hovered ? "0 8px 40px rgba(200,240,101,.05)" : "none",
        opacity:         visible ? 1 : 0,
        transform:       "none",
        transition:      `opacity .5s ${cardDelay}ms, border-color .3s, box-shadow .3s`,
      }}
    >
      {/* Header */}
      <div style={{
        display:"flex", alignItems:"center", gap:12,
        marginBottom:26, paddingBottom:20, borderBottom:"1px solid var(--border)",
      }}>
        <span style={{
          fontFamily:"Syne,sans-serif", fontSize:20, color:"var(--accent)",
          display:"inline-block",

        }}>{group.icon}</span>

        <span style={{
          fontFamily:"DM Sans,sans-serif", fontSize:11, fontWeight:500,
          letterSpacing:".1em", textTransform:"uppercase", color:"var(--muted)",
        }}>{group.label[lang]}</span>

        <span style={{
          marginLeft:"auto", fontFamily:"Syne,sans-serif",
          fontSize:10, color:"rgba(200,240,101,.3)",
        }}>{group.items.length}</span>
      </div>

      {group.items.map((item, i) => (
        <SkillBar
          key={item.name}
          name={item.name}
          level={item.level}
          barDelay={cardDelay + i * 90 + 200}
          active={visible}
        />
      ))}
    </div>
  );
}

// ── Seção principal ───────────────────────────────────────────────────────────
export function Skills({ lang }) {
  const ref = useRef(null);
  const [vis, setVis]       = useState(false);
  const [tagVis, setTagVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!vis) return;
    const t = setTimeout(() => setTagVis(true), 850);
    return () => clearTimeout(t);
  }, [vis]);

  return (
    <section ref={ref} style={{ padding:"130px clamp(24px,5vw,80px)" }}>
      <style>{`
@keyframes barPulse {
          0%,100% { box-shadow:0 0 6px rgba(200,240,101,.3),0 0 2px rgba(200,240,101,.6); }
          50%      { box-shadow:0 0 14px rgba(200,240,101,.55),0 0 4px rgba(200,240,101,.9); }
        }

      `}</style>

      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <SectionLabel n="03" label="Skills" />

        {/* Título */}
        <h2 style={{
          fontFamily:"Syne,sans-serif",
          fontSize:"clamp(28px,4vw,54px)",
          fontWeight:800, letterSpacing:"-.03em", lineHeight:1.08,
          marginBottom:"clamp(40px,6vw,72px)",
          opacity:    vis ? 1 : 0,
          transition: "opacity .7s",
        }}>
          {lang === "EN"
            ? <>Technologies I <span style={{color:"var(--accent)"}}>work with.</span></>
            : <>Tecnologias que eu <span style={{color:"var(--accent)"}}>domino.</span></>
          }
        </h2>

        {/* Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:24 }}>
          {SKILL_GROUPS.map((g, i) => (
            <SkillCard key={g.label.PT} group={g} lang={lang} index={i} visible={vis} />
          ))}
        </div>

        {/* Tags extras em cascata */}
        <div style={{
          marginTop:48, paddingTop:32, borderTop:"1px solid var(--border)",
          display:"flex", flexWrap:"wrap", gap:10, alignItems:"center",
          opacity: tagVis ? 1 : 0, transition:"opacity .5s",
        }}>
          <span style={{
            fontFamily:"DM Sans,sans-serif", fontSize:10, color:"var(--muted)",
            letterSpacing:".1em", textTransform:"uppercase", marginRight:8,
          }}>
            {lang === "EN" ? "Also familiar with" : "Também conheço"}
          </span>
          {EXTRA_TAGS.map((tag, i) => (
            <span key={tag}
              onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(200,240,101,.35)"; e.currentTarget.style.color="var(--accent)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--muted)"; }}
              style={{
                fontFamily:"DM Sans,sans-serif", fontSize:11,
                color:"var(--muted)", background:"var(--surface2)",
                border:"1px solid var(--border)", padding:"4px 12px", borderRadius:2,
                opacity: tagVis ? 1 : 0,
                transition: `opacity .3s ${i*40}ms, border-color .2s, color .2s`,
                cursor:"default",
              }}>{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
