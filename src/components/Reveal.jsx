// ─────────────────────────────────────────────────────────────────────────────
// components/Reveal.jsx
// Componente que envolve qualquer elemento e o anima quando entra na tela.
//
// Props:
//   children — o conteúdo a animar
//   dir      — direção de entrada: "up" | "left" | "right" (padrão: "up")
//   delay    — atraso em ms antes de animar (padrão: 0)
//   style    — estilos extras opcionais
// ─────────────────────────────────────────────────────────────────────────────
import { useReveal } from "../hooks/useReveal";

export function Reveal({ children, dir = "up", delay = 0, style = {} }) {
  const [ref, visible] = useReveal(delay);

  const baseStyle = {
    opacity: visible ? 1 : 0,
    transform: visible
      ? "translate(0,0)"
      : dir === "up"    ? "translateY(36px)"
      : dir === "left"  ? "translateX(-28px)"
      : dir === "right" ? "translateX(28px)"
      : "translateY(0)",
    transition: `opacity .75s cubic-bezier(.22,.68,0,1.2) ${delay}ms,
                 transform .75s cubic-bezier(.22,.68,0,1.2) ${delay}ms`,
    ...style,
  };

  return (
    <div ref={ref} style={baseStyle}>
      {children}
    </div>
  );
}
