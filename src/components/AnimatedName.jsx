
import { useState, useEffect } from "react";
import { NAME_VARIANTS } from "../data/content";

export function AnimatedName() {
  const [vIdx,  setVIdx]  = useState(0);
  const [text,  setText]  = useState("");
  const [phase, setPhase] = useState("typing"); // "typing" | "hold" | "erasing"

  useEffect(() => {
    const full = NAME_VARIANTS[vIdx].text;
    let timeout;

    if (phase === "typing") {
      if (text.length < full.length) {
        
        timeout = setTimeout(
          () => setText(full.slice(0, text.length + 1)),
          65 + Math.random() * 50
        );
      } else {
       
        timeout = setTimeout(() => setPhase("hold"), 1800);
      }

    } else if (phase === "hold") {
      timeout = setTimeout(() => setPhase("erasing"), 400);

    } else {
      // Apagando
      if (text.length > 0) {
        timeout = setTimeout(() => setText((s) => s.slice(0, -1)), 26);
      } else {
        // Passou para o próximo idioma
        setVIdx((i) => (i + 1) % NAME_VARIANTS.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, vIdx]);

  const { lang } = NAME_VARIANTS[vIdx];
  const isRTL    = lang === "AR";

  return (
    <div style={{ display: "inline-flex", alignItems: "flex-start", gap: 10 }}>
      {/* Nome com cursor piscante */}
      <span
        className="hero-name"
        style={{
          fontFamily:    "Syne, sans-serif",
          fontWeight:    800,
          fontSize:      "clamp(50px, 8vw, 98px)",
          lineHeight:    1,
          letterSpacing: "-0.03em",
          color:         "#e4e4e4",
          direction:     isRTL ? "rtl" : "ltr",
          whiteSpace:    "nowrap",
        }}
      >
        {text}
        {/* Cursor piscante verde */}
        <span
          style={{
            display:       "inline-block",
            width:         "clamp(3px, .5vw, 5px)",
            height:        "0.8em",
            background:    "var(--accent)",
            marginLeft:    5,
            verticalAlign: "middle",
            borderRadius:  1,
            animation:     "blink .7s step-end infinite",
          }}
        />
      </span>

      {/* Badge com o idioma atual */}
      <span
        style={{
          fontFamily:    "DM Sans, sans-serif",
          fontSize:      9,
          fontWeight:    500,
          letterSpacing: "0.14em",
          color:         "var(--accent)",
          border:        "1px solid var(--accent)",
          padding:       "3px 7px",
          borderRadius:  2,
          marginTop:     8,
          whiteSpace:    "nowrap",
          opacity:       phase === "erasing" && text.length < 3 ? 0 : 1,
          transition:    "opacity .2s",
        }}
      >
        {lang}
      </span>
    </div>
  );
}
