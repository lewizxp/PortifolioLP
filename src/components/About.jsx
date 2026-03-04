
import { T } from "../data/translations";
import { SKILLS, TIMELINE } from "../data/content";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function About({ lang }) {
  const t = T[lang];

  return (
    <section id="sobre" style={{ padding: "130px clamp(24px,5vw,80px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel n="01" label={t.secAbout} />

        <div
          data-about-grid
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:                 80,
            alignItems:          "start",
            // @data-about-grid
          }}
        >
          {/* ── Coluna esquerda: bio + skills ── */}
          <Reveal dir="left">
            <h2
              style={{
                fontFamily:    "Syne, sans-serif",
                fontSize:      "clamp(26px,3.5vw,44px)",
                fontWeight:    800,
                lineHeight:    1.12,
                letterSpacing: "-.02em",
                marginBottom:  28,
              }}
            >
              {t.aboutTitle}
              <br />
              pessoas{" "}
              <span style={{ color: "var(--accent)" }}>{t.aboutTitleAccent}</span>
            </h2>

            <p style={{ fontFamily: "DM Sans", fontSize: 14, fontWeight: 300, color: "#aaaaaa", lineHeight: 1.95, marginBottom: 20 }}>
              {t.aboutP1}
            </p>
            <p style={{ fontFamily: "DM Sans", fontSize: 14, fontWeight: 300, color: "#aaaaaa", lineHeight: 1.95 }}>
              {t.aboutP2}
            </p>

            {/* Skills por categoria */}
            <div style={{ marginTop: 52 }}>
              {SKILLS.map((group, i) => (
                <Reveal key={group.catKey} delay={i * 100}>
                  <div style={{ marginBottom: 26 }}>
                    <div
                      style={{
                        fontFamily:    "DM Sans, sans-serif",
                        fontSize:      10,
                        letterSpacing: ".1em",
                        textTransform: "uppercase",
                        color:         "var(--muted)",
                        marginBottom:  10,
                      }}
                    >
                      {t.skills[group.catKey]}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {group.items.map((item) => (
                        <span
                          key={item}
                          style={{
                            fontFamily: "DM Sans, sans-serif",
                            fontSize:   12,
                            color:      "#aaaaaa",
                            background: "var(--surface2)",
                            border:     "1px solid var(--border)",
                            padding:    "5px 13px",
                            borderRadius: 2,
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          {/* ── Coluna direita: timeline ── */}
          <Reveal dir="right" delay={150}>
            <div
              style={{
                fontFamily:    "DM Sans, sans-serif",
                fontSize:      10,
                color:         "var(--muted)",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                marginBottom:  36,
              }}
            >
              {t.careerLabel}
            </div>

            <div style={{ position: "relative" }}>
              {/* Linha vertical */}
              <div
                style={{
                  position:   "absolute",
                  left:       0,
                  top:        6,
                  bottom:     6,
                  width:      1,
                  background: "var(--border)",
                }}
              />

              {TIMELINE.map((item, i) => (
                <div key={i} style={{ paddingLeft: 28, paddingBottom: 44, position: "relative" }}>
                  {/* Ponto na linha */}
                  <div
                    style={{
                      position:     "absolute",
                      left:         -4,
                      top:          6,
                      width:        9,
                      height:       9,
                      borderRadius: "50%",
                      background:   i === 0 ? "var(--accent)" : "var(--bg)",
                      border:       `1px solid ${i === 0 ? "var(--accent)" : "var(--muted2)"}`,
                    }}
                  />

                  {/* Ano + empresa */}
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 5 }}>
                    <span
                      style={{
                        fontFamily:    "Syne, sans-serif",
                        fontSize:      11,
                        fontWeight:    700,
                        color:         i === 0 ? "var(--accent)" : "var(--muted)",
                        letterSpacing: ".04em",
                      }}
                    >
                      {item.year}
                    </span>
                    <span
                      style={{
                        fontFamily:    "DM Sans, sans-serif",
                        fontSize:      10,
                        color:         "var(--muted)",
                        letterSpacing: ".06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.company}
                    </span>
                  </div>

                  {/* Cargo e descrição (traduzidos) */}
                  <div
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontSize:   14,
                      fontWeight: 600,
                      color:      "var(--text)",
                      marginBottom: 7,
                    }}
                  >
                    {t.timeline[i].role}
                  </div>
                  <p
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize:   12,
                      fontWeight: 300,
                      color:      "#aaaaaa",
                      lineHeight: 1.85,
                    }}
                  >
                    {t.timeline[i].desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
