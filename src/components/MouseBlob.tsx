import { useEffect, useRef } from "react";

export function MouseBlob() {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const init = () => {
      target.current = { x: window.innerWidth * 0.15, y: window.innerHeight * 0.25 };
      pos.current = { ...target.current };
    };
    init();

    const handleMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("resize", init);

    let raf = 0;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.08;
      pos.current.y += (target.current.y - pos.current.y) * 0.08;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${pos.current.x - 320}px, ${pos.current.y - 320}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", init);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-0 hidden md:block"
    >
      <div
        ref={ref}
        className="h-[640px] w-[640px] rounded-full blob-yellow opacity-80 will-change-transform"
        style={{ filter: "blur(40px)" }}
      />
    </div>
  );
}
