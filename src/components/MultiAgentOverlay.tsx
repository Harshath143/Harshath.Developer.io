import { motion, AnimatePresence } from "framer-motion";
import { useAgentRebuild } from "@/context/AgentRebuildContext";

export function MultiAgentOverlay() {
  const { phase, activeBox } = useAgentRebuild();

  if (phase !== "BUILDING") return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden select-none">
      
      {/* Red Alignment Laser Guidelines across screen as in video */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        exit={{ opacity: 0 }}
        className="absolute top-[28%] left-0 right-0 h-[1px] bg-red-500/50 shadow-[0_0_8px_#ef4444]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        exit={{ opacity: 0 }}
        className="absolute top-0 bottom-0 left-[35%] w-[1px] bg-red-500/50 shadow-[0_0_8px_#ef4444]"
      />

      {/* Blueprint Cyan Wireframe Overlay Bounding Box (Exact match to video frames 2s & 16s) */}
      <AnimatePresence>
        {activeBox && (
          <motion.div
            key={activeBox.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              left: `${activeBox.x}px`,
              top: `${activeBox.y}px`,
              width: `${activeBox.width}px`,
              height: `${activeBox.height}px`,
            }}
            className="absolute border-2 border-cyan-400 bg-cyan-400/5 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
          >
            {/* Corner handles */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-cyan-400 border border-black" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 border border-black" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-400 border border-black" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-cyan-400 border border-black" />

            {/* Crosshair in center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-cyan-400 text-xs font-bold opacity-80">
              +
            </div>

            {/* Blue Dimension Tag on top edge */}
            <div className="absolute -top-5 left-1 px-1.5 py-0.2 bg-cyan-400 text-black font-mono text-[9px] font-bold rounded-sm tracking-wider">
              {activeBox.dimension}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
