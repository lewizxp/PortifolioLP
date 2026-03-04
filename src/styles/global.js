export const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #080808;
    --surface:   #0e0e0e;
    --surface2:  #131313;
    --border:    rgba(255,255,255,0.055);
    --borderH:   rgba(255,255,255,0.11);
    --text:      #e4e4e4;
    --muted:     #888888;
    --muted2:    #555555;
    --accent:    #c8f065;
    --accentDim: rgba(200,240,101,0.07);
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  ::selection { background: var(--accent); color: #000; }

  ::-webkit-scrollbar       { width: 2px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: #222; }

  a { text-decoration: none; }

  @keyframes blink {
    0%,100% { opacity: 1; }
    50%      { opacity: 0; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes pulseDot {
    0%,100% { opacity: 1; transform: scale(1); }
    50%     { opacity: .35; transform: scale(.65); }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes grain {
    0%,100%{ transform: translate(0,0) }   10%{ transform: translate(-2%,-3%) }
    20%{ transform: translate(2%,2%) }     30%{ transform: translate(-1%,3%) }
    40%{ transform: translate(3%,-1%) }    50%{ transform: translate(-3%,2%) }
    60%{ transform: translate(1%,-2%) }    70%{ transform: translate(2%,3%) }
    80%{ transform: translate(-2%,1%) }    90%{ transform: translate(1%,-3%) }
  }
  @keyframes lineExpand {
    from { transform: scaleX(0); transform-origin: left; }
    to   { transform: scaleX(1); transform-origin: left; }
  }
  @keyframes floatY {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-7px); }
  }

  .hero-line { animation: lineExpand 1.6s 0.8s cubic-bezier(.77,0,.18,1) both; }
  .float-y   { animation: floatY 4s ease-in-out infinite; }

  .noise {
    position: fixed; inset: -50%;
    width: 200%; height: 200%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity: .026;
    pointer-events: none;
    z-index: 9999;
    animation: grain 8s steps(10) infinite;
  }

  .cursor-dot {
    width: 5px; height: 5px;
    background: var(--accent);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 10000;
    transition: transform .08s ease;
  }
  .cursor-ring {
    width: 30px; height: 30px;
    border: 1px solid rgba(200,240,101,.35);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: left .1s ease, top .1s ease;
  }

  /* ── Responsivo mobile ── */
  @media (max-width: 768px) {
    .hero-grid       { grid-template-columns: 1fr !important; }
    .hero-card-col   { display: none !important; }
    .about-grid      { grid-template-columns: 1fr !important; gap: 48px !important; }
    .projects-grid   { grid-template-columns: 1fr !important; }
    .project-card-wide { flex-direction: column !important; }
    .project-card-wide .preview-pane { width: 100% !important; height: 200px !important; }
    .contact-grid    { grid-template-columns: 1fr !important; gap: 48px !important; }
  }

  @media (max-width: 480px) {
    .hero-name { font-size: clamp(36px, 11vw, 56px) !important; }
  }
`;
