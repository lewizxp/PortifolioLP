
import { useEffect } from "react";
import { T } from "../data/translations";
import { MockPreview } from "./MockPreview";


const PROJECT_DETAILS = {
  "01": {
    role:     "Full Stack Developer",
    duration: "Em andamento",
    highlights: [
      "Cadastro e controle de produtos com categorias e variantes",
      "Movimentações de entrada e saída com histórico completo",
      "Relatórios em tempo real com filtros por período e categoria",
      "Interface responsiva integrada ao ambiente interno da Stone",
    ],
    stack: ["JavaScript", "Appsheet" ],
    result: "Sistema em produção · Stone Pagamentos · 2025",
  },
  "02": {
    role:     "Front-end Developer",
    duration: "DevWest · 2025",
    highlights: [
      "Desenvolvimento completo a partir do design no Figma",
      "Página institucional explicando os serviços de previdência privada",
      "Layout responsivo com foco em clareza e conversão",
      "Integração com o time de design para garantir fidelidade ao protótipo",
    ],
    stack: ["React", "CSS", "Figma", "Vite", "Git"],
    result: "Site entregue ao cliente · TotalPrevi · DevWest",
  },
  
};

export function ProjectDetail({ project, lang, onClose }) {
  const t       = T[lang];
  const details = PROJECT_DETAILS[project.id] || {};

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 500,
        background: "rgba(0,0,0,.85)", backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "clamp(16px,4vw,48px)",
        animation: "fadeIn .25s ease",
      }}
    >
     
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background:   "#0e0e0e",
          border:       "1px solid var(--border)",
          borderRadius: 6,
          width:        "100%",
          maxWidth:     900,
          maxHeight:    "90vh",
          overflowY:    "auto",
          animation:    "fadeUp .35s cubic-bezier(.22,.68,0,1.2)",
          scrollbarWidth: "thin",
          scrollbarColor: "#222 transparent",
        }}
      >
      
        <div style={{
          padding:      "28px 36px 24px",
          borderBottom: "1px solid var(--border)",
          display:      "flex", justifyContent: "space-between", alignItems: "flex-start",
          position:     "sticky", top: 0,
          background:   "#0e0e0e", zIndex: 1,
        }}>
          <div>
            <div style={{ display: "flex", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
              {project.tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: "DM Sans", fontSize: 10, color: "var(--muted)",
                  background: "var(--surface2)", border: "1px solid var(--border)",
                  padding: "3px 10px", borderRadius: 2,
                }}>{tag}</span>
              ))}
            </div>
            <h2 style={{ fontFamily: "Syne", fontSize: "clamp(22px,3vw,34px)", fontWeight: 800, letterSpacing: "-.02em", lineHeight: 1.1 }}>
              {project.name}
            </h2>
          </div>
      
          <button onClick={onClose} style={{
            background: "transparent", border: "1px solid var(--border)",
            color: "var(--muted)", cursor: "pointer",
            width: 36, height: 36, borderRadius: 2, fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, marginLeft: 16, transition: "all .2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}
          >✕</button>
        </div>

      
        <div style={{ padding: "36px 36px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="detail-grid">

         
          <div>
           
            <div style={{ height: 220, borderRadius: 4, overflow: "hidden", border: "1px solid var(--border)", marginBottom: 32 }}>
              <MockPreview id={project.id} />
            </div>

           
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
              {[
                ["Ano",      project.year],
                ["Role",     details.role],
                ["Empresa",  details.duration],
              ].map(([label, value]) => (
                <div key={label} style={{ display: "flex", gap: 16, alignItems: "center", paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontFamily: "DM Sans", fontSize: 10, color: "var(--muted)", letterSpacing: ".08em", textTransform: "uppercase", minWidth: 72 }}>{label}</span>
                  <span style={{ fontFamily: "DM Sans", fontSize: 13, color: "#aaaaaa" }}>{value}</span>
                </div>
              ))}
            </div>

           
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontFamily: "DM Sans", fontSize: 10, color: "var(--muted)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 14 }}>Stack completa</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {(details.stack || []).map(s => (
                  <span key={s} style={{ fontFamily: "DM Sans", fontSize: 12, color: "var(--accent)", background: "rgba(200,240,101,.06)", border: "1px solid rgba(200,240,101,.2)", padding: "4px 12px", borderRadius: 2 }}>{s}</span>
                ))}
              </div>
            </div>
          </div>

         
          <div>
            
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontFamily: "DM Sans", fontSize: 10, color: "var(--muted)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 20 }}>O que foi construído</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {(details.highlights || []).map((h, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--accent)", fontSize: 12, flexShrink: 0, marginTop: 1 }}>→</span>
                    <p style={{ fontFamily: "DM Sans", fontSize: 13, fontWeight: 300, color: "#aaaaaa", lineHeight: 1.75 }}>{h}</p>
                  </div>
                ))}
              </div>
            </div>

           
            {details.result && (
              <div style={{ background: "rgba(200,240,101,.04)", border: "1px solid rgba(200,240,101,.15)", borderRadius: 4, padding: "20px 24px" }}>
                <div style={{ fontFamily: "DM Sans", fontSize: 10, color: "var(--accent)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }}>Resultados</div>
                <p style={{ fontFamily: "Syne", fontSize: 14, fontWeight: 600, color: "var(--text)", lineHeight: 1.6 }}>{details.result}</p>
              </div>
            )}

          
            {project.link && project.link !== "#" && (
              <a href={project.link} target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  marginTop: 28, fontFamily: "DM Sans", fontSize: 11,
                  fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase",
                  color: "#000", background: "var(--accent)",
                  padding: "12px 24px", borderRadius: 2, transition: "opacity .2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = ".82")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Ver projeto ao vivo ↗
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .detail-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  );
}
