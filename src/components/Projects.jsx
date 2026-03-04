// ─────────────────────────────────────────────────────────────────────────────
// components/Projects.jsx
// Grid de cards de projetos com preview visual, hover animado e layout
// alternado (card largo / card quadrado).
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from "react";
import { T } from "../data/translations";
import { PROJECTS } from "../data/content";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { MockPreview } from "./MockPreview";

export function Projects({ lang, onSelectProject }) {
  const t = T[lang];
  const [hovered, setHovered] = useState(null);

  return (
    <section
      id="projetos"
      style={{ padding: "130px clamp(24px,5vw,80px)", background: "var(--surface)" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel n="02" label={t.secProjects} />

        {/* Título da seção */}
        <Reveal>
          <div
            style={{
              display:        "flex",
              justifyContent: "space-between",
              alignItems:     "flex-end",
              marginBottom:   64,
            }}
          >
            <h2
              style={{
                fontFamily:    "Syne, sans-serif",
                fontSize:      "clamp(26px,3.5vw,44px)",
                fontWeight:    800,
                letterSpacing: "-.02em",
                lineHeight:    1.1,
              }}
            >
              {t.selectedWork}
              <br />
              {t.selectedWorkSub}
            </h2>
            <span style={{ fontFamily: "DM Sans", fontSize: 12, color: "var(--muted)" }}>
              {PROJECTS.length} {t.nProjects}
            </span>
          </div>
        </Reveal>

        {/* Grid de cards */}
        <div className="projects-grid">
          {PROJECTS.map((p, i) => {
            const isHovered = hovered === i;
            // Primeiro e último cards ocupam a linha inteira
            const isWide = i === 0 || i === 3;

            return (
              <Reveal key={p.id} delay={i * 90} style={{ gridColumn: isWide ? "1 / -1" : "auto" }}>
                <div
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => onSelectProject && onSelectProject(p)}
                  style={{
                    background:   "var(--bg)",
                    border:       `1px solid ${isHovered ? "rgba(200,240,101,.35)" : "var(--border)"}`,
                    borderRadius: 4,
                    overflow:     "hidden",
                    cursor:       "pointer",
                    transition:   "border-color .3s ease, transform .3s ease, box-shadow .3s ease",
                    transform:    isHovered ? "translateY(-4px)" : "translateY(0)",
                    boxShadow:    isHovered
                      ? "0 24px 60px rgba(0,0,0,.5), 0 0 0 1px rgba(200,240,101,.08)"
                      : "0 4px 20px rgba(0,0,0,.3)",
                    display:        "flex",
                    flexDirection:  isWide ? "row" : "column",
                  }}
                  className={isWide ? "project-card-wide" : ""}
                >
                  {/* Preview visual */}
                  <div
                    className="preview-pane"
                    style={{
                      position:  "relative",
                      flexShrink: 0,
                      width:     isWide ? "52%" : "100%",
                      height:    isWide ? 300 : 200,
                      overflow:  "hidden",
                      background: "#0b0b16",
                    }}
                  >
                    <MockPreview id={p.id} />

                    {/* Overlay de brilho no hover */}
                    <div
                      style={{
                        position:   "absolute",
                        inset:      0,
                        background: "linear-gradient(135deg, rgba(200,240,101,.06) 0%, transparent 60%)",
                        opacity:    isHovered ? 1 : 0,
                        transition: "opacity .3s ease",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Número da marca d'água */}
                    <div
                      style={{
                        position:   "absolute",
                        bottom:     12,
                        right:      14,
                        fontFamily: "Syne, sans-serif",
                        fontSize:   11,
                        fontWeight: 800,
                        color:      "rgba(255,255,255,.06)",
                      }}
                    >
                      {p.id}
                    </div>
                  </div>

                  {/* Informações do projeto */}
                  <div
                    style={{
                      padding:        isWide ? "36px 36px" : "24px 24px",
                      display:        "flex",
                      flexDirection:  "column",
                      justifyContent: "space-between",
                      flex:           1,
                      minHeight:      isWide ? "auto" : 160,
                    }}
                  >
                    <div>
                      {/* Tags + ano */}
                      <div
                        style={{
                          display:        "flex",
                          alignItems:     "center",
                          justifyContent: "space-between",
                          marginBottom:   16,
                        }}
                      >
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                          {p.tags.map((tag) => (
                            <span
                              key={tag}
                              style={{
                                fontFamily: "DM Sans, sans-serif",
                                fontSize:   10,
                                color:      "var(--muted)",
                                background: "var(--surface2)",
                                border:     "1px solid var(--border)",
                                padding:    "3px 9px",
                                borderRadius: 2,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span
                          style={{
                            fontFamily: "DM Sans, sans-serif",
                            fontSize:   11,
                            color:      "var(--muted2)",
                            flexShrink: 0,
                            marginLeft: 10,
                          }}
                        >
                          {p.year}
                        </span>
                      </div>

                      {/* Nome */}
                      <h3
                        style={{
                          fontFamily:    "Syne, sans-serif",
                          fontSize:      isWide ? "clamp(18px,2vw,26px)" : 18,
                          fontWeight:    800,
                          lineHeight:    1.2,
                          letterSpacing: "-.01em",
                          color:         isHovered ? "var(--accent)" : "var(--text)",
                          transition:    "color .25s ease",
                          marginBottom:  12,
                        }}
                      >
                        {p.name}
                      </h3>

                      {/* Descrição (traduzida) */}
                      <p
                        style={{
                          fontFamily: "DM Sans, sans-serif",
                          fontSize:   13,
                          fontWeight: 300,
                          color:      "#aaaaaa",
                          lineHeight: 1.85,
                        }}
                      >
                        {t.projects[i].desc}
                      </p>
                    </div>

                    {/* Rodapé do card */}
                    <div
                      style={{
                        display:        "flex",
                        alignItems:     "center",
                        justifyContent: "space-between",
                        marginTop:      28,
                        paddingTop:     20,
                        borderTop:      "1px solid var(--border)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily:    "DM Sans, sans-serif",
                          fontSize:      11,
                          fontWeight:    500,
                          letterSpacing: ".08em",
                          textTransform: "uppercase",
                          color:         isHovered ? "var(--accent)" : "var(--muted)",
                          transition:    "color .25s ease",
                        }}
                      >
                        {t.viewProject}
                      </span>

                      {/* Botão circular */}
                      <div
                        style={{
                          width:        32,
                          height:       32,
                          border:       `1px solid ${isHovered ? "var(--accent)" : "var(--border)"}`,
                          borderRadius: "50%",
                          display:      "flex",
                          alignItems:   "center",
                          justifyContent: "center",
                          transition:   "border-color .25s ease, background .25s ease",
                          background:   isHovered ? "var(--accent)" : "transparent",
                        }}
                      >
                        <span
                          style={{
                            fontSize:   12,
                            color:      isHovered ? "#000" : "var(--muted)",
                            transition: "color .25s ease",
                          }}
                        >
                          ↗
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
