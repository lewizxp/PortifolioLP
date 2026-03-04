
import { useState } from "react";
import { T } from "../data/translations";
import { CONTACT_LINKS } from "../data/content";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Contact({ lang }) {
  const t = T[lang];
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const inputStyle = {
    width:        "100%",
    background:   "transparent",
    border:       "none",
    borderBottom: "1px solid var(--border)",
    padding:      "13px 0",
    fontFamily:   "DM Sans, sans-serif",
    fontSize:     14,
    fontWeight:   300,
    color:        "var(--text)",
    outline:      "none",
    transition:   "border-color .2s",
  };

  return (
    <section id="contato" style={{ padding: "130px clamp(24px,5vw,80px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel n="04" label={t.secContact} />

        <div data-contact-grid style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>

          
          <Reveal dir="left">
            <h2
              style={{
                fontFamily:    "Syne, sans-serif",
                fontSize:      "clamp(26px,3.5vw,50px)",
                fontWeight:    800,
                lineHeight:    1.06,
                letterSpacing: "-.03em",
                marginBottom:  24,
              }}
            >
              {t.contactTitle1}
              <br />
              {t.contactTitle2}{" "}
              <span style={{ color: "var(--accent)" }}>{t.contactTitleAccent}</span>
              <br />
              {t.contactTitle3}
            </h2>

            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize:   14,
                fontWeight: 300,
                color:      "#aaaaaa",
                lineHeight: 1.9,
                marginBottom: 48,
              }}
            >
              {t.contactDesc}
            </p>

           
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {CONTACT_LINKS.map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display:       "flex",
                    gap:           20,
                    alignItems:    "center",
                    paddingBottom: 18,
                    borderBottom:  "1px solid var(--border)",
                  }}
                >
                  <span
                    style={{
                      fontFamily:    "DM Sans, sans-serif",
                      fontSize:      10,
                      color:         "var(--muted)",
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      minWidth:      72,
                    }}
                  >
                    {label}
                  </span>
                  <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#aaaaaa" }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          
          <Reveal dir="right" delay={150}>
            {!sent ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
               
                <div>
                  <label style={{ fontFamily: "DM Sans", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 4 }}>
                    {t.fieldName}
                  </label>
                  <input
                    type="text"
                    placeholder={t.fieldNamePh}
                    value={form.name}
                    onChange={set("name")}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderBottomColor = "var(--accent)")}
                    onBlur={(e)  => (e.target.style.borderBottomColor = "var(--border)")}
                  />
                </div>

               
                <div>
                  <label style={{ fontFamily: "DM Sans", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 4 }}>
                    {t.fieldEmail}
                  </label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={set("email")}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderBottomColor = "var(--accent)")}
                    onBlur={(e)  => (e.target.style.borderBottomColor = "var(--border)")}
                  />
                </div>

                
                <div>
                  <label style={{ fontFamily: "DM Sans", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 4 }}>
                    {t.fieldMsg}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={t.fieldMsgPh}
                    value={form.message}
                    onChange={set("message")}
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={(e) => (e.target.style.borderBottomColor = "var(--accent)")}
                    onBlur={(e)  => (e.target.style.borderBottomColor = "var(--border)")}
                  />
                </div>

                {/* Botão enviar */}
                <button
                  onClick={() => setSent(true)}
                  style={{
                    fontFamily:    "DM Sans, sans-serif",
                    fontSize:      11,
                    fontWeight:    500,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color:         "#000",
                    background:    "var(--accent)",
                    border:        "none",
                    padding:       "15px 0",
                    cursor:        "pointer",
                    borderRadius:  2,
                    width:         "100%",
                    transition:    "opacity .2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.opacity = ".82")}
                  onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                  {t.sendBtn}
                </button>
              </div>
            ) : (
              /* Confirmação de envio */
              <div style={{ padding: "60px 0" }}>
                <div style={{ fontFamily: "Syne", fontSize: 44, fontWeight: 800, color: "var(--accent)", marginBottom: 16 }}>✓</div>
                <div style={{ fontFamily: "Syne", fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{t.sentTitle}</div>
                <p style={{ fontFamily: "DM Sans", fontSize: 13, fontWeight: 300, color: "#aaaaaa" }}>{t.sentDesc}</p>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
