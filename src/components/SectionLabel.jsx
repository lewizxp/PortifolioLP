// ─────────────────────────────────────────────────────────────────────────────
// components/SectionLabel.jsx
// Cabeçalho de seção no estilo "01 / Sobre ──────────"
// ─────────────────────────────────────────────────────────────────────────────
import { Reveal } from "./Reveal";

export function SectionLabel({ n, label }) {
  return (
    <Reveal>
      <div
        style={{
          display:       "flex",
          alignItems:    "center",
          gap:           16,
          marginBottom:  72,
        }}
      >
        <span
          style={{
            fontFamily:    "DM Sans, sans-serif",
            fontSize:      10,
            color:         "var(--accent)",
            letterSpacing: ".16em",
            textTransform: "uppercase",
          }}
        >
          {n} / {label}
        </span>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      </div>
    </Reveal>
  );
}
