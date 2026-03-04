// ─────────────────────────────────────────────────────────────────────────────
// components/NetworkParticles.jsx
//
// Animação de rede neural no Canvas — zero dependências externas.
// Nós flutuam pelo Hero e se conectam com linhas quando estão próximos.
// O mouse atrai os nós ao redor, criando interação orgânica.
//
// Otimizações:
//   - requestAnimationFrame com cleanup correto
//   - ResizeObserver para adaptar ao tamanho do container
//   - Quantidade de nós limitada por área da tela (não sobrecarrega mobile)
//   - Canvas com devicePixelRatio para telas retina sem blur
//   - Pausa automaticamente quando aba não está visível (Page Visibility API)
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from "react";

// ── Configurações ─────────────────────────────────────────────────────────────
const CONFIG = {
  nodeDensity:    8000,   // 1 nó por X px² de tela
  maxNodes:       90,     // limite absoluto
  minNodes:       20,     // mínimo mesmo em telas pequenas
  nodeRadius:     1.8,    // raio dos nós em px
  speed:          0.28,   // velocidade base de movimento
  connectDist:    140,    // distância máxima para desenhar linha
  mouseRadius:    180,    // raio de influência do mouse
  mouseStrength:  0.04,   // força de atração do mouse (0–1)
  nodeColor:      "200,240,101",  // verde-lima em RGB (sem #)
  lineOpacityMax: 0.18,           // opacidade máxima das linhas
  nodeOpacity:    0.55,           // opacidade dos nós
};

export function NetworkParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Posição do mouse (começa fora da tela)
    const mouse = { x: -9999, y: -9999 };

    // Array de nós
    let nodes = [];
    let animId;
    let paused = false;

    // ── Inicializa ou reinicializa o canvas e os nós ──────────────────────────
    function init() {
      const dpr = window.devicePixelRatio || 1;
      const w   = canvas.offsetWidth;
      const h   = canvas.offsetHeight;

      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);

      // Quantidade de nós proporcional à área
      const count = Math.min(
        CONFIG.maxNodes,
        Math.max(CONFIG.minNodes, Math.floor((w * h) / CONFIG.nodeDensity))
      );

      nodes = Array.from({ length: count }, () => ({
        x:   Math.random() * w,
        y:   Math.random() * h,
        vx:  (Math.random() - 0.5) * CONFIG.speed * 2,
        vy:  (Math.random() - 0.5) * CONFIG.speed * 2,
        r:   CONFIG.nodeRadius * (0.7 + Math.random() * 0.6),
      }));
    }

    // ── Frame de animação ─────────────────────────────────────────────────────
    function draw() {
      if (paused) { animId = requestAnimationFrame(draw); return; }

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);

      // Atualiza posição de cada nó
      for (const n of nodes) {
        // Atração suave pelo mouse
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.mouseRadius && dist > 0) {
          const force = (1 - dist / CONFIG.mouseRadius) * CONFIG.mouseStrength;
          n.vx += dx / dist * force;
          n.vy += dy / dist * force;
        }

        // Limita velocidade máxima
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > CONFIG.speed * 2.5) {
          n.vx = (n.vx / speed) * CONFIG.speed * 2.5;
          n.vy = (n.vy / speed) * CONFIG.speed * 2.5;
        }

        n.x += n.vx;
        n.y += n.vy;

        // Rebate nas bordas suavemente
        if (n.x < 0)  { n.x = 0;  n.vx *= -1; }
        if (n.x > w)  { n.x = w;  n.vx *= -1; }
        if (n.y < 0)  { n.y = 0;  n.vy *= -1; }
        if (n.y > h)  { n.y = h;  n.vy *= -1; }
      }

      // Desenha linhas entre nós próximos
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a  = nodes[i];
          const b  = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d  = Math.sqrt(dx * dx + dy * dy);

          if (d < CONFIG.connectDist) {
            // Opacidade diminui com a distância
            const opacity = (1 - d / CONFIG.connectDist) * CONFIG.lineOpacityMax;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${CONFIG.nodeColor},${opacity})`;
            ctx.lineWidth   = 0.8;
            ctx.stroke();
          }
        }
      }

      // Desenha os nós
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CONFIG.nodeColor},${CONFIG.nodeOpacity})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    // ── Eventos ───────────────────────────────────────────────────────────────
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    // Pausa quando aba não está visível (economiza CPU)
    const handleVisibility = () => { paused = document.hidden; };

    // Reinicializa ao redimensionar
    const ro = new ResizeObserver(() => { init(); });

    canvas.addEventListener("mousemove",  handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibility);
    ro.observe(canvas);

    init();
    draw();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove",  handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      ro.disconnect();
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
        pointerEvents: "none", // não bloqueia cliques nos elementos do Hero
        zIndex:        0,
        opacity:       0.85,
      }}
    />
  );
}
