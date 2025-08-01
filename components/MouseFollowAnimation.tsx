"use client";

import { useEffect, useRef } from 'react';

interface Dot {
  x: number;
  y: number;
  opacity: number;
  scale: number;
}

export function MouseFollowAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1, y: -1 });
  const dotsRef = useRef<Dot[]>([]);
  const animationRef = useRef<number>();
  const isHoveringButtonRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize dots grid
    const initDots = () => {
      dotsRef.current = [];
      const spacing = 40;
      const cols = Math.ceil(canvas.width / spacing);
      const rows = Math.ceil(canvas.height / spacing);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dotsRef.current.push({
            x: i * spacing,
            y: j * spacing,
            opacity: 0.1,
            scale: 1,
          });
        }
      }
    };

    initDots();

    // Mouse move handler - only track within container
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Only update if mouse is within the container
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseRef.current = { x, y };
        
        // Check if hovering over a button or interactive element
        const target = e.target as HTMLElement;
        isHoveringButtonRef.current = target.tagName === 'BUTTON' || 
                                     target.closest('button') !== null ||
                                     target.classList.contains('cursor-pointer') ||
                                     target.closest('a') !== null;
      } else {
        mouseRef.current = { x: -1, y: -1 };
        isHoveringButtonRef.current = false;
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const fadeMultiplier = isHoveringButtonRef.current ? 0.1 : 1;

      dotsRef.current.forEach((dot) => {
        // Calculate distance from mouse to dot
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        // Calculate opacity and scale based on distance
        if (distance < maxDistance && mouse.x > 0 && mouse.y > 0) {
          const influence = 1 - distance / maxDistance;
          dot.opacity = Math.min(0.8, 0.1 + influence * 0.7) * fadeMultiplier;
          dot.scale = 1 + influence * 1.5;
        } else {
          dot.opacity = Math.max(0.05, dot.opacity * 0.95) * fadeMultiplier;
          dot.scale = Math.max(1, dot.scale * 0.95);
        }

        // Draw dot with glow effect
        if (dot.opacity > 0.05) {
          ctx.save();
          
          // Create gradient for glow effect
          const gradient = ctx.createRadialGradient(
            dot.x, dot.y, 0,
            dot.x, dot.y, 8 * dot.scale
          );
          gradient.addColorStop(0, `rgba(20, 184, 166, ${dot.opacity})`);
          gradient.addColorStop(0.5, `rgba(20, 184, 166, ${dot.opacity * 0.5})`);
          gradient.addColorStop(1, `rgba(20, 184, 166, 0)`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 8 * dot.scale, 0, Math.PI * 2);
          ctx.fill();

          // Draw core dot
          ctx.fillStyle = `rgba(20, 184, 166, ${dot.opacity})`;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 2 * dot.scale, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.restore();
        }
      });

      // Draw mouse glare effect
      if (mouse.x > 0 && mouse.y > 0) {
        ctx.save();
        
        const glareOpacity = fadeMultiplier;
        const glareGradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 100
        );
        glareGradient.addColorStop(0, `rgba(20, 184, 166, ${0.15 * glareOpacity})`);
        glareGradient.addColorStop(0.3, `rgba(16, 185, 129, ${0.08 * glareOpacity})`);
        glareGradient.addColorStop(1, `rgba(20, 184, 166, 0)`);

        ctx.fillStyle = glareGradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ 
          mixBlendMode: 'screen'
        }}
      />
    </div>
  );
}