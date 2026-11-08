import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { sound } from "@/lib/audioSynth";

interface TacticalPreloaderProps {
  onComplete?: () => void;
}

export function TacticalPreloader({ onComplete }: TacticalPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "snap" | "done">("loading");
  const [coords, setCoords] = useState({ x: 42.09, y: 88.12 });

  useEffect(() => {
    // Coordinate random jitter to simulate live tracking
    const coordInterval = setInterval(() => {
      setCoords({
        x: +(40 + Math.random() * 5).toFixed(2),
        y: +(85 + Math.random() * 5).toFixed(2),
      });
    }, 180);

    // Progress counter
    const startTime = performance.now();
    const duration = 1800; // 1.8s tactical sequence

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(p);

      if (p < 100) {
        requestAnimationFrame(tick);
      } else {
        clearInterval(coordInterval);
        sound.playEngage();
        setPhase("snap");
        setTimeout(() => {
          setPhase("done");
          onComplete?.();
        }, 600);
      }
    };

    const animFrame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animFrame);
      clearInterval(coordInterval);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  // Glyph items for the rotating particle ring
  const ringGlyphs = Array.from({ length: 16 }).map((_, i) => {
    const angle = (i / 16) * 360;
    const glyphs = ["▲", "▼", "◈", "◇", "✚", "✛", "0", "1"];
    return {
      angle,
      glyph: glyphs[i % glyphs.length],
      isRed: i % 3 === 0,
    };
  });

  return (
    <AnimatePresence>
      <motion.div
        key="tactical-preloader"
        initial={{ opacity: 1 }}
        animate={phase === "snap" ? { opacity: 0, scale: 1.05 } : { opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden select-none"
      >
        {/* Subtle background radar circles */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-[600px] h-[600px] rounded-full border border-zinc-800" />
          <div className="absolute w-[420px] h-[420px] rounded-full border border-zinc-800/80" />
          <div className="absolute w-[240px] h-[240px] rounded-full border border-red-500/20" />
          <div className="absolute w-[800px] h-px bg-zinc-800/60" />
          <div className="absolute h-[800px] w-px bg-zinc-800/60" />
        </div>

        {/* 1. Rotating Particle Ring formed by floating geometric glyphs/triangles */}
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="relative w-72 h-72 rounded-full border border-zinc-800/60 flex items-center justify-center"
          >
            {ringGlyphs.map((item, idx) => (
              <div
                key={idx}
                className="absolute text-[11px] font-mono font-bold"
                style={{
                  transform: `rotate(${item.angle}deg) translate(144px) rotate(-${item.angle}deg)`,
                  color: item.isRed ? "#ef4444" : "#71717a",
                  textShadow: item.isRed ? "0 0 8px rgba(239, 68, 68, 0.8)" : "none",
                }}
              >
                {item.glyph}
              </div>
            ))}
          </motion.div>

          {/* Counter-rotating inner ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute w-48 h-48 rounded-full border border-dashed border-red-500/30 flex items-center justify-center"
          />

          {/* Center Tactical Crosshair */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="font-mono text-2xl font-bold tracking-tighter text-white">
              {progress}<span className="text-red-500 text-sm">%</span>
            </span>
            <span className="font-mono text-[9px] text-zinc-500 tracking-widest uppercase mt-0.5">
              SYS_TELEMETRY
            </span>
          </div>
        </div>

        {/* 2. Animated Wireframe Bounding Box scaling up with coordinate markers on corners */}
        <motion.div
          animate={{
            width: `${Math.min(90, 40 + progress * 0.45)}vw`,
            height: `${Math.min(70, 30 + progress * 0.35)}vh`,
            maxWidth: "680px",
            maxHeight: "380px",
          }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="absolute border border-red-500/40 bg-black/40 backdrop-blur-sm pointer-events-none"
        >
          {/* Corner Coordinate Markers */}
          <div className="absolute -top-3.5 -left-2 font-mono text-[9px] text-red-400 bg-[#050505] px-1 border border-red-500/40">
            [x: {coords.x}, y: {coords.y}]
          </div>
          <div className="absolute -top-3.5 -right-2 font-mono text-[9px] text-zinc-400 bg-[#050505] px-1 border border-zinc-700/60">
            [LOC: 11.01°N 76.95°E]
          </div>
          <div className="absolute -bottom-3.5 -left-2 font-mono text-[9px] text-zinc-400 bg-[#050505] px-1 border border-zinc-700/60">
            [SYS_V3.8 // HARSHATH]
          </div>
          <div className="absolute -bottom-3.5 -right-2 font-mono text-[9px] text-red-400 bg-[#050505] px-1 border border-red-500/40">
            [CORE_ACTIVE: 100%]
          </div>

          {/* Corner crosshairs */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-500" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-500" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-500" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-500" />

          {/* Horizontal laser scanline traversing the box */}
          <motion.div
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/80 to-transparent shadow-[0_0_8px_#ef4444]"
          />
        </motion.div>

        {/* 3. Bottom Loading Readout Bar */}
        <div className="relative mt-12 w-64 max-w-full flex flex-col items-center">
          <div className="w-full h-1 bg-zinc-900 border border-zinc-800 overflow-hidden relative">
            <motion.div
              className="h-full bg-red-500"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <div className="w-full flex justify-between font-mono text-[10px] text-zinc-500 mt-2">
            <span>
              {progress < 30
                ? "INITIALIZING KERNEL..."
                : progress < 70
                ? "LOADING NEURAL WEIGHTS..."
                : progress < 99
                ? "SYNCING VECTOR INDEX..."
                : "INTERFACE READY"}
            </span>
            <span className="text-red-400">{progress}%</span>
          </div>
        </div>

        {/* Tactical Skip hint */}
        <button
          onClick={() => {
            sound.playEngage();
            setPhase("done");
            onComplete?.();
          }}
          className="absolute bottom-6 font-mono text-[9px] tracking-widest text-zinc-600 hover:text-zinc-400 uppercase transition-colors"
        >
          [ESC // SKIP_INITIALIZATION]
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

