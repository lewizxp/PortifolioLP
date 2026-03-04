
import { useState, useEffect } from "react";

export function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [hiding,   setHiding]   = useState(false);

  useEffect(() => {
    
    const duration = 1400;
    const steps    = 60;
    const interval = duration / steps;
    let cur = 0;

    const timer = setInterval(() => {
      cur += 100 / steps;
      setProgress(Math.min(cur, 100));
      if (cur >= 100) {
        clearInterval(timer);
       
        setTimeout(() => {
          setHiding(true);
          setTimeout(onDone, 600);
        }, 200);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <div
      style={{
        position:       "fixed",
        inset:          0,
        zIndex:         9000,
        background:     "#080808",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        gap:            32,
        // Fade-out quando hiding = true
        opacity:    hiding ? 0 : 1,
        transition: "opacity .6s cubic-bezier(.4,0,1,1)",
        pointerEvents: hiding ? "none" : "all",
      }}
    >
      {/* Iniciais com brilho */}
      <div style={{ position: "relative" }}>
        {/* Glow verde */}
        <div style={{
          position:     "absolute",
          inset:        -30,
          borderRadius: "50%",
          background:   "radial-gradient(circle, rgba(200,240,101,.12) 0%, transparent 70%)",
          pointerEvents:"none",
        }} />

        <span style={{
          fontFamily:    "Syne, sans-serif",
          fontSize:      64,
          fontWeight:    800,
          letterSpacing: "-.02em",
          color:         "#e4e4e4",
          lineHeight:    1,
          position:      "relative",
        }}>
          LP<span style={{ color: "var(--accent)" }}>.</span>
        </span>
      </div>

      {/* Barra de progresso */}
      <div style={{
        width:        200,
        height:       1,
        background:   "rgba(255,255,255,.06)",
        borderRadius: 1,
        overflow:     "hidden",
        position:     "relative",
      }}>
        <div style={{
          position:     "absolute",
          left:         0,
          top:          0,
          height:       "100%",
          width:        `${progress}%`,
          background:   "var(--accent)",
          borderRadius: 1,
          transition:   "width .05s linear",
          boxShadow:    "0 0 8px rgba(200,240,101,.6)",
        }} />
      </div>

      {/* Porcentagem */}
      <span style={{
        fontFamily:    "DM Sans, sans-serif",
        fontSize:      11,
        color:         "var(--muted)",
        letterSpacing: ".12em",
        fontVariantNumeric: "tabular-nums",
      }}>
        {Math.round(progress)}%
      </span>
    </div>
  );
}
