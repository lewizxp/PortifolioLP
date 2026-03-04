// ─────────────────────────────────────────────────────────────────────────────
// components/WhaleScene.jsx
// Cena submarina scroll-driven — baleia jubarte sobe em direção à luz.
// Inspirado na segunda imagem de referência: silhueta escura, god rays,
// cardume orbitando, raias planando, bolhas e pessoa na barriga da baleia.
// Canvas 2D puro — zero dependências externas.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from "react";

export function WhaleScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let prog = 0, time = 0, tail = 0, raf = null;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      prog = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Bolhas
    const bubbles = Array.from({ length: 80 }, () => ({
      x:  Math.random(), y: Math.random(),
      r:  Math.random() * 4 + 1.2,
      vy: -(Math.random() * 0.0007 + 0.0003),
      vx: (Math.random() - .5) * 0.00025,
      op: Math.random() * 0.45 + 0.15,
      wb: Math.random() * Math.PI * 2,
      ws: Math.random() * 0.022 + 0.008,
    }));

    // Cardume
    const FISH = 140;
    const fish = Array.from({ length: FISH }, (_, i) => ({
      a: (i / FISH) * Math.PI * 2, r: Math.random() * 200 + 90,
      sp: Math.random() * 0.0045 + 0.002, sz: Math.random() * 4.5 + 2,
      of: Math.random() * Math.PI * 2, ly: Math.random(),
    }));

    // Raias
    const rays = [
      { x:.12, y:.35, s:1.0, vx: .00020, vy:-.00005, a: .25 },
      { x:.84, y:.50, s:.72, vx:-.00016, vy:-.00004, a:-.28 },
      { x:.06, y:.72, s:.58, vx: .00013, vy:-.00007, a: .12 },
      { x:.70, y:.20, s:.65, vx:-.00011, vy: .00003, a:-.15 },
    ];

    const drawRay = (x, y, sz, angle, alpha) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + Math.sin(time * .018) * .07);
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-sz*1.5,-sz*.28,-sz*1.5,sz*.28,0,0);
      ctx.bezierCurveTo( sz*1.5,-sz*.28, sz*1.5,sz*.28,0,0);
      ctx.fillStyle = "rgba(8,22,55,.72)"; ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.bezierCurveTo(sz*.3,sz*.12,sz*.9,sz*.4,sz*1.2,sz*.05);
      ctx.strokeStyle="rgba(8,22,55,.6)"; ctx.lineWidth=sz*.07; ctx.stroke();
      ctx.globalAlpha = 1; ctx.restore();
    };

    const drawFish = (x, y, sz, angle, alpha) => {
      ctx.save();
      ctx.translate(x, y); ctx.rotate(angle); ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.ellipse(0,0,sz,sz*.38,0,0,Math.PI*2);
      ctx.fillStyle="rgba(8,22,55,.78)"; ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-sz,0); ctx.lineTo(-sz*1.75,-sz*.5); ctx.lineTo(-sz*1.75,sz*.5);
      ctx.closePath(); ctx.fill();
      ctx.globalAlpha=1; ctx.restore();
    };

    const drawWhale = (cx, cy, scale, t) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.1 + Math.sin(t * .28) * .022);
      ctx.scale(scale, scale);

      const dark = "6,18,45,";

      // Glow
      const glow = ctx.createRadialGradient(0,0,60,0,0,360);
      glow.addColorStop(0,"rgba(20,90,160,.06)");
      glow.addColorStop(.5,"rgba(10,50,120,.03)");
      glow.addColorStop(1,"rgba(5,20,60,0)");
      ctx.beginPath(); ctx.ellipse(0,0,360,210,0,0,Math.PI*2);
      ctx.fillStyle=glow; ctx.fill();

      // Corpo
      ctx.beginPath();
      ctx.moveTo(-220,0);
      ctx.bezierCurveTo(-220,-100,-40,-120,90,-78);
      ctx.bezierCurveTo(175,-55,205,-30,225,0);
      ctx.bezierCurveTo(205,32,175,55,90,68);
      ctx.bezierCurveTo(-40,90,-220,68,-220,0);
      ctx.closePath();
      const bodyG = ctx.createLinearGradient(0,-120,0,90);
      bodyG.addColorStop(0,  `rgba(${dark}.84)`);
      bodyG.addColorStop(.4, `rgba(${dark}.88)`);
      bodyG.addColorStop(1,  "rgba(3,10,30,.92)");
      ctx.fillStyle=bodyG; ctx.fill();

      // Reflexo dorsal
      ctx.beginPath();
      ctx.moveTo(-80,-100);
      ctx.bezierCurveTo(0,-128,70,-125,140,-88);
      ctx.bezierCurveTo(70,-104,0,-108,-80,-100);
      ctx.closePath(); ctx.fillStyle="rgba(30,100,180,.10)"; ctx.fill();

      // Listras ventrais
      for(let i=0;i<8;i++){
        const lx=-180+i*42;
        ctx.beginPath(); ctx.moveTo(lx,22);
        ctx.bezierCurveTo(lx+14,52,lx+20,60,lx+24,46);
        ctx.strokeStyle="rgba(12,30,65,.30)"; ctx.lineWidth=1.1; ctx.stroke();
      }

      // Nadadeira peitoral
      ctx.beginPath();
      ctx.moveTo(-30,35);
      ctx.bezierCurveTo(50,100,160,112,148,58);
      ctx.bezierCurveTo(130,32,44,28,-30,35);
      ctx.fillStyle=`rgba(${dark}.87)`; ctx.fill();
      ctx.strokeStyle="rgba(18,48,90,.35)"; ctx.lineWidth=.9; ctx.stroke();

      // Nadadeira dorsal
      ctx.beginPath();
      ctx.moveTo(35,-88);
      ctx.bezierCurveTo(55,-136,98,-130,108,-92);
      ctx.bezierCurveTo(86,-90,56,-90,35,-88);
      ctx.fillStyle=`rgba(${dark}.90)`; ctx.fill();

      // Cabeça
      ctx.beginPath();
      ctx.moveTo(-220,0);
      ctx.bezierCurveTo(-255,-44,-272,-18,-260,12);
      ctx.bezierCurveTo(-248,42,-226,44,-220,0);
      ctx.fillStyle=`rgba(${dark}.88)`; ctx.fill();

      // Olho
      ctx.beginPath(); ctx.arc(-214,-14,5,0,Math.PI*2);
      ctx.fillStyle="rgba(25,55,110,.92)"; ctx.fill();
      ctx.beginPath(); ctx.arc(-212,-15.5,1.8,0,Math.PI*2);
      ctx.fillStyle="rgba(70,130,200,.65)"; ctx.fill();

      // Cauda
      const tOff = Math.sin(t)*34;
      ctx.beginPath();
      ctx.moveTo(205,-18);
      ctx.bezierCurveTo(235,-12,256,-5,268,tOff*.3);
      ctx.bezierCurveTo(256,6,235,14,205,18);
      ctx.closePath(); ctx.fillStyle=`rgba(${dark}.86)`; ctx.fill();

      ctx.beginPath();
      ctx.moveTo(266,tOff*.3);
      ctx.bezierCurveTo(285,-5+tOff,318,-22+tOff,334,-44+tOff);
      ctx.bezierCurveTo(328,-60+tOff,305,-54+tOff,282,-38+tOff);
      ctx.bezierCurveTo(272,-22+tOff,268,-5,266,tOff*.3);
      ctx.fillStyle=`rgba(${dark}.89)`; ctx.fill();

      const t2=tOff*.62;
      ctx.beginPath();
      ctx.moveTo(266,tOff*.3);
      ctx.bezierCurveTo(285,6-t2,318,20-t2,334,40-t2);
      ctx.bezierCurveTo(328,55-t2,305,50-t2,282,33-t2);
      ctx.bezierCurveTo(272,18-t2,268,5,266,tOff*.3);
      ctx.fillStyle=`rgba(${dark}.89)`; ctx.fill();

      // Pessoa na barriga
      ctx.save(); ctx.translate(-50,42); ctx.rotate(.12);
      ctx.beginPath(); ctx.ellipse(0,0,5.5,11,0,0,Math.PI*2);
      ctx.fillStyle="rgba(4,12,35,.96)"; ctx.fill();
      ctx.beginPath(); ctx.arc(0,-15,5.5,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-18,-2); ctx.lineTo(18,-2);
      ctx.strokeStyle="rgba(4,12,35,.96)"; ctx.lineWidth=3.5; ctx.lineCap="round"; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-4,10); ctx.lineTo(-7,23);
      ctx.moveTo(4,10); ctx.lineTo(8,23); ctx.lineWidth=3; ctx.stroke();
      ctx.restore();
      ctx.restore();
    };

    const drawGodRays = (lx) => {
      for(let i=0;i<14;i++){
        const angle=(-0.7+(i/14)*1.4)+Math.sin(time*.007+i*.7)*.05;
        const thick=8+(i%4)*7;
        const len=H*2.2;
        ctx.save(); ctx.translate(lx,0); ctx.rotate(angle);
        const rg=ctx.createLinearGradient(0,0,0,len);
        rg.addColorStop(0,  `rgba(25,140,230,${.055+.02*Math.sin(time*.01+i)})`);
        rg.addColorStop(.35,"rgba(15,90,180,.025)");
        rg.addColorStop(1,  "rgba(8,40,110,0)");
        ctx.beginPath();
        ctx.moveTo(-thick,0); ctx.lineTo(thick,0);
        ctx.lineTo(thick*3.5,len); ctx.lineTo(-thick*3.5,len);
        ctx.closePath(); ctx.fillStyle=rg; ctx.fill();
        ctx.restore();
      }
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      time++; tail+=0.04;

      const eased = 1 - Math.pow(1 - prog, 2.4);
      const wcy   = H*(.88 - eased*.68);
      const wcx   = W*(.48 + Math.sin(eased*Math.PI*1.1)*.04);
      const wsc   = Math.min(W/800, H/320) * (.48 + eased*.38);
      const camOX = Math.sin(time*.022)*(1.5+eased*2);
      const camOY = Math.cos(time*.018)*(1.0+eased*1.5);

      ctx.save();
      ctx.translate(camOX, camOY);

      // Fundo
      const bg=ctx.createLinearGradient(0,0,0,H);
      bg.addColorStop(0,"#030f20"); bg.addColorStop(.28,"#041830");
      bg.addColorStop(.7,"#031228"); bg.addColorStop(1,"#020b1c");
      ctx.fillStyle=bg; ctx.fillRect(-10,-10,W+20,H+20);

      // Luz de topo
      const lx=W*.5+Math.sin(time*.004)*W*.03;
      const topL=ctx.createRadialGradient(lx,-H*.08,0,lx,-H*.08,W*.7);
      topL.addColorStop(0,  `rgba(35,160,240,${.18+eased*.12})`);
      topL.addColorStop(.45,`rgba(18,80,170,${.07+eased*.05})`);
      topL.addColorStop(1,   "rgba(5,20,60,0)");
      ctx.fillStyle=topL; ctx.fillRect(0,0,W,H);

      drawGodRays(lx);

      // Névoa
      const fog=ctx.createLinearGradient(0,H*.55,0,H);
      fog.addColorStop(0,"rgba(2,8,20,0)"); fog.addColorStop(1,"rgba(2,8,20,.5)");
      ctx.fillStyle=fog; ctx.fillRect(0,0,W,H);

      // Raias
      rays.forEach((r,i)=>{
        r.x+=r.vx; r.y+=r.vy;
        if(r.x<-.15)r.x=1.15; if(r.x>1.15)r.x=-.15;
        if(r.y<-.1)r.y=1.1;   if(r.y>1.1)r.y=-.1;
        drawRay(r.x*W,r.y*H,36*r.s*wsc*.9,r.a+time*.005*(i%2?1:-1),.32+r.s*.18);
      });

      // Cardume
      fish.forEach(f=>{
        f.a+=f.sp;
        const ox=wcx+Math.cos(f.a+f.of)*f.r*wsc*1.5;
        const oy=wcy+Math.sin(f.a+f.of)*f.r*wsc*.65;
        const facing=Math.atan2(
          Math.sin(f.a+f.of+.01)-Math.sin(f.a+f.of),
          Math.cos(f.a+f.of+.01)-Math.cos(f.a+f.of)
        );
        drawFish(ox,oy,f.sz*wsc*.88,facing,.28+f.ly*.44);
      });

      drawWhale(wcx,wcy,wsc,tail);

      // Bolhas
      bubbles.forEach(b=>{
        b.wb+=b.ws; b.x+=b.vx+Math.sin(b.wb)*.00025; b.y+=b.vy;
        if(b.y<-.04){b.y=1.04;b.x=Math.random()*1.1-.05;}
        const bx=b.x*W,by=b.y*H,br=b.r;
        ctx.beginPath(); ctx.arc(bx,by,br,0,Math.PI*2);
        ctx.strokeStyle=`rgba(110,200,245,${b.op*.72})`; ctx.lineWidth=.85; ctx.stroke();
        ctx.beginPath(); ctx.arc(bx-br*.32,by-br*.32,br*.38,0,Math.PI*2);
        ctx.fillStyle=`rgba(180,235,255,${b.op*.38})`; ctx.fill();
      });

      // Bolhas extras da cauda
      if(time%10===0&&eased>.04){
        const tx=wcx+260*wsc+Math.sin(tail)*8;
        const ty=wcy+Math.sin(tail)*28*wsc;
        for(let i=0;i<3;i++){
          bubbles.push({
            x:tx/W+(Math.random()-.5)*.025, y:ty/H,
            r:Math.random()*4.5+1.5,
            vy:-(Math.random()*.0014+.0004),
            vx:(Math.random()-.5)*.0003,
            op:Math.random()*.42+.18,
            wb:Math.random()*Math.PI*2,
            ws:Math.random()*.024+.009,
          });
          if(bubbles.length>150)bubbles.shift();
        }
      }

      // Vignette
      const vig=ctx.createRadialGradient(W/2,H/2,H*.15,W/2,H/2,H*.9);
      vig.addColorStop(0,"rgba(2,8,20,0)");
      vig.addColorStop(1,"rgba(2,8,20,.65)");
      ctx.fillStyle=vig; ctx.fillRect(0,0,W,H);
      ctx.restore();
    };

    raf = requestAnimationFrame(loop);
    const onVis=()=>{ if(!document.hidden && !raf) raf=requestAnimationFrame(loop); };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf); raf=null;
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "clamp(320px, 50vw, 580px)",
      overflow: "hidden",
    }}>
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
      <div style={{
        position: "absolute", bottom: 22, left: "50%",
        transform: "translateX(-50%)",
        fontFamily: "DM Sans, sans-serif", fontSize: 10,
        color: "rgba(110,200,245,.45)",
        letterSpacing: ".2em", textTransform: "uppercase",
        pointerEvents: "none", userSelect: "none",
        animation: "fadeIn 2s 2s both",
      }}>
        scroll ↓
      </div>
    </div>
  );
}
