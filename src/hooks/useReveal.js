import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// useReveal
// Hook que observa quando um elemento entra na tela (scroll) e dispara
// a animação com um delay opcional em milissegundos.
//
// Como usar:
//   const [ref, visible] = useReveal(200); // 200ms de delay
//   <div ref={ref} style={{ opacity: visible ? 1 : 0 }}>...</div>
// ─────────────────────────────────────────────────────────────────────────────
export function useReveal(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect(); // para de observar após aparecer
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return [ref, visible];
}
