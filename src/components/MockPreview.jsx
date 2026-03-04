

export function MockPreview({ id }) {
  const previews = {


    "01": (
      <div style={{ width: "100%", height: "100%", background: "#0b0b18", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: "var(--accent)", opacity: .9 }} />
          <div style={{ flex: 1, height: 8, borderRadius: 3, background: "#1e1e2e" }} />
          <div style={{ width: 60, height: 8, borderRadius: 3, background: "#1e1e2e" }} />
        </div>
        
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
       
        <div style={{ flex: 1, background: "#12121f", borderRadius: 4, padding: 10, display: "flex", alignItems: "flex-end", gap: 5 }}>
          {[40,65,50,80,60,90,75,95,70,85].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "2px 2px 0 0", background: i === 9 ? "var(--accent)" : "#1e2a3a" }} />
          ))}
        </div>
       
        {[1,2,3].map((i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ width: 18, height: 18, borderRadius: 3, background: "#1e1e2e" }} />
            <div style={{ flex: 1, height: 6, borderRadius: 2, background: "#1e1e2e" }} />
            <div style={{ width: 40, height: 6, borderRadius: 2, background: i === 1 ? "#c8f06533" : "#1e1e2e" }} />
          </div>
        ))}
      </div>
    ),

    
    "02": (
      <div style={{ width: "100%", height: "100%", background: "#0a0a14", padding: 14, display: "flex", flexDirection: "column", gap: 9 }}>
    
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

    

  };

  return previews[id] || null;
}
