
import { useEffect, useRef } from "react";


const CONFIG = {
  count:        90,          
  minSize:      0.5,       
  maxSize:      1.8,        
  minSpeed:     0.06,        
  maxSpeed:     0.22,      
  minOpacity:   0.04,       
  maxOpacity:   0.28,       
  color:        "200,240,101", 
  fps:          40,           
};

export function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

   
    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width  = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);


    const rand = (min, max) => Math.random() * (max - min) + min;

    const particles = Array.from({ length: CONFIG.count }, () => ({
      x:       rand(0, canvas.width),
      y:       rand(0, canvas.height),
      r:       rand(CONFIG.minSize, CONFIG.maxSize),
      vx:      rand(-1, 1) * rand(CONFIG.minSpeed, CONFIG.maxSpeed),
      vy:      rand(-1, 1) * rand(CONFIG.minSpeed, CONFIG.maxSpeed),
      opacity: rand(CONFIG.minOpacity, CONFIG.maxOpacity),
     
      phase:   rand(0, Math.PI * 2),
    
      pulse:   rand(0.004, 0.012),
    }));


    const interval = 1000 / CONFIG.fps;
    let lastTime   = 0;
    let raf        = null;
    let paused     = false;

    const draw = (timestamp) => {
      raf = requestAnimationFrame(draw);
      if (paused) return;


      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
      
        p.x += p.vx;
        p.y += p.vy;

     
        if (p.x < -p.r)               p.x = canvas.width  + p.r;
        if (p.x > canvas.width  + p.r) p.x = -p.r;
        if (p.y < -p.r)               p.y = canvas.height + p.r;
        if (p.y > canvas.height + p.r) p.y = -p.r;

    e
        p.phase += p.pulse;
        const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.phase));

       
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CONFIG.color},${alpha.toFixed(3)})`;
        ctx.fill();


        if (p.r > 1.2) {
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
          grd.addColorStop(0, `rgba(${CONFIG.color},${(alpha * 0.15).toFixed(3)})`);
          grd.addColorStop(1, `rgba(${CONFIG.color},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }
      });
    };

    raf = requestAnimationFrame(draw);

   
    const handleVisibility = () => { paused = document.hidden; };
    document.addEventListener("visibilitychange", handleVisibility);


    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "absolute",
        inset:         0,
        width:         "100%",
        height:        "100%",
        pointerEvents: "none",   
        zIndex:        0,
      }}
    />
  );
}
