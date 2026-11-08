import { useState } from "react";
import { Volume2, VolumeX, RotateCcw, Play, Pause, Zap } from "lucide-react";
import { sound } from "@/lib/audioSynth";
import { useAgentRebuild } from "@/context/AgentRebuildContext";

interface TacticalDockProps {
  onToggleHud?: () => void;
  onOpenCommandPalette?: () => void;
}

export function TacticalDock({ onToggleHud, onOpenCommandPalette }: TacticalDockProps) {
  const {
    phase,
    isRebuilding,
    isTouring,
    speed,
    progress,
    layerCount,
    totalLayers,
    agentCount,
    completedTime,
    triggerReplay,
    toggleSpeed,
    toggleTour,
  } = useAgentRebuild();
  const [soundActive, setSoundActive] = useState(true);

  const toggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    sound.enabled = next;
    if (next) sound.playClick();
  };

  const handleReplayClick = () => {
    sound.playClick();
    triggerReplay();
  };

  return (
    <aside
      aria-label="Tactical agent telemetry dock"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 pointer-events-auto select-none"
    >
      <div className="bg-[#0a0a0d]/92 backdrop-blur-md border border-zinc-800/90 rounded-full px-3.5 sm:px-5 py-2 flex items-center gap-2.5 sm:gap-4 font-mono text-[11px] sm:text-xs text-zinc-300 shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
        
        {/* 5-Colored Agent Swarm Dots (Exact match to video) */}
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
          <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
          <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
          <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_6px_#c084fc]" />
        </div>

        {/* Dynamic Status Readout (as in video) */}
        <div className="whitespace-nowrap font-medium text-zinc-200">
          {isRebuilding ? (
            <span>
              <span className="text-cyan-400 font-bold">{agentCount} agents</span>{" "}
              <span>{layerCount} / {totalLayers} layers</span>
            </span>
          ) : (
            <span>
              Rebuilt by <span className="text-white font-bold">{agentCount} agents</span> in{" "}
              <span className="text-cyan-400 font-bold">{completedTime}</span>
            </span>
          )}
        </div>

        {/* Cyan Progress Bar (Exact match to video) */}
        <div className="w-16 sm:w-24 h-1.5 bg-zinc-800/90 rounded-full overflow-hidden">
          <div
            className="h-full bg-cyan-400 transition-all duration-150 shadow-[0_0_8px_#22d3ee]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* During Building: Touring Pill & Speed Multiplier (as seen in video frames 2s, 6s, 22s) */}
        {isRebuilding ? (
          <>
            <button
              onClick={toggleTour}
              title={isTouring ? "Pause tour scrolling" : "Resume tour scrolling"}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500 text-black text-[10px] font-bold tracking-wider cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.6)]"
            >
              <span>{isTouring ? "Touring" : "Tour"}</span>
            </button>

            <button
              onClick={toggleSpeed}
              title="Cycle simulation speed (1x -> 2x -> 4x)"
              className="px-2 py-0.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white text-[10px] font-bold font-mono transition-colors cursor-pointer"
            >
              {speed}x
            </button>
          </>
        ) : (
          <>
            {/* On-Air Pulsing Status Pill when tour complete */}
            <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-[10px] text-cyan-300 font-bold tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>On-air</span>
            </div>

            {/* Replay Button (Interactive Trigger) */}
            <button
              onClick={handleReplayClick}
              onMouseEnter={() => sound.playHover()}
              title="Replay autonomous multi-agent rebuild simulation"
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-cyan-400 text-zinc-300 hover:text-white transition-colors cursor-pointer text-[10px] sm:text-xs font-semibold"
            >
              <RotateCcw className="h-3 w-3 text-cyan-400" />
              <span>Replay</span>
            </button>
          </>
        )}

        {/* Audio Avionics Toggle */}
        <button
          onClick={toggleSound}
          title={soundActive ? "Mute audio avionics" : "Unmute audio avionics"}
          className="p-1 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
        >
          {soundActive ? <Volume2 className="h-3.5 w-3.5 text-cyan-400" /> : <VolumeX className="h-3.5 w-3.5 text-zinc-600" />}
        </button>

      </div>
    </aside>
  );
}
