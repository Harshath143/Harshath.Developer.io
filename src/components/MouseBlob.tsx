import { useEffect, useRef } from "react";

/**
 * Lightweight, GPU-accelerated ambient glow blob following cursor
 */
export function MouseBlob() {
  const blobRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const init = () => {
      target.current = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.45 };
      pos.current = { ...target.current };
    };
    init();

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", init);

    let raf = 0;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.08;
      pos.current.y += (target.current.y - pos.current.y) * 0.08;
      if (blobRef.current) {
        blobRef.current.style.transform = `translate3d(${pos.current.x - 200}px, ${pos.current.y - 200}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", init);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      ref={blobRef}
      className="pointer-events-none fixed top-0 left-0 z-0 hidden md:block w-[400px] h-[400px] rounded-full opacity-25 transition-colors duration-500 will-change-transform"
      style={{
        background: "radial-gradient(circle, var(--color-primary) 0%, rgba(0,0,0,0) 70%)",
      }}
    />
  );
}

