"use client";

import React, { useEffect, useRef, useState } from "react";

export function triggerMarigoldConfetti() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("trigger-marigold"));
  }
}

interface Petal {
  x: number;
  y: number;
  size: number;
  color: string;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  curl: number;
}

export function MarigoldConfetti() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleTrigger = () => {
      setIsActive(true);
    };

    window.addEventListener("trigger-marigold", handleTrigger);
    return () => window.removeEventListener("trigger-marigold", handleTrigger);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
      "#FF9933", // Traditional Indian Saffron
      "#FFB347", // Warm Marigold
      "#FFD700", // Sunny Gold
      "#E07A2B", // Terracotta Orange
      "#FFA500", // Bright Orange
      "#FFF176", // Light Golden Yellow
    ];

    const petals: Petal[] = [];
    const petalCount = 75;

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 200,
        size: 8 + Math.random() * 12,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: 2 + Math.random() * 3.5,
        speedX: (Math.random() - 0.5) * 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4,
        opacity: 0.9,
        curl: Math.random() * Math.PI,
      });
    }

    let animationId: number;
    let elapsed = 0;

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      // Draw stylized curved marigold petal
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.size * 0.5, -p.size * 0.6, p.size * 0.8, p.size * 0.4, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.4, -p.size * 0.5, -p.size * 0.6, 0, 0);
      ctx.fill();

      // Subtle center vein
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(0, 2);
      ctx.lineTo(0, p.size * 0.7);
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      elapsed++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let visibleCount = 0;

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.curl) * 1.5 + p.speedX;
        p.rotation += p.rotationSpeed;
        p.curl += 0.03;

        if (p.y < canvas.height + 40) {
          visibleCount++;
          drawPetal(p);
        }
      });

      // After 4.5 seconds or when petals fall off, stop canvas
      if (visibleCount > 0 && elapsed < 320) {
        animationId = requestAnimationFrame(render);
      } else {
        setIsActive(false);
      }
    };

    animationId = requestAnimationFrame(render);

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
    />
  );
}
