import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frame = 0;
    let raf;

    const DPR = Math.min(2, window.devicePixelRatio || 1);

    function resize() {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(DPR, DPR);
    }

    function loop() {
      frame += 0.5;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = window.innerWidth;
      const h = window.innerHeight;

      for (let i = 0; i < 7; i++) {
        const x = (Math.sin((frame + i * 20) / 40) + 1) * 0.5 * w;
        const y = (Math.cos((frame + i * 30) / 50) + 1) * 0.5 * h;
        const r = 180 + Math.sin((frame + i * 10) / 60) * 120;

        const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
        grd.addColorStop(0, `rgba(255,255,255,${0.06 + i * 0.01})`);
        grd.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    }

    resize();
    loop();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" aria-hidden />;
}
