import { useState, useEffect, useRef } from "react";

// Anima um número de 0 até o valor final quando entra na tela.
// Uso: const { ref, value } = useCounter(42, { duration: 1800, delay: 400 })
export function useCounter(target, { duration = 1600, delay = 0 } = {}) {
  const ref        = useRef(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { obs.disconnect(); setTimeout(() => setStarted(true), delay); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { ref, value };
}
