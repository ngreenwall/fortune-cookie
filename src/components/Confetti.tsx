import { useEffect, useRef } from "react";

type ConfettiProps = {
  active: boolean;
};

const COLORS = ["#c9a227", "#e8c872", "#fffef8", "#a8d4f0", "#e8f4fc"];

export function Confetti({ active }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      rotation: number;
      spin: number;
    };

    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 120,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * -10 - 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 6 + 4,
      rotation: Math.random() * 360,
      spin: (Math.random() - 0.5) * 12,
    }));

    let frame = 0;
    const maxFrames = 120;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.18;
        p.rotation += p.spin;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      }

      frame += 1;
      if (frame < maxFrames) {
        requestAnimationFrame(draw);
      }
    };

    draw();
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40"
      aria-hidden="true"
    />
  );
}
