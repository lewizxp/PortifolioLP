// ─────────────────────────────────────────────────────────────────────────────
// components/Marquee.jsx
// Faixa horizontal com as tecnologias rolando em loop infinito.
// ─────────────────────────────────────────────────────────────────────────────
import { MARQUEE_ITEMS } from "../data/content";

export function Marquee() {
  // Duplica os itens para criar o efeito de loop contínuo
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      style={{
        overflow:     "hidden",
        borderTop:    "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding:      "15px 0",
        background:   "var(--surface)",
      }}
    >
      <div
        style={{
          display:   "flex",
          gap:       48,
          animation: "marquee 24s linear infinite",
          width:     "max-content",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily:    "Syne, sans-serif",
              fontSize:      12,
              fontWeight:    600,
              color:         "var(--muted)",
              letterSpacing: ".12em",
              textTransform: "uppercase",
              whiteSpace:    "nowrap",
              display:       "inline-flex",
              alignItems:    "center",
              gap:           48,
            }}
          >
            {item}
            <span style={{ color: "var(--accent)", fontSize: 7 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
