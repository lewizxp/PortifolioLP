
import { useState, useEffect } from "react";
import { T } from "../data/translations";


function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el  = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, zIndex: 201,
      height: 2, background: "var(--accent)",
      width: `${pct}%`,
      transition: "width .1s linear",
      transformOrigin: "left",
      boxShadow: "0 0 8px rgba(200,240,101,.5)",
      pointerEvents: "none",
    }} />
  );
}

export function Nav({ active, lang, setLang }) {
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const t = T[lang];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const navLinks = [
    { key: "navAbout",    href: "#sobre"    },
    { key: "navProjects", href: "#projetos" },
    { key: "navContact",  href: "#contato"  },
  ];

  const linkStyle = (key) => ({
    fontFamily:    "DM Sans, sans-serif",
    fontSize:      12,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    color:         active === t[key] ? "var(--accent)" : "var(--muted)",
    transition:    "color .2s",
  });

  return (
    <>
      <style>{`
        .nav-desktop { display: flex !important; }
        .nav-hamburger { display: none !important; }
        @media (max-width: 767px) {
          .nav-desktop   { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>

      <nav style={{
        position:       "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height:         64, padding: "0 clamp(24px,5vw,80px)",
        display:        "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom:   `1px solid ${scrolled || menuOpen ? "var(--border)" : "transparent"}`,
        background:     scrolled || menuOpen ? "rgba(8,8,8,.97)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        transition:     "all .3s ease",
      }}>
        {/* Logo */}
        <a href="#" style={{ fontFamily:"Syne", fontWeight:800, fontSize:16, letterSpacing:".04em", color:"var(--text)" }}>
          LP<span style={{ color:"var(--accent)" }}>.</span>
        </a>

        {/* ── Desktop links ── */}
        <div className="nav-desktop" style={{ gap:28, alignItems:"center" }}>
          {navLinks.map(({ key, href }) => (
            <a key={key} href={href} style={linkStyle(key)}>{t[key]}</a>
          ))}

          {/* PT / EN toggle */}
          <button onClick={() => setLang(l => l === "PT" ? "EN" : "PT")} style={{
            fontFamily:"DM Sans, sans-serif", fontSize:11, fontWeight:500,
            letterSpacing:".1em", textTransform:"uppercase",
            color:"var(--muted)", background:"transparent",
            border:"1px solid var(--border)", padding:"5px 12px",
            borderRadius:2, cursor:"pointer", transition:"all .2s",
            display:"flex", alignItems:"center", gap:6,
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor="var(--borderH)"; e.currentTarget.style.color="var(--text)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)";  e.currentTarget.style.color="var(--muted)"; }}
          >
            <span style={{ fontSize:13 }}>{lang === "PT" ? "🇧🇷" : "🇺🇸"}</span>
            <span>{lang === "PT" ? "EN" : "PT"}</span>
          </button>

          {/* Hire me */}
          <a href="#contato" style={{
            fontFamily:"DM Sans, sans-serif", fontSize:11, fontWeight:500,
            letterSpacing:".1em", textTransform:"uppercase",
            color:"#000", background:"var(--accent)",
            padding:"7px 20px", borderRadius:2, transition:"opacity .2s",
          }}
            onMouseEnter={e => e.target.style.opacity=".8"}
            onMouseLeave={e => e.target.style.opacity="1"}
          >{t.hireMe}</a>
        </div>

        {/* ── Mobile: hamburger button ── */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          style={{
            background:"transparent", border:"none", cursor:"pointer",
            color:"var(--muted)", padding:4, display:"flex", flexDirection:"column",
            gap:5, alignItems:"center", justifyContent:"center",
          }}
          aria-label="Menu"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display:     "block",
              width:       22,
              height:      1.5,
              background:  menuOpen ? "var(--accent)" : "var(--muted)",
              borderRadius:2,
              transition:  "all .25s ease",
              transform:   menuOpen
                ? i === 0 ? "translateY(6.5px) rotate(45deg)"
                : i === 2 ? "translateY(-6.5px) rotate(-45deg)"
                : "scaleX(0)"
                : "none",
            }}/>
          ))}
        </button>
      </nav>

      {/* ── Mobile dropdown menu ── */}
      <div style={{
        position:   "fixed", top: 64, left: 0, right: 0, zIndex: 190,
        background: "rgba(8,8,8,.97)",
        borderBottom: menuOpen ? "1px solid var(--border)" : "none",
        maxHeight:  menuOpen ? 400 : 0,
        overflow:   "hidden",
        transition: "max-height .35s cubic-bezier(.22,.68,0,1.2), border-color .2s",
        backdropFilter: "blur(14px)",
      }}>
        <div style={{ padding:"24px clamp(24px,5vw,80px) 32px", display:"flex", flexDirection:"column", gap:4 }}>
          {navLinks.map(({ key, href }) => (
            <a key={key} href={href} onClick={() => setMenuOpen(false)} style={{
              fontFamily:"DM Sans, sans-serif", fontSize:15, letterSpacing:".06em",
              textTransform:"uppercase", color:"var(--muted)",
              padding:"12px 0", borderBottom:"1px solid var(--border)",
              transition:"color .2s",
            }}
              onMouseEnter={e => e.target.style.color="var(--accent)"}
              onMouseLeave={e => e.target.style.color="var(--muted)"}
            >{t[key]}</a>
          ))}

          {/* Bottom row: lang toggle + hire me */}
          <div style={{ display:"flex", gap:12, marginTop:20, alignItems:"center" }}>
            <button onClick={() => setLang(l => l === "PT" ? "EN" : "PT")} style={{
              fontFamily:"DM Sans, sans-serif", fontSize:12, fontWeight:500,
              letterSpacing:".1em", textTransform:"uppercase",
              color:"var(--muted)", background:"transparent",
              border:"1px solid var(--border)", padding:"9px 16px",
              borderRadius:2, cursor:"pointer", display:"flex", alignItems:"center", gap:6,
            }}>
              <span style={{ fontSize:14 }}>{lang === "PT" ? "🇧🇷" : "🇺🇸"}</span>
              {lang === "PT" ? "EN" : "PT"}
            </button>
            <a href="#contato" onClick={() => setMenuOpen(false)} style={{
              fontFamily:"DM Sans, sans-serif", fontSize:12, fontWeight:500,
              letterSpacing:".1em", textTransform:"uppercase",
              color:"#000", background:"var(--accent)",
              padding:"9px 24px", borderRadius:2, flex:1, textAlign:"center",
            }}>{t.hireMe}</a>
          </div>
        </div>
      </div>
    </>
  );
}
