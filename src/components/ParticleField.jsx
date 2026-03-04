// ─────────────────────────────────────────────────────────────────────────────
// components/ParticleField.jsx
//
// Partículas minúsculas flutuando no fundo do Hero.
// Canvas puro — zero dependências externas, zero impacto no bundle.
//
// Otimizações:
//   - requestAnimationFrame com throttle a 40fps (suficiente, poupa CPU)
//   - Partículas pausam quando a aba fica em segundo plano (visibilitychange)
//   - ResizeObserver redimensiona o canvas sem recriar partículas
//   - Cleanup completo no unmount (sem memory leaks)
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from "react";

// ── Configurações — ajuste aqui para mudar o visual ──────────────────────────
const CONFIG = {
  count:        90,          // número de partículas
  minSize:      0.5,         // raio mínimo em px
  maxSize:      1.8,         // raio máximo em px
  minSpeed:     0.06,        // velocidade mínima
  maxSpeed:     0.22,        // velocidade máxima
  minOpacity:   0.04,        // opacidade mínima (quase invisível)
  maxOpacity:   0.28,        // opacidade máxima
  color:        "200,240,101", // RGB do verde-lima (--accent)
  fps:          40,           // frames por segundo alvo
};

export function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // ── Redimensiona canvas para cobrir o container ───────────────────────────
    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width  = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    // ── Cria partículas ───────────────────────────────────────────────────────
    const rand = (min, max) => Math.random() * (max - min) + min;

    const particles = Array.from({ length: CONFIG.count }, () => ({
      x:       rand(0, canvas.width),
      y:       rand(0, canvas.height),
      r:       rand(CONFIG.minSize, CONFIG.maxSize),
      vx:      rand(-1, 1) * rand(CONFIG.minSpeed, CONFIG.maxSpeed),
      vy:      rand(-1, 1) * rand(CONFIG.minSpeed, CONFIG.maxSpeed),
      opacity: rand(CONFIG.minOpacity, CONFIG.maxOpacity),
      // fase aleatória para o pulsar não ficar sincronizado
      phase:   rand(0, Math.PI * 2),
      // velocidade do pulsar
      pulse:   rand(0.004, 0.012),
    }));

    // ── Loop de animação ──────────────────────────────────────────────────────
    const interval = 1000 / CONFIG.fps;
    let lastTime   = 0;
    let raf        = null;
    let paused     = false;

    const draw = (timestamp) => {
      raf = requestAnimationFrame(draw);
      if (paused) return;

      // Throttle ao FPS alvo
      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap ao sair da tela (aparece do outro lado)
        if (p.x < -p.r)               p.x = canvas.width  + p.r;
        if (p.x > canvas.width  + p.r) p.x = -p.r;
        if (p.y < -p.r)               p.y = canvas.height + p.r;
        if (p.y > canvas.height + p.r) p.y = -p.r;

        // Pulsar suave na opacidade
        p.phase += p.pulse;
        const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.phase));

        // Desenha — círculo com glow sutil
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CONFIG.color},${alpha.toFixed(3)})`;
        ctx.fill();

        // Halo leve ao redor das partículas maiores
        if (p.r > 1.2) {
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
          grd.addColorStop(0, `rgba(${CONFIG.color},${(alpha * 0.15).toFixed(3)})`);
          grd.addColorStop(1, `rgba(${CONFIG.color},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }
      });
    };

    raf = requestAnimationFrame(draw);

    // Pausa quando aba fica em background (economiza bateria/CPU)
    const handleVisibility = () => { paused = document.hidden; };
    document.addEventListener("visibilitychange", handleVisibility);

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "absolute",
        inset:         0,
        width:         "100%",
        height:        "100%",
        pointerEvents: "none",   // não interfere com cliques
        zIndex:        0,
      }}
    />
  );
}
