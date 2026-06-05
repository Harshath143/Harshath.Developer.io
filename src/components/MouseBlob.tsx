import { useEffect, useRef } from "react";

/**
 * Liquid organic blob that follows the mouse with easing.
 * Uses an SVG path that morphs between several organic shapes,
 * giving the multi-lobed, gooey look.
 */
const SHAPES = [
  "M421,308Q406,366,355,401Q304,436,243,427Q182,418,131,381Q80,344,72,277Q64,210,108,162Q152,114,217,95Q282,76,341,108Q400,140,422,200Q444,260,421,308Z",
  "M438,312Q420,374,366,407Q312,440,247,430Q182,420,128,384Q74,348,78,278Q82,208,127,162Q172,116,237,99Q302,82,361,114Q420,146,440,203Q460,260,438,312Z",
  "M414,304Q402,360,353,397Q304,434,240,430Q176,426,124,386Q72,346,76,274Q80,202,128,158Q176,114,239,92Q302,70,358,108Q414,146,424,203Q434,260,414,304Z",
  "M430,300Q412,360,358,398Q304,436,242,422Q180,408,134,372Q88,336,82,272Q76,208,124,164Q172,120,237,102Q302,84,360,118Q418,152,432,206Q446,260,430,300Z",
];

export function MouseBlob() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const shapeIdx = useRef(0);

  useEffect(() => {
    const init = () => {
      target.current = { x: window.innerWidth * 0.18, y: window.innerHeight * 0.3 };
      pos.current = { ...target.current };
    };
    init();

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", init);

    let raf = 0;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.07;
      pos.current.y += (target.current.y - pos.current.y) * 0.07;
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${pos.current.x - 320}px, ${pos.current.y - 320}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const morph = window.setInterval(() => {
      shapeIdx.current = (shapeIdx.current + 1) % SHAPES.length;
      if (pathRef.current) {
        pathRef.current.setAttribute("d", SHAPES[shapeIdx.current]);
      }
    }, 2200);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", init);
      cancelAnimationFrame(raf);
      clearInterval(morph);
    };
  }, []);

  return (
    <div
      aria-hidden
      ref={wrapRef}
      className="pointer-events-none fixed top-0 left-0 z-0 hidden md:block will-change-transform"
      style={{ filter: "blur(8px)" }}
    >
      <svg width="640" height="640" viewBox="0 0 500 500" className="opacity-90">
        <defs>
          <radialGradient id="blobGrad" cx="35%" cy="35%" r="70%">
            <stop offset="0%" stopColor="oklch(0.95 0.18 95)" />
            <stop offset="60%" stopColor="oklch(0.82 0.19 80)" />
            <stop offset="100%" stopColor="oklch(0.72 0.18 60)" />
          </radialGradient>
        </defs>
        <path
          ref={pathRef}
          d={SHAPES[0]}
          fill="url(#blobGrad)"
          style={{ transition: "d 2.2s cubic-bezier(0.65,0,0.35,1)" }}
        />
      </svg>
    </div>
  );
}
