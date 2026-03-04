// ─────────────────────────────────────────────────────────────────────────────
// components/MockPreview.jsx
// Miniaturas visuais que simulam a interface de cada projeto.
// Cada preview é desenhado com divs e CSS puro — sem imagens externas.
// ─────────────────────────────────────────────────────────────────────────────

export function MockPreview({ id }) {
  const previews = {

    // ── 01: SaaS Dashboard ──────────────────────────────────────────────────
    "01": (
      <div style={{ width: "100%", height: "100%", background: "#0b0b18", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Header */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: "var(--accent)", opacity: .9 }} />
          <div style={{ flex: 1, height: 8, borderRadius: 3, background: "#1e1e2e" }} />
          <div style={{ width: 60, height: 8, borderRadius: 3, background: "#1e1e2e" }} />
        </div>
        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
          {[["#c8f065","50k"],["#88aaff","↑12%"],["#ff8866","$98k"]].map(([c, v]) => (
            <div key={v} style={{ background: "#12121f", borderRadius: 4, padding: "10px 8px", border: `1px solid ${c}22` }}>
              <div style={{ fontFamily: "Syne", fontSize: 11, color: c, fontWeight: 700 }}>{v}</div>
              <div style={{ height: 4, borderRadius: 2, background: "#1e1e2e", marginTop: 6 }}>
                <div style={{ height: "100%", width: "65%", borderRadius: 2, background: c, opacity: .7 }} />
              </div>
            </div>
          ))}
        </div>
        {/* Gráfico de barras */}
        <div style={{ flex: 1, background: "#12121f", borderRadius: 4, padding: 10, display: "flex", alignItems: "flex-end", gap: 5 }}>
          {[40,65,50,80,60,90,75,95,70,85].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "2px 2px 0 0", background: i === 9 ? "var(--accent)" : "#1e2a3a" }} />
          ))}
        </div>
        {/* Linhas de tabela */}
        {[1,2,3].map((i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ width: 18, height: 18, borderRadius: 3, background: "#1e1e2e" }} />
            <div style={{ flex: 1, height: 6, borderRadius: 2, background: "#1e1e2e" }} />
            <div style={{ width: 40, height: 6, borderRadius: 2, background: i === 1 ? "#c8f06533" : "#1e1e2e" }} />
          </div>
        ))}
      </div>
    ),

    // ── 02: TotalPrevi — Site ───────────────────────────────────────────────
    "02": (
      <div style={{ width: "100%", height: "100%", background: "#0a0a14", padding: 14, display: "flex", flexDirection: "column", gap: 9 }}>
        {/* Nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <div style={{ fontFamily: "Syne", fontSize: 10, fontWeight: 800, color: "#e4e4e4" }}>TotalPrevi</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["#1e1e2e","#1e1e2e","var(--accent)"].map((bg, i) => (
              <div key={i} style={{ width: 20, height: 6, borderRadius: 2, background: bg }} />
            ))}
          </div>
        </div>
        {/* Hero da landing */}
        <div style={{ background: "linear-gradient(135deg,#12122a,#1a1a3a)", borderRadius: 4, padding: "14px 12px", marginBottom: 2 }}>
          <div style={{ height: 7, width: "70%", borderRadius: 2, background: "#e4e4e4", marginBottom: 7, opacity: .9 }} />
          <div style={{ height: 5, width: "90%", borderRadius: 2, background: "#666", marginBottom: 5 }} />
          <div style={{ height: 5, width: "75%", borderRadius: 2, background: "#666", marginBottom: 12 }} />
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ background: "var(--accent)", borderRadius: 2, padding: "5px 12px" }}>
              <div style={{ height: 5, width: 40, borderRadius: 1, background: "#000" }} />
            </div>
            <div style={{ border: "1px solid #444", borderRadius: 2, padding: "5px 12px" }}>
              <div style={{ height: 5, width: 30, borderRadius: 1, background: "#666" }} />
            </div>
          </div>
        </div>
        {/* Cards de planos */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, flex: 1 }}>
          {["#c8f065","#88aaff","#ff8866"].map((c, i) => (
            <div key={i} style={{ background: "#12121f", borderRadius: 3, padding: 8, border: `1px solid ${c}22` }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: c, opacity: .5, marginBottom: 6 }} />
              <div style={{ height: 4, borderRadius: 1, background: "#2a2a3a", marginBottom: 4 }} />
              <div style={{ height: 4, width: "70%", borderRadius: 1, background: "#2a2a3a", marginBottom: 8 }} />
              <div style={{ fontFamily: "Syne", fontSize: 8, color: c, fontWeight: 700 }}>Saiba mais →</div>
            </div>
          ))}
        </div>
      </div>
    ),

    // ── 03: TotalPrevi — Componentes ──────────────────────────────────────
    "03": (
      <div style={{ width: "100%", height: "100%", background: "#09090f", padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
        {/* Header do chat */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 10, borderBottom: "1px solid #1a1a26" }}>
          <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#c8f065,#88aaff)" }} />
          <div>
            <div style={{ fontFamily: "Syne", fontSize: 9, fontWeight: 700, color: "#e4e4e4" }}>Oráculo IA</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#c8f065" }} />
              <span style={{ fontFamily: "DM Sans", fontSize: 8, color: "#555" }}>online</span>
            </div>
          </div>
        </div>
        {/* Mensagens */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { me: false, text: "Olá! Como posso ajudar?",          w: "80%" },
            { me: true,  text: "Preciso de um relatório mensal",    w: "70%" },
            { me: false, text: "Claro! Gerando agora...",           w: "60%" },
          ].map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.me ? "flex-end" : "flex-start" }}>
              <div style={{
                background:   m.me ? "var(--accent)" : "#1a1a26",
                color:        m.me ? "#000" : "#888",
                fontFamily:   "DM Sans",
                fontSize:     8,
                fontWeight:   m.me ? 500 : 300,
                padding:      "7px 10px",
                borderRadius: m.me ? "8px 8px 2px 8px" : "8px 8px 8px 2px",
                maxWidth:     m.w,
              }}>
                {m.text}
              </div>
            </div>
          ))}
          {/* Indicador de digitação */}
          <div style={{ display: "flex", gap: 4, padding: "6px 10px", background: "#1a1a26", borderRadius: "8px 8px 8px 2px", width: "fit-content" }}>
            {[0,1,2].map((i) => (
              <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "#444", animation: `pulseDot 1.2s ${i*0.2}s ease-in-out infinite` }} />
            ))}
          </div>
        </div>
        {/* Input */}
        <div style={{ display: "flex", gap: 8, background: "#1a1a26", borderRadius: 4, padding: "7px 10px" }}>
          <div style={{ flex: 1, height: 8, borderRadius: 2, background: "#2a2a38", alignSelf: "center" }} />
          <div style={{ width: 22, height: 22, borderRadius: 3, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 9, color: "#000" }}>↑</span>
          </div>
        </div>
      </div>
    ),

    // ── 04: TotalPrevi — Página Sobre ───────────────────────────────────────
    "04": (
      <div style={{ width: "100%", height: "100%", background: "#080c0e", padding: 14, display: "flex", flexDirection: "column", gap: 9 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: "Syne", fontSize: 9, fontWeight: 700, color: "#e4e4e4", letterSpacing: ".06em" }}>INFRA MONITOR</div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#c8f065", animation: "pulseDot 1.5s ease-in-out infinite" }} />
            <span style={{ fontFamily: "DM Sans", fontSize: 8, color: "#c8f065" }}>live</span>
          </div>
        </div>
        {/* Linhas de servidor */}
        {[
          { name: "api-prod-01", cpu: 42, status: "ok"   },
          { name: "api-prod-02", cpu: 78, status: "warn" },
          { name: "db-main",     cpu: 31, status: "ok"   },
          { name: "cdn-edge",    cpu: 15, status: "ok"   },
        ].map((s) => (
          <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 8, background: "#0e1214", borderRadius: 3, padding: "7px 10px" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.status === "ok" ? "#c8f065" : "#ff8844", flexShrink: 0 }} />
            <span style={{ fontFamily: "monospace", fontSize: 8.5, color: "#666", flex: 1 }}>{s.name}</span>
            <div style={{ width: 60, height: 4, borderRadius: 2, background: "#1a2028" }}>
              <div style={{ height: "100%", width: `${s.cpu}%`, borderRadius: 2, background: s.cpu > 70 ? "#ff8844" : "#c8f065", opacity: .8 }} />
            </div>
            <span style={{ fontFamily: "monospace", fontSize: 8, color: s.cpu > 70 ? "#ff8844" : "#555", minWidth: 28, textAlign: "right" }}>{s.cpu}%</span>
          </div>
        ))}
        {/* Log */}
        <div style={{ flex: 1, background: "#0a0f10", borderRadius: 3, padding: "8px 10px", overflow: "hidden" }}>
          {["✓ deploy #482 successful","→ scaling api-prod-02","⚠ cpu spike detected","✓ alert sent to slack"].map((l, i) => (
            <div key={i} style={{ fontFamily: "monospace", fontSize: 7.5, color: i === 2 ? "#ff8844" : i === 0 ? "#c8f065" : "#333", marginBottom: 4, opacity: 1 - i * 0.18 }}>
              {l}
            </div>
          ))}
        </div>
      </div>
    ),
  };

  return previews[id] || null;
}
