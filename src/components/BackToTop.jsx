// ─────────────────────────────────────────────────────────────────────────────
// components/BackToTop.jsx
// Botão flutuante que aparece após scrollar 400px.
// Clica e volta suavemente ao topo.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollTop}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Voltar ao topo"
      style={{
        position:   "fixed",
        bottom:     32,
        right:      32,
        zIndex:     300,
        width:      44,
        height:     44,
        borderRadius: 50,
        border:     `1px solid ${hovered ? "var(--accent)" : "rgba(200,240,101,.35)"}`,
        background: hovered ? "var(--accent)" : "rgba(200,240,101,.08)",
        color:      hovered ? "#000" : "var(--accent)",
        cursor:     "pointer",
        display:    "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize:   16,
        fontFamily: "Syne, sans-serif",
        fontWeight: 700,
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity .3s, transform .3s, background .2s, border-color .2s, color .2s",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      ↑
    </button>
  );
}
