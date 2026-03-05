// =============================================================================
// Skills.jsx — "Mapa Estelar"
//
// Cole em src/components/Skills.jsx  (substitui o arquivo atual, sem instalar nada)
//
// Arquitetura:
//   • 3 constelações reais: Gêmeos (Front-end), Orion (Back-end), Leão (UI/UX)
//   • Canvas 2D: estrelas de fundo piscando + partículas atraídas ao foco
//   • Estado de foco: constelação selecionada vai ao centro (scale 1.2x, 100% op)
//     as demais ficam a 5% de opacidade e desfocadas
//   • Linhas SVG "se desenham" entre as estrelas via stroke-dashoffset
//   • Hover em estrela → tooltip "Suspended Card" com glassmorphism + tilt 3D
//   • Drawer lateral desliza com "desenrolar" ao selecionar constelação
//   • Tudo usa APENAS as variáveis CSS do projeto (#c8f065, --surface, etc.)
// =============================================================================
import { useEffect, useRef, useState, useCallback } from "react";
import { SectionLabel } from "./SectionLabel";

// ─────────────────────────────────────────────────────────────────────────────
// DADOS
// ─────────────────────────────────────────────────────────────────────────────
const CONSTELLATIONS = [
  // ── GÊMEOS — duas colunas paralelas (Castor esq + Pollux dir)
  // Baseado na imagem real: dois bastões verticais com pontes entre si
  {
    id: "gemini",
    nameDisplay: { PT: "Gêmeos", EN: "Gemini" },
    category:    { PT: "Front-end", EN: "Front-end" },
    stars: [
      // Coluna esquerda — Castor
      { id:"html",     label:"HTML/CSS",   x:.05, y:.10, size:1.1,
        detail:{ level:"Avançado",      specialty:"Semântica, animações CSS, flexbox/grid" } },
      { id:"next",     label:"Next.js",    x:.10, y:.28, size:1.3,
        detail:{ level:"Intermediário", specialty:"App Router, SSR, API Routes" } },
      { id:"ts",       label:"TypeScript", x:.08, y:.46, size:1.5,
        detail:{ level:"Intermediário", specialty:"Types, interfaces, generics" } },
      { id:"vite",     label:"Vite",       x:.14, y:.63, size:1.0,
        detail:{ level:"Intermediário", specialty:"Build, plugins, HMR" } },
      { id:"tailwind", label:"Tailwind",   x:.06, y:.80, size:1.2,
        detail:{ level:"Intermediário", specialty:"Utility-first, dark mode, responsivo" } },
      // Coluna direita — Pollux (estrela principal, maior)
      { id:"react",    label:"React",      x:.22, y:.14, size:2.0, core:true,
        detail:{ level:"Avançado",      specialty:"Hooks, Context, componentes reutilizáveis" } },
      { id:"bridge",   label:"CSS-in-JS",  x:.19, y:.35, size:0.9,
        detail:{ level:"Intermediário", specialty:"Styled components, estilos dinâmicos" } },
    ],
    edges:[
      // Castor desce
      ["html","next"],["next","ts"],["ts","vite"],["vite","tailwind"],
      // Pollux
      ["react","bridge"],
      // Pontes entre as colunas (os "braços" dos gêmeos)
      ["html","react"],["ts","bridge"],
    ],
    cx: 0.14, cy: 0.46,
  },

  // ── ORION — forma icônica: ombros no topo, cinturão de 3 no centro, pés na base
  // Betelgeuse (esq) + Bellatrix (dir) = ombros
  // Alnitak + Alnilam + Mintaka = cinturão diagonal
  // Saiph + Rigel = pés
  {
    id: "orion",
    nameDisplay: { PT: "Orion", EN: "Orion" },
    category:    { PT: "Back-end / Full Stack", EN: "Back-end / Full Stack" },
    stars: [
      // Ombros
      { id:"git",    label:"Git",        x:.41, y:.08, size:1.5,
        detail:{ level:"Intermediário", specialty:"Branches, PRs, fluxo de equipe" } },
      { id:"node",   label:"Node.js",    x:.58, y:.12, size:2.0, core:true,
        detail:{ level:"Intermediário", specialty:"Express, REST APIs, JWT" } },
      // Cinturão — 3 estrelas em diagonal leve (característica de Orion)
      { id:"api",    label:"REST API",   x:.43, y:.43, size:1.4,
        detail:{ level:"Intermediário", specialty:"Design de endpoints, status codes, JSON" } },
      { id:"pg",     label:"PostgreSQL", x:.50, y:.40, size:1.6,
        detail:{ level:"Intermediário", specialty:"Queries, joins, modelagem relacional" } },
      { id:"mongo",  label:"MongoDB",    x:.57, y:.37, size:1.2,
        detail:{ level:"Básico",        specialty:"Documentos, agregações simples" } },
      // Pés
      { id:"docker", label:"Docker",     x:.44, y:.78, size:1.1,
        detail:{ level:"Básico",        specialty:"Containers, Dockerfile, compose" } },
      { id:"vercel2",label:"Vercel",     x:.60, y:.70, size:1.0,
        detail:{ level:"Básico",        specialty:"Deploy, domínios, vars de ambiente" } },
    ],
    edges:[
      // Ombros entre si
      ["git","node"],
      // Ombros ao cinturão
      ["git","api"],["node","mongo"],
      // Cinturão
      ["api","pg"],["pg","mongo"],
      // Cinturão aos pés
      ["api","docker"],["mongo","vercel2"],
    ],
    cx: 0.50, cy: 0.44,
  },

  // ── LEÃO — foice (sickle) curvada + corpo retangular + cauda (Denebola)
  // Regulus = base da foice (brilhante, baixo)
  // Arco sobe: Regulus → Eta → Gamma → Zeta formam a "cabeça em chama"
  // Corpo: trapézio abaixo-direita
  // Cauda: Denebola isolada à direita
  {
    id: "leo",
    nameDisplay: { PT: "Leão", EN: "Leo" },
    category:    { PT: "UI/UX & Soft Skills", EN: "UI/UX & Soft Skills" },
    stars: [
      // Base da foice (Regulus) — estrela mais brilhante
      { id:"figma",  label:"Figma",       x:.76, y:.72, size:2.0, core:true,
        detail:{ level:"Avançado",       specialty:"Auto Layout, componentes, prototipagem" } },
      // Foice sobe em arco
      { id:"agile",  label:"Agile",       x:.71, y:.55, size:1.2,
        detail:{ level:"Básico",         specialty:"Sprints, daily, retrospectivas" } },
      { id:"clean",  label:"Clean Code",  x:.69, y:.36, size:1.5,
        detail:{ level:"Intermediário",  specialty:"SOLID, nomenclatura, legibilidade" } },
      { id:"a11y",   label:"A11y",        x:.74, y:.20, size:1.0,
        detail:{ level:"Básico",         specialty:"ARIA, contraste, semântica HTML" } },
      // Costas (corpo)
      { id:"ux",     label:"UX Writing",  x:.84, y:.30, size:1.1,
        detail:{ level:"Básico",         specialty:"Microcopy, hierarquia de informação" } },
      // Cauda — Denebola, isolada à direita
      { id:"vercel", label:"Vercel",      x:.95, y:.48, size:1.0,
        detail:{ level:"Básico",         specialty:"Deploy, domínios, vars de ambiente" } },
    ],
    edges:[
      // Foice (arco)
      ["figma","agile"],["agile","clean"],["clean","a11y"],
      // Costas / corpo
      ["a11y","ux"],["ux","figma"],
      // Cauda
      ["ux","vercel"],
    ],
    cx: 0.80, cy: 0.44,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────────────────────────────────────
const lerp  = (a, b, t) => a + (b - a) * t;
const dist2 = (ax,ay,bx,by) => Math.sqrt((ax-bx)**2+(ay-by)**2);

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────
export function Skills({ lang }) {
  const canvasRef   = useRef(null);
  const stateRef    = useRef(null);
  const rafRef      = useRef(null);

  const [focused,   setFocused]   = useState(null);   // id da constelação focada
  const [drawer,    setDrawer]    = useState(null);   // constelação no drawer
  const [drawerVis, setDrawerVis] = useState(false);  // controla animação
  const [tooltip,   setTooltip]   = useState(null);   // { star, x, y, tilt }
  const [svgLines,  setSvgLines]  = useState({});     // progresso das linhas SVG

  // ── Inicializa canvas ────────────────────────────────────────────────────
  const initCanvas = useCallback((W, H) => {
    // Partículas de fundo
    const particles = Array.from({ length: 120 }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - .5) * .18,
      vy: (Math.random() - .5) * .18,
      r:  Math.random() * 1.1 + .3,
      op: Math.random() * .3 + .05,
    }));

    // Estrelas de fundo (não interativas)
    const bgStars = Array.from({ length: 220 }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  Math.random() * 1.0 + .15,
      op: Math.random() * .35 + .05,
      tw: Math.random() * Math.PI * 2,
      ts: .008 + Math.random() * .018,
    }));

    stateRef.current = { particles, bgStars, W, H, mouse: { x: W/2, y: H/2 } };
  }, []);

  // ── Loop canvas ─────────────────────────────────────────────────────────
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !stateRef.current) return;
    const ctx = canvas.getContext("2d");
    const { particles, bgStars, W, H, mouse } = stateRef.current;

    ctx.clearRect(0, 0, W, H);

    // Estrelas de fundo
    bgStars.forEach(s => {
      s.tw += s.ts;
      const op = s.op * (.7 + .3 * Math.sin(s.tw));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,220,255,${op})`;
      ctx.fill();
    });

    // Via láctea sutil
    const mlg = ctx.createLinearGradient(0, H*.05, W*.9, H*.95);
    mlg.addColorStop(0,   "rgba(60,80,140,.0)");
    mlg.addColorStop(.35, "rgba(60,80,160,.055)");
    mlg.addColorStop(.65, "rgba(60,80,160,.055)");
    mlg.addColorStop(1,   "rgba(60,80,140,.0)");
    ctx.fillStyle = mlg;
    ctx.fillRect(0, 0, W, H);

    // Partículas — atraídas ao centro da constelação focada
    const focusConst = focused ? CONSTELLATIONS.find(c => c.id === focused) : null;
    const tx = focusConst ? focusConst.cx * W : mouse.x;
    const ty = focusConst ? focusConst.cy * H : mouse.y;

    particles.forEach(p => {
      // Atração
      const dx = tx - p.x, dy = ty - p.y;
      const d  = Math.sqrt(dx*dx+dy*dy) || 1;
      const strength = focusConst ? .012 : .003;
      p.vx += (dx/d) * strength;
      p.vy += (dy/d) * strength;
      p.vx *= .96; p.vy *= .96;
      p.x  += p.vx; p.y  += p.vy;

      // Wrap
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      // Brilha mais perto do foco
      const pd   = dist2(p.x, p.y, tx, ty);
      const boost = focusConst ? Math.max(0, 1 - pd / (W * .35)) * .4 : 0;
      const col   = focusConst ? "200,240,101" : "180,210,255";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${col},${Math.min(.85, p.op + boost)})`;
      ctx.fill();
    });

    rafRef.current = requestAnimationFrame(drawCanvas);
  }, [focused]);

  // Setup canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initCanvas(canvas.offsetWidth, canvas.offsetHeight);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e) => {
      if (!stateRef.current) return;
      const r = canvas.getBoundingClientRect();
      stateRef.current.mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    rafRef.current = requestAnimationFrame(drawCanvas);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, [initCanvas, drawCanvas]);

  // Re-inicia loop quando foco muda (para atualizar atração das partículas)
  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(drawCanvas);
  }, [focused, drawCanvas]);

  // ── Lógica de foco ─────────────────────────────────────────────────────
  const handleFocus = (id) => {
    if (focused === id) {
      setFocused(null);
      setDrawer(null);
      setDrawerVis(false);
      setSvgLines({});
      return;
    }
    setFocused(id);
    setSvgLines({});  // reseta linhas

    // Abre drawer com delay (espera constelação chegar ao centro)
    const c = CONSTELLATIONS.find(c => c.id === id);
    setTimeout(() => {
      setDrawer(c);
      setDrawerVis(true);
    }, 420);

    // Anima as linhas SVG
    const c2 = CONSTELLATIONS.find(c => c.id === id);
    c2.edges.forEach(([a, b], i) => {
      setTimeout(() => {
        setSvgLines(prev => ({ ...prev, [`${a}-${b}`]: 1 }));
      }, 300 + i * 120);
    });
  };

  const closeDrawer = () => {
    setDrawerVis(false);
    setTimeout(() => { setDrawer(null); }, 380);
    setFocused(null);
    setSvgLines({});
  };

  // ── Tooltip hover ────────────────────────────────────────────────────────
  const handleStarEnter = (e, star, constId) => {
    const rect = e.currentTarget.closest(".skills-canvas-wrap").getBoundingClientRect();
    const sr   = e.currentTarget.getBoundingClientRect();
    setTooltip({
      star, constId,
      x: sr.left - rect.left + sr.width / 2,
      y: sr.top  - rect.top,
    });
  };

  const handleStarLeave = () => setTooltip(null);

  // Tilt 3D no tooltip ao mover mouse
  const handleTooltipMove = (e) => {
    if (!tooltip) return;
    const el  = e.currentTarget;
    const r   = el.getBoundingClientRect();
    const rx  = ((e.clientX - r.left) / r.width  - .5) * 18;
    const ry  = ((e.clientY - r.top)  / r.height - .5) * -18;
    el.style.transform = `perspective(600px) rotateX(${ry}deg) rotateY(${rx}deg) scale(1.03)`;
  };
  const handleTooltipLeave2 = (e) => {
    e.currentTarget.style.transform = "perspective(600px) rotateX(0) rotateY(0) scale(1)";
  };

  // ── SVG paths — calcula comprimento para dashoffset ─────────────────────
  const getLinePath = (c, a, b, W, H) => {
    const sa = c.stars.find(s => s.id === a);
    const sb = c.stars.find(s => s.id === b);
    if (!sa || !sb) return { d: "", len: 0 };
    // Usamos a posição absoluta dentro do wrapper de constelação
    // O wrapper tem 100% width e a altura do canvas
    const x1 = sa.x * W, y1 = sa.y * H;
    const x2 = sb.x * W, y2 = sb.y * H;
    const len = dist2(x1, y1, x2, y2);
    return { d: `M${x1},${y1} L${x2},${y2}`, len };
  };

  return (
    <section style={{ padding: "130px clamp(24px,5vw,80px)", position: "relative" }}>
      <style>{`
        /* Animação das linhas SVG */
        .svg-line {
          stroke-dasharray: var(--len);
          stroke-dashoffset: var(--len);
          transition: stroke-dashoffset 1s cubic-bezier(.22,.68,0,1.2);
        }
        .svg-line.drawn { stroke-dashoffset: 0; }

        /* Tooltip card */
        .star-tooltip {
          transition: transform .18s ease, opacity .2s;
          transform: perspective(600px) rotateX(0) rotateY(0) scale(1);
        }

        /* Estrela hover */
        .star-node:hover { cursor: pointer; }
        .star-node:hover .star-glow { opacity: 1 !important; }

        /* Pulsação das estrelas core */
        @keyframes starPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(200,240,101,.0), 0 0 6px rgba(200,240,101,.35); }
          50%      { box-shadow: 0 0 0 6px rgba(200,240,101,.08), 0 0 16px rgba(200,240,101,.5); }
        }
        .star-core-pulse { animation: starPulse 2.8s ease-in-out infinite; }

        @keyframes twinkle {
          0%,100% { opacity:.85; } 50% { opacity:.4; }
        }

        /* Scanline do drawer */
        @keyframes drawerScan {
          0%   { top:0;    opacity:.5; }
          100% { top:100%; opacity:0; }
        }
        .drawer-scanline {
          animation: drawerScan 3.2s linear infinite;
        }

        /* Const label */
        .const-label {
          transition: opacity .3s, letter-spacing .3s;
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel n="03" label="Skills" />

        {/* Título */}
        <div style={{
          fontFamily:"Syne,sans-serif", fontWeight:800,
          fontSize:"clamp(28px,4vw,54px)", letterSpacing:"-.03em", lineHeight:1.08,
          marginBottom:"clamp(16px,3vw,28px)",
        }}>
          {lang === "EN"
            ? <>Stellar <span style={{color:"var(--accent)"}}>map.</span></>
            : <>Mapa <span style={{color:"var(--accent)"}}>estelar.</span></>
          }
        </div>

        {/* Subtítulo */}
        <p style={{
          fontFamily:"DM Sans", fontSize:12, color:"var(--muted)",
          letterSpacing:".08em", marginBottom:32,
          textTransform:"uppercase",
          animation:"hintPulse 3s ease-in-out infinite",
        }}>
          <style>{`@keyframes hintPulse{0%,100%{opacity:.4;}50%{opacity:.8;}}`}</style>
          {lang==="EN"
            ? "click a constellation to focus · hover a star to inspect"
            : "clique em uma constelação para focar · hover numa estrela para ver detalhes"
          }
        </p>

        {/* Botões de navegação das constelações */}
        <div style={{ display:"flex", gap:12, marginBottom:28, flexWrap:"wrap" }}>
          {CONSTELLATIONS.map(c => (
            <button key={c.id} onClick={() => handleFocus(c.id)}
              style={{
                fontFamily:"DM Sans", fontSize:10, fontWeight:500,
                letterSpacing:".12em", textTransform:"uppercase",
                padding:"8px 18px", borderRadius:2,
                border:`1px solid ${focused===c.id ? "var(--accent)" : "var(--border)"}`,
                background: focused===c.id ? "var(--accentDim)" : "var(--surface)",
                color: focused===c.id ? "var(--accent)" : "var(--muted)",
                cursor:"pointer",
                transition:"border-color .25s, color .25s, background .25s",
              }}
            >
              {c.nameDisplay[lang==="EN"?"EN":"PT"]}
              <span style={{ marginLeft:6, opacity:.5 }}>—</span>
              <span style={{ marginLeft:6 }}>{c.category[lang==="EN"?"EN":"PT"]}</span>
            </button>
          ))}
          {focused && (
            <button onClick={closeDrawer} style={{
              fontFamily:"DM Sans", fontSize:10, letterSpacing:".12em",
              textTransform:"uppercase", padding:"8px 16px", borderRadius:2,
              border:"1px solid var(--border)", background:"transparent",
              color:"var(--muted2)", cursor:"pointer", transition:"color .2s",
            }}
              onMouseEnter={e=>e.currentTarget.style.color="var(--text)"}
              onMouseLeave={e=>e.currentTarget.style.color="var(--muted2)"}
            >
              {lang==="EN"?"× clear":"× limpar"}
            </button>
          )}
        </div>

        {/* Layout duas colunas: canvas | drawer */}
        <div style={{ display:"flex", alignItems:"stretch" }}>

          {/* Canvas wrapper */}
          <div className="skills-canvas-wrap" style={{
            position:"relative", flex:1,
            height:"clamp(340px,50vw,560px)",
            borderRadius: drawerVis ? "4px 0 0 4px" : 4,
            border:"1px solid var(--border)",
            borderRight: drawerVis ? "1px solid transparent" : "1px solid var(--border)",
            overflow:"hidden",
            transition:"border-radius .35s",
          }}>
          {/* Canvas de fundo */}
          <canvas ref={canvasRef} style={{
            position:"absolute", inset:0, width:"100%", height:"100%",
            background:"#04080f",
          }}/>

          {/* Constelações */}
          {CONSTELLATIONS.map(c => {
            const isFocused = focused === c.id;
            const isOther   = focused && focused !== c.id;
            return (
              <ConstellationLayer
                key={c.id}
                c={c}
                lang={lang}
                isFocused={isFocused}
                isOther={isOther}
                svgLines={svgLines}
                tooltip={tooltip}
                onFocus={() => handleFocus(c.id)}
                onStarEnter={handleStarEnter}
                onStarLeave={handleStarLeave}
              />
            );
          })}

          {/* Tooltip "Suspended Card" */}
          {tooltip && (
            <div
              className="star-tooltip"
              onMouseMove={handleTooltipMove}
              onMouseLeave={handleTooltipLeave2}
              style={{
                position:"absolute",
                left: tooltip.x, top: tooltip.y,
                transform:"translate(-50%, calc(-100% - 16px)) perspective(600px)",
                zIndex:20,
                background:"rgba(14,14,14,.88)",
                backdropFilter:"blur(16px)",
                WebkitBackdropFilter:"blur(16px)",
                border:"1px solid rgba(200,240,101,.2)",
                borderRadius:4,
                padding:"14px 18px",
                minWidth:180,
                boxShadow:"0 16px 48px rgba(0,0,0,.55), 0 0 0 1px rgba(200,240,101,.06)",
                pointerEvents:"none",
              }}
            >
              <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:13, color:"var(--accent)", marginBottom:6 }}>
                {tooltip.star.label}
              </div>
              <div style={{ fontFamily:"DM Sans", fontSize:9, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(200,240,101,.5)", marginBottom:8 }}>
                {tooltip.star.detail.level}
              </div>
              <div style={{ fontFamily:"DM Sans", fontSize:11, color:"var(--muted)", lineHeight:1.5 }}>
                {tooltip.star.detail.specialty}
              </div>
              <div style={{
                position:"absolute", top:0, left:"8%", right:"8%", height:1,
                background:"linear-gradient(90deg,transparent,rgba(255,255,255,.06),transparent)",
              }}/>
            </div>
          )}
          </div>{/* fim canvas */}

          {/* Drawer — FORA do canvas, ao lado */}
          <div
            style={{
              width: drawerVis ? "clamp(220px,26%,290px)" : 0,
              overflow:"hidden",
              flexShrink:0,
              transition:"width .42s cubic-bezier(.22,.68,0,1.2)",
              borderRadius:"0 4px 4px 0",
              border: drawerVis ? "1px solid rgba(200,240,101,.15)" : "1px solid transparent",
              borderLeft: drawerVis ? "1px solid rgba(200,240,101,.2)" : "1px solid transparent",
              background:"var(--surface)",
            }}
          >
            {/* Conteúdo — largura mínima fixa para não colapsar durante animação */}
            <div style={{
              width:"clamp(220px,26vw,290px)",
              padding:"24px 20px",
              opacity: drawerVis ? 1 : 0,
              transition:"opacity .25s .2s",
              overflowY:"auto",
              height:"100%",
              position:"relative",
            }}>
            {drawer && (
              <>
                {/* Scanline */}
                <div className="drawer-scanline" style={{
                  position:"absolute", left:0, right:0, height:1,
                  background:"rgba(200,240,101,.07)", pointerEvents:"none",
                }}/>

                {/* Header */}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
                  <div>
                    <div style={{ fontFamily:"DM Sans", fontSize:8, letterSpacing:".18em", textTransform:"uppercase", color:"rgba(200,240,101,.45)", marginBottom:5 }}>
                      ✦ {drawer.nameDisplay[lang==="EN"?"EN":"PT"]}
                    </div>
                    <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:17, color:"var(--accent)", lineHeight:1.1 }}>
                      {drawer.category[lang==="EN"?"EN":"PT"]}
                    </div>
                  </div>
                  <button onClick={closeDrawer} style={{
                    background:"none", border:"none",
                    color:"var(--muted)", fontSize:18, cursor:"pointer",
                    lineHeight:1, padding:"2px 4px",
                    transition:"color .2s",
                  }}
                    onMouseEnter={e=>e.currentTarget.style.color="var(--accent)"}
                    onMouseLeave={e=>e.currentTarget.style.color="var(--muted)"}
                  >×</button>
                </div>

                <div style={{ height:1, background:"rgba(200,240,101,.1)", marginBottom:20 }}/>

                {/* Lista de skills */}
                <div style={{ fontFamily:"DM Sans", fontSize:8, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(200,240,101,.4)", marginBottom:14 }}>
                  {lang==="EN" ? "Technologies" : "Tecnologias"}
                </div>

                {drawer.stars.map((s, i) => (
                  <DrawerSkillRow key={s.id} star={s} index={i} />
                ))}
              </>
            )}
            </div>{/* fim conteúdo drawer */}
          </div>{/* fim drawer */}
        </div>{/* fim layout duas colunas */}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Camada de uma constelação (posicionada sobre o canvas)
// ─────────────────────────────────────────────────────────────────────────────
function ConstellationLayer({ c, lang, isFocused, isOther, svgLines, tooltip, onFocus, onStarEnter, onStarLeave }) {
  const wrapRef = useRef(null);
  const [dims, setDims] = useState({ w: 800, h: 500 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setDims({ w: el.offsetWidth, h: el.offsetHeight });
    });
    ro.observe(el);
    setDims({ w: el.offsetWidth, h: el.offsetHeight });
    return () => ro.disconnect();
  }, []);

  const opacity = isOther ? .04 : isFocused ? 1 : .2;
  const blur    = isOther ? 3   : isFocused ? 0 : 1.5;
  const scale   = isFocused ? 1.08 : 1;

  // Centro da constelação (para a transformação de foco)
  const focalX  = c.cx * 100;
  const focalY  = c.cy * 100;

  return (
    <div ref={wrapRef}
      style={{
        position:"absolute", inset:0,
        opacity, filter:`blur(${blur}px)`,
        transition:"opacity .55s cubic-bezier(.22,.68,0,1.2), filter .45s, transform .55s cubic-bezier(.22,.68,0,1.2)",
        transform: `scale(${scale})`,
        transformOrigin: `${focalX}% ${focalY}%`,
        zIndex: isFocused ? 5 : 1,
        pointerEvents: "none",   // FIX: só as estrelas e o label clicam
      }}
    >
      {/* SVG das linhas */}
      <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", overflow:"visible", pointerEvents:"none" }}>
        {c.edges.map(([a, b]) => {
          const sa  = c.stars.find(s => s.id === a);
          const sb  = c.stars.find(s => s.id === b);
          if (!sa || !sb) return null;
          const x1  = sa.x * dims.w, y1 = sa.y * dims.h;
          const x2  = sb.x * dims.w, y2 = sb.y * dims.h;
          const len = Math.sqrt((x2-x1)**2+(y2-y1)**2);
          const key = `${a}-${b}`;
          const drawn = !!svgLines[key];
          return (
            <line key={key}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={isFocused ? "rgba(200,240,101,.55)" : "rgba(200,220,255,.2)"}
              strokeWidth={isFocused ? 1 : .5}
              strokeLinecap="round"
              style={{
                strokeDasharray: len,
                strokeDashoffset: drawn ? 0 : len,
                transition: drawn ? "stroke-dashoffset 1s cubic-bezier(.22,.68,0,1.2)" : "none",
                filter: isFocused && drawn ? "drop-shadow(0 0 3px rgba(200,240,101,.4))" : "none",
              }}
            />
          );
        })}
      </svg>

      {/* Nome da constelação — clicável, posição acima das estrelas mais altas */}
      <div
        onClick={onFocus}
        style={{
          position:"absolute",
          left: `${c.cx * 100}%`,
          top:  `${(Math.min(...c.stars.map(s=>s.y)) * 100 - 8)}%`,
          transform:"translate(-50%, -100%)",
          fontFamily:"DM Sans", fontSize:9, letterSpacing:".18em",
          textTransform:"uppercase",
          color: isFocused ? "rgba(200,240,101,.75)" : "rgba(180,200,255,.35)",
          transition:"color .4s",
          whiteSpace:"nowrap",
          pointerEvents:"auto",
          cursor: isFocused ? "default" : "pointer",
          padding:"6px 10px",
          userSelect:"none",
        }}>
        {c.nameDisplay[lang==="EN"?"EN":"PT"]}
        <span style={{ marginLeft:6, opacity:.4 }}>—</span>
        <span style={{ marginLeft:6, opacity:.6 }}>{c.category[lang==="EN"?"EN":"PT"]}</span>
      </div>

      {/* Estrelas */}
      {c.stars.map(star => {
        const r    = 4 + star.size * 3.5;
        const isHovered = tooltip?.star?.id === star.id;
        return (
          <div key={star.id} className="star-node"
            style={{
              position:"absolute",
              left: star.x * dims.w,
              top:  star.y * dims.h,
              transform:"translate(-50%,-50%)",
              zIndex: isHovered ? 12 : 4,
              pointerEvents:"auto",   // FIX: reativa clique só nas estrelas
            }}
            onMouseEnter={e => { e.stopPropagation(); onStarEnter(e, star, c.id); }}
            onMouseLeave={onStarLeave}
            onClick={e => { e.stopPropagation(); onFocus(); }}
          >
            {/* Halo externo */}
            <div className="star-glow" style={{
              position:"absolute",
              width: r*5, height: r*5,
              borderRadius:"50%",
              background:`radial-gradient(circle, rgba(200,240,101,.14) 0%, rgba(200,240,101,0) 70%)`,
              top:"50%", left:"50%",
              transform:"translate(-50%,-50%)",
              opacity: isHovered ? 1 : isFocused ? .6 : .3,
              transition:"opacity .3s",
              pointerEvents:"none",
            }}/>

            {/* Difusão */}
            <div style={{
              position:"absolute",
              width: r*2.8, height: r*2.8,
              borderRadius:"50%",
              background:`radial-gradient(circle, rgba(200,240,101,.22) 0%, rgba(200,240,101,0) 70%)`,
              top:"50%", left:"50%",
              transform:"translate(-50%,-50%)",
              pointerEvents:"none",
            }}/>

            {/* Núcleo */}
            <div className={star.core && isFocused ? "star-core-pulse" : ""}
              style={{
                width: r, height: r,
                borderRadius:"50%",
                background: isHovered
                  ? "#ffffff"
                  : star.core
                    ? "radial-gradient(circle at 35% 35%, #fff 0%, #c8f065 45%, #88b020 100%)"
                    : "radial-gradient(circle at 35% 35%, #fff 0%, rgba(200,220,255,.9) 40%, rgba(120,160,220,.7) 100%)",
                boxShadow: isHovered
                  ? "0 0 12px 3px rgba(200,240,101,.7)"
                  : star.core
                    ? "0 0 8px rgba(200,240,101,.5)"
                    : "0 0 4px rgba(180,210,255,.4)",
                transition:"box-shadow .25s, background .25s",
                position:"relative", zIndex:2,
              }}
            />

            {/* Cruz de difração nas estrelas core */}
            {star.core && (
              <>
                {[[1,0],[0,1]].map(([dx,dy],i) => (
                  <div key={i} style={{
                    position:"absolute", top:"50%", left:"50%",
                    width: dx ? r*4.5 : 1, height: dy ? r*4.5 : 1,
                    transform:`translate(-50%,-50%)`,
                    background: dx
                      ? "linear-gradient(90deg,transparent,rgba(200,240,101,.35),transparent)"
                      : "linear-gradient(0deg,transparent,rgba(200,240,101,.35),transparent)",
                    pointerEvents:"none",
                  }}/>
                ))}
              </>
            )}

            {/* Label */}
            <div style={{
              position:"absolute", top:"100%", left:"50%",
              transform:"translateX(-50%)",
              marginTop: r * .45,
              fontFamily:"DM Sans", fontSize:isFocused ? 10 : 9,
              fontWeight: isHovered ? 600 : 400,
              color: isHovered ? "var(--accent)" : isFocused ? "rgba(200,220,255,.75)" : "rgba(180,200,255,.35)",
              whiteSpace:"nowrap",
              pointerEvents:"none",
              transition:"color .25s, font-size .3s",
            }}>
              {star.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Linha de skill no drawer com barra animada
// ─────────────────────────────────────────────────────────────────────────────
function DrawerSkillRow({ star, index }) {
  const ref = useRef(null);
  const [w, setW] = useState(0);
  const levelMap = { "Avançado": 88, "Intermediário": 72, "Básico-Intermediário": 58, "Básico": 44 };
  const level = levelMap[star.detail.level] || 60;

  useEffect(() => {
    const t = setTimeout(() => setW(level), 200 + index * 80);
    return () => clearTimeout(t);
  }, [level, index]);

  return (
    <div ref={ref} style={{ marginBottom:14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
        <span style={{ fontFamily:"DM Sans", fontSize:12, color:"var(--text)" }}>{star.label}</span>
        <span style={{ fontFamily:"Syne", fontSize:9, fontWeight:700, color:"var(--accent)", opacity: w>0?1:0, transition:"opacity .4s" }}>
          {star.detail.level}
        </span>
      </div>
      <div style={{ height:1.5, background:"var(--border)", borderRadius:1, overflow:"hidden" }}>
        <div style={{
          height:"100%", width:`${w}%`,
          background:"linear-gradient(90deg,var(--accent),rgba(200,240,101,.5))",
          borderRadius:1,
          transition:`width 1s ${index*80}ms cubic-bezier(.22,.68,0,1.2)`,
          boxShadow: w>0 ? "0 0 8px rgba(200,240,101,.35)" : "none",
        }}/>
      </div>
    </div>
  );
}