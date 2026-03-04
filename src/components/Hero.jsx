import { T } from "../data/translations";
import { useCounter } from "../hooks/useCounter";
import { SOCIAL_LINKS, CV_URL } from "../data/content";
import { AnimatedName } from "./AnimatedName";
import { ParticleField } from "./ParticleField";

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const icons = { GitHub: GithubIcon, LinkedIn: LinkedinIcon };

// Contadores animados dos stats
function StatItem({ target, suffix = "+", label, delay = 0 }) {
  const { ref, value } = useCounter(target, { duration: 1800, delay });
  return (
    <div ref={ref}>
      <div style={{ fontFamily:"Syne", fontSize:28, fontWeight:800, color:"var(--text)", lineHeight:1 }}>
        {value}{suffix}
      </div>
      <div style={{ fontFamily:"DM Sans", fontSize:11, color:"var(--muted)", marginTop:5, letterSpacing:".04em" }}>
        {label}
      </div>
    </div>
  );
}

function StatsRow({ t }) {
  return (
    <div className="stats-row" style={{ display:"flex", gap:48, marginTop:72, paddingTop:36, borderTop:"1px solid var(--border)", flexWrap:"wrap", animation:"fadeUp .9s .85s cubic-bezier(.22,.68,0,1.2) both" }}>
      <StatItem target={4}  label={t.statProjects} delay={0}   />
      <StatItem target={2}  label={t.statClients}  delay={150} />
      <StatItem target={1}  label={t.statYears}    suffix=""   delay={300} />
    </div>
  );
}

export function Hero({ lang }) {
  const t = T[lang];

  return (
    <>
      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          grid-template-rows: 1fr auto;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          padding: 0 clamp(18px,4vw,72px);
          align-items: center;
          gap: 40px;
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-card-col { display: none !important; }
          .hero-scroll-hint { display: none !important; }
        }
        .hero-ctas { display: flex; gap: 12px; margin-top: 36px; flex-wrap: wrap; }
        .hero-social { display: flex; gap: 8px; margin-top: 20px; align-items: center; flex-wrap: wrap; }
      `}</style>

      <section className="hero-grid">
        {/* Partículas de rede */}
        <ParticleField />
        {/* Glow */}
        <div style={{ position:"absolute",width:700,height:700,borderRadius:"50%",
          background:"radial-gradient(circle,rgba(200,240,101,.05) 0%,transparent 65%)",
          top:"-15%",right:"5%",pointerEvents:"none" }} />
        {/* Side line */}
        <div style={{ position:"absolute",left:"clamp(18px,4vw,72px)",top:0,bottom:0,width:1,
          background:"linear-gradient(to bottom,transparent 0%,var(--border) 20%,var(--border) 80%,transparent 100%)",
          pointerEvents:"none" }} />

        {/* LEFT COL */}
        <div style={{ position:"relative", paddingTop:80, zIndex:1 }}>

          {/* Available badge */}
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,marginBottom:40,animation:"fadeIn .8s .1s both" }}>
            <div style={{ width:7,height:7,borderRadius:"50%",background:"var(--accent)",animation:"pulseDot 2s ease-in-out infinite" }} />
            <span style={{ fontFamily:"DM Sans",fontSize:11,color:"var(--muted)",letterSpacing:".1em",textTransform:"uppercase" }}>
              {t.available}
            </span>
          </div>

          {/* Animated name */}
          <div style={{ animation:"fadeUp .9s .2s cubic-bezier(.22,.68,0,1.2) both" }}>
            <AnimatedName />
          </div>

          {/* Role line */}
          <div style={{ display:"flex",alignItems:"center",gap:16,marginTop:16,animation:"fadeUp .9s .35s cubic-bezier(.22,.68,0,1.2) both" }}>
            <div className="hero-line" style={{ width:40,height:1,background:"var(--accent)",flexShrink:0 }} />
            <span style={{ fontFamily:"DM Sans",fontSize:14,fontWeight:300,color:"var(--muted)",letterSpacing:".04em" }}>{t.role}</span>
          </div>

          {/* Description */}
          <p style={{ fontFamily:"DM Sans",fontSize:"clamp(14px,1.6vw,17px)",fontWeight:300,color:"#888888",lineHeight:1.9,maxWidth:500,marginTop:28,animation:"fadeUp .9s .5s cubic-bezier(.22,.68,0,1.2) both" }}>
            {t.heroDesc}
          </p>

          {/* CTAs */}
          <div className="hero-ctas" style={{ animation:"fadeUp .9s .65s cubic-bezier(.22,.68,0,1.2) both" }}>
            <a href="#projetos"
              style={{ fontFamily:"DM Sans",fontSize:12,fontWeight:500,letterSpacing:".08em",textTransform:"uppercase",color:"#000",background:"var(--accent)",padding:"13px 28px",borderRadius:2,transition:"opacity .2s" }}
              onMouseEnter={e=>(e.target.style.opacity=".82")} onMouseLeave={e=>(e.target.style.opacity="1")}
            >{t.seeProjects}</a>
            <a href="#sobre"
              style={{ fontFamily:"DM Sans",fontSize:12,fontWeight:400,letterSpacing:".08em",textTransform:"uppercase",color:"var(--muted)",border:"1px solid var(--borderH)",padding:"13px 28px",borderRadius:2,transition:"border-color .2s,color .2s" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--muted)";e.currentTarget.style.color="var(--text)"}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--borderH)";e.currentTarget.style.color="var(--muted)"}}
            >{t.aboutMe}</a>
            <a href={CV_URL} download
              style={{ fontFamily:"DM Sans",fontSize:12,fontWeight:400,letterSpacing:".08em",textTransform:"uppercase",color:"var(--accent)",border:"1px solid var(--accent)",padding:"13px 20px",borderRadius:2,transition:"all .2s",display:"flex",alignItems:"center",gap:6 }}
              onMouseEnter={e=>{e.currentTarget.style.background="var(--accent)";e.currentTarget.style.color="#000"}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="var(--accent)"}}
            ><span>↓</span> {t.downloadCV}</a>
          </div>

          {/* Social icons */}
          <div className="hero-social" style={{ animation:"fadeUp .9s .75s cubic-bezier(.22,.68,0,1.2) both" }}>
            <span style={{ fontFamily:"DM Sans",fontSize:10,color:"var(--muted2)",letterSpacing:".1em",textTransform:"uppercase" }}>{t.viewOn}</span>
            {SOCIAL_LINKS.map(({ label, href }) => {
              const Icon = icons[label];
              return (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                  style={{ display:"flex",alignItems:"center",gap:6,color:"var(--muted)",fontSize:12,fontFamily:"DM Sans",letterSpacing:".06em",padding:"5px 10px",border:"1px solid var(--border)",borderRadius:2,transition:"all .2s" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--borderH)";e.currentTarget.style.color="var(--text)"}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--muted)"}}
                >
                  {Icon && <Icon />} {label}
                </a>
              );
            })}
          </div>

          {/* Stats — contadores animados */}
          <StatsRow t={t} />
        </div>

        {/* RIGHT COL — code card */}
        <div className="hero-card-col" style={{ position:"relative",paddingTop:80,animation:"fadeIn 1s .5s both",zIndex:1 }}>
          <div className="float-y" style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:3,overflow:"hidden",boxShadow:"0 40px 80px rgba(0,0,0,.6)" }}>
            <div style={{ padding:"14px 20px",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",gap:8 }}>
              {["#ff5f57","#febc2e","#28c840"].map(c=><div key={c} style={{ width:10,height:10,borderRadius:"50%",background:c }} />)}
              <span style={{ fontFamily:"DM Sans",fontSize:11,color:"var(--muted)",marginLeft:8 }}>portfolio.tsx</span>
            </div>
            <div style={{ padding:"20px 24px",fontFamily:"monospace",fontSize:12,lineHeight:2,color:"#666" }}>
              <div><span style={{color:"#888"}}>const </span><span style={{color:"#88ccff"}}>dev</span><span style={{color:"#888"}}> = {"{"}</span></div>
              <div style={{paddingLeft:20}}><span style={{color:"#666"}}>name</span><span style={{color:"#888"}}>: </span><span style={{color:"var(--accent)"}}>'Luiz Pedro'</span><span style={{color:"#666"}}>,</span></div>
              <div style={{paddingLeft:20}}><span style={{color:"#666"}}>role</span><span style={{color:"#888"}}>: </span><span style={{color:"var(--accent)"}}>'Full Stack Dev'</span><span style={{color:"#666"}}>,</span></div>
              <div style={{paddingLeft:20}}><span style={{color:"#666"}}>exp</span><span style={{color:"#888"}}>:  </span><span style={{color:"#aaaaff"}}>1</span><span style={{color:"#666"}}>,</span></div>
              <div style={{paddingLeft:20}}><span style={{color:"#666"}}>stack</span><span style={{color:"#888"}}>: [</span></div>
              {["React","Node.js","TypeScript"].map(s=>(
                <div key={s} style={{paddingLeft:40}}><span style={{color:"var(--accent)"}}>{`'${s}'`}</span><span style={{color:"#666"}}>,</span></div>
              ))}
              <div style={{paddingLeft:20}}><span style={{color:"#888"}}>],</span></div>
              <div style={{paddingLeft:20}}><span style={{color:"#666"}}>available</span><span style={{color:"#888"}}>: </span><span style={{color:"#ff9966"}}>true</span></div>
              <div><span style={{color:"#888"}}>{"}"}</span></div>
            </div>
            <div style={{ padding:"10px 20px",borderTop:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
              <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                <div style={{ width:6,height:6,borderRadius:"50%",background:"var(--accent)",animation:"pulseDot 2s ease-in-out infinite" }} />
                <span style={{ fontFamily:"DM Sans",fontSize:10,color:"var(--muted)",letterSpacing:".06em" }}>open to work</span>
              </div>
              <span style={{ fontFamily:"DM Sans",fontSize:10,color:"var(--muted2)" }}>v2025</span>
            </div>
          </div>
          <div style={{ position:"absolute",top:60,right:-16,width:80,height:80,border:"1px solid var(--accent)",borderRadius:2,opacity:.15,pointerEvents:"none" }} />
          <div style={{ position:"absolute",bottom:-20,left:-20,width:50,height:50,border:"1px solid var(--borderH)",borderRadius:2,opacity:.4,pointerEvents:"none" }} />
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint" style={{ gridColumn:"1 / -1",display:"flex",flexDirection:"column",alignItems:"flex-start",paddingBottom:32,gap:8,animation:"fadeIn 1s 1.2s both" }}>
          <div style={{ width:1,height:36,background:"linear-gradient(to bottom,transparent,var(--muted2))" }} />
          <span style={{ fontFamily:"DM Sans",fontSize:10,color:"var(--muted)",letterSpacing:".12em",textTransform:"uppercase" }}>scroll</span>
        </div>
      </section>
    </>
  );
}
