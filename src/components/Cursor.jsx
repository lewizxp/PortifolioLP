// ─────────────────────────────────────────────────────────────────────────────
// components/Cursor.jsx
// Cursor personalizado com ponto central e anel que seguem o mouse.
// Funciona apenas em desktop (em mobile o cursor padrão permanece).
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from "react";

export function Cursor() {
  const dot  = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      if (dot.current) {
        dot.current.style.left = e.clientX - 2.5 + "px";
        dot.current.style.top  = e.clientY - 2.5 + "px";
      }
      if (ring.current) {
        ring.current.style.left = e.clientX - 15 + "px";
        ring.current.style.top  = e.clientY - 15 + "px";
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <>
      <div ref={dot}  className="cursor-dot"  />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}
