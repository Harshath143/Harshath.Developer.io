import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Cpu, Github } from "lucide-react";
import { sound } from "@/lib/audioSynth";
import profilePic from "../assets/Harshath_profile.jpeg";
import { useAgentRebuild, FULL_HELLO, FULL_NAME, FULL_ROLE, FULL_BIO } from "@/context/AgentRebuildContext";

const RIGHT_STACK_ITEMS = [
  {
    code: "01.",
    title: "Autonomous Multi-Agent Swarm",
    sub: "LangGraph StateGraph • Local vLLM/DeepSeek • Zero cloud lock-in",
    tag: "RUNTIME",
  },
  {
    code: "02.",
    title: "Multilingual Voice AI Assistant",
    sub: "Sub-85ms Groq LPU + Whisper STT + MMS-TTS in Tamil & Marathi",
    tag: "VOICE_AI",
  },
  {
    code: "03.",
    title: "Real-Time Vision Stream LPU",
    sub: "Django Channels • Groq Vision API • 60 FPS Video • Edge Inference",
    tag: "CV_GROQ",
  },
];

const TECH_CHIPS = [
  "PyTorch",
  "LangGraph",
  "FastAPI",
  "Groq LPU",
  "Docker",
  "Redis",
  "ClickHouse",
  "Wav2Vec2",
];

export function TacticalHero() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const {
    phase,
    heroHello,
    heroName,
    heroRole,
    heroBio,
    isNamePlaced,
    isButtonsPlaced,
    isMetricsPlaced,
    isAvatarPlaced,
    isStackPlaced,
    isTitlePlaced,
    activeBox,
  } = useAgentRebuild();

  const isBuilding = phase === "BUILDING";

  return (
    <section id="hero" className="relative min-h-[96vh] flex flex-col justify-center pt-24 pb-16 px-4 md:px-8 lg:px-12 overflow-hidden bg-[#050505]">
      
      {/* Background Subtle Radar Grid */}
      <div className="absolute inset-0 radar-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Giant Red Outline Title: PORTFOLIO */}
        <div id="rebuild-hero-title" className="relative w-full text-center sm:text-left mb-6 overflow-hidden select-none">
          {activeBox?.id === "title" && (
            <div className="absolute -top-6 left-0 px-1.5 py-0.5 bg-cyan-500 text-black font-mono text-[9px] font-bold rounded-sm tracking-wider z-20">
              1144 × 288
            </div>
          )}

          <h1
            className={`portfolio-outline-title text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] leading-none tracking-wider transition-opacity duration-300 ${
              isTitlePlaced || !isBuilding ? "opacity-100" : "opacity-0"
            }`}
          >
            PORTFOLIO
          </h1>
        </div>

        {/* 3-Column Tactical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Hello, I'm HARSHATH + Bio + CTAs (Cols 1-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Handwritten "Hello, I'm" - streamed char-by-char as cursor glides */}
              <div id="rebuild-hero-hello" className="relative inline-block mb-1 min-h-[2rem]">
                {activeBox?.id === "hello" && (
                  <div className="absolute -top-5 left-0 px-1.5 py-0.2 bg-cyan-400 text-black font-mono text-[9px] font-bold rounded-sm z-20">
                    158 × 56
                  </div>
                )}
                <div className="handwritten-intro flex items-center">
                  <span>{isBuilding ? heroHello : FULL_HELLO}</span>
                  {isBuilding && activeBox?.id === "hello" && (
                    <span className="inline-block w-1.5 h-6 bg-cyan-400 animate-pulse ml-0.5" />
                  )}
                </div>
              </div>

              {/* Solid Red Rectangle Banner with streamed HARSHATH. name */}
              <div id="rebuild-hero-name" className="relative block mt-1 min-h-[3rem]">
                {activeBox?.id === "name" && (
                  <div className="absolute -top-5 left-0 px-1.5 py-0.2 bg-cyan-400 text-black font-mono text-[9px] font-bold rounded-sm z-20">
                    220 × 75
                  </div>
                )}
                {isNamePlaced || !isBuilding ? (
                  <motion.div
                    initial={{ scale: 0.88, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                    className="inline-flex items-center bg-[#ef4444] px-4 py-1.5 text-white font-extrabold text-3xl sm:text-4xl tracking-tight shadow-[0_0_25px_rgba(239,68,68,0.45)] border border-red-500 min-w-[180px]"
                  >
                    <span>{isBuilding ? heroName : FULL_NAME}</span>
                    {isBuilding && activeBox?.id === "name" && (
                      <span className="inline-block w-2 h-7 bg-white animate-pulse ml-1" />
                    )}
                  </motion.div>
                ) : (
                  <div className="inline-block border border-dashed border-red-500/40 w-44 h-11 bg-red-950/20" />
                )}
              </div>

              {/* Role Indicator Pill */}
              <div id="rebuild-hero-role" className="relative mt-4 min-h-[1.75rem]">
                {activeBox?.id === "role" && (
                  <div className="absolute -top-5 left-0 px-1.5 py-0.2 bg-cyan-400 text-black font-mono text-[9px] font-bold rounded-sm z-20">
                    385 × 28
                  </div>
                )}
                {heroRole || !isBuilding ? (
                  <div className="inline-flex items-center gap-2 font-mono text-[11px] text-zinc-300 bg-zinc-950/80 px-2.5 py-1 rounded border border-zinc-800">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-red-pulse" />
                    <span className="tracking-wider uppercase font-semibold">
                      {isBuilding ? heroRole : FULL_ROLE}
                    </span>
                    {isBuilding && activeBox?.id === "role" && (
                      <span className="inline-block w-1.5 h-3.5 bg-red-500 animate-pulse ml-0.5" />
                    )}
                  </div>
                ) : (
                  <div className="inline-block border border-dashed border-zinc-800/60 w-64 h-6 rounded" />
                )}
              </div>

              {/* Bio Prose - streamed character-by-character at high speed */}
              <div id="rebuild-hero-bio" className="relative mt-5 min-h-[4.5rem]">
                {activeBox?.id === "bio" && (
                  <div className="absolute -top-5 left-0 px-1.5 py-0.2 bg-cyan-400 text-black font-mono text-[9px] font-bold rounded-sm z-20">
                    440 × 120
                  </div>
                )}
                {heroBio || !isBuilding ? (
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans max-w-md">
                    {isBuilding ? heroBio : FULL_BIO}
                    {isBuilding && activeBox?.id === "bio" && (
                      <span className="inline-block w-1.5 h-4 bg-cyan-400 animate-pulse ml-0.5" />
                    )}
                  </p>
                ) : (
                  <div className="space-y-2 max-w-md pt-1">
                    <div className="h-3 bg-zinc-900/60 rounded w-full border border-dashed border-zinc-800/40" />
                    <div className="h-3 bg-zinc-900/40 rounded w-5/6 border border-dashed border-zinc-800/40" />
                  </div>
                )}
              </div>

              {/* Action CTAs */}
              <div id="rebuild-hero-buttons" className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 min-h-[3rem]">
                {isButtonsPlaced || !isBuilding ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
                  >
                    <a
                      href="#contact"
                      onClick={() => sound.playClick()}
                      onMouseEnter={() => sound.playHover()}
                      className="tactical-btn inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0a0a0d] hover:bg-zinc-900 text-white font-mono text-xs font-bold border border-cyan-400/80 shadow-[0_0_18px_rgba(34,211,238,0.25)] transition-colors group cursor-pointer"
                    >
                      <span>INITIATE DISPATCH</span>
                      <ArrowRight className="h-3.5 w-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <a
                      href="#deployments"
                      onClick={() => sound.playClick()}
                      onMouseEnter={() => sound.playHover()}
                      className="tactical-btn inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0b0b0e] hover:bg-zinc-900 text-zinc-200 hover:text-white font-mono text-xs font-bold border border-zinc-800 hover:border-red-500/60 transition-colors"
                    >
                      <Cpu className="h-3.5 w-3.5 text-red-500" />
                      <span>EXPLORE ARCHITECTURE</span>
                    </a>

                    <a
                      href="https://github.com/Harshath143"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      onMouseEnter={() => sound.playHover()}
                      className="tactical-btn inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#0b0b0e] hover:bg-zinc-900 text-zinc-300 hover:text-white font-mono text-xs font-bold border border-zinc-800 hover:border-zinc-600 transition-colors group cursor-pointer"
                    >
                      <Github className="h-3.5 w-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                      <span>GITHUB // @Harshath143</span>
                    </a>
                  </motion.div>
                ) : (
                  <div className="flex gap-3">
                    <div className="h-11 w-36 border border-dashed border-cyan-500/30 rounded" />
                    <div className="h-11 w-44 border border-dashed border-zinc-800/40 rounded" />
                    <div className="h-11 w-28 border border-dashed border-zinc-800/40 rounded" />
                  </div>
                )}
              </div>
            </div>

            {/* Bottom 3-Metric Row */}
            <div id="rebuild-hero-metrics" className={`mt-8 pt-5 border-t border-zinc-800/80 flex flex-wrap items-center gap-5 font-mono text-xs select-none transition-opacity duration-300 ${
              isMetricsPlaced || !isBuilding ? "opacity-100" : "opacity-20"
            }`}>
              <div>
                <span className="font-extrabold text-red-500 text-sm">10+</span>
                <span className="text-zinc-400 text-[11px] ml-1.5">Shipped AI Systems</span>
              </div>
              <div className="h-3 w-px bg-zinc-800" />
              <div>
                <span className="font-extrabold text-white text-sm">AIR #2852</span>
                <span className="text-zinc-400 text-[11px] ml-1.5">GATE Top 5%</span>
              </div>
              <div className="h-3 w-px bg-zinc-800" />
              <div>
                <span className="font-extrabold text-emerald-400 text-sm">100%</span>
                <span className="text-zinc-400 text-[11px] ml-1.5">Production Uptime</span>
              </div>
            </div>
          </div>

          {/* Center Column: Operator Portrait Card (Exact 1:1 match to video frame 6s / crop_6s_photo.png) */}
          <div id="rebuild-hero-avatar" className="lg:col-span-3 flex justify-center">
            {isAvatarPlaced || !isBuilding ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative w-full max-w-[280px] aspect-[3/4] bg-[#ef4444] border border-red-500 overflow-hidden shadow-[0_0_35px_rgba(239,68,68,0.4)] select-none group"
              >
                {/* Corner crosshair & GitHub profile tag */}
                <div className="absolute top-2 left-2 font-mono text-xs text-white opacity-90 z-20">+</div>
                <a
                  href="https://github.com/Harshath143"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View Mohammed Harshath on GitHub (@Harshath143)"
                  className="absolute top-2 right-2 font-mono text-[9px] text-white/90 bg-black/75 hover:bg-black px-1.5 py-0.5 rounded border border-white/20 hover:border-white transition-all z-20 flex items-center gap-1 cursor-pointer"
                >
                  <Github className="h-2.5 w-2.5 text-white" />
                  <span>@Harshath143</span>
                </a>

                {/* Full-bleed Duotone Portrait with multiply blending on pure red canvas */}
                <div className="relative w-full h-full bg-[#ef4444]">
                  <img
                    src={profilePic}
                    alt="Mohammed Harshath Operator"
                    className="w-full h-full object-cover filter contrast-[1.65] brightness-90 grayscale mix-blend-multiply group-hover:mix-blend-normal transition-all duration-300"
                  />
                  {/* Subtle red tint wash to guarantee seamless background integration */}
                  <div className="absolute inset-0 bg-red-600/10 pointer-events-none mix-blend-color" />
                </div>

                {/* Overlaid Sovereign Silicon Badge in bottom-left corner OF the portrait */}
                <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5">
                  <span className="font-mono text-white text-xs font-bold select-none">+</span>
                  <a
                    href="https://github.com/Harshath143"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub: https://github.com/Harshath143"
                    className="py-1 px-2.5 bg-black/95 text-white hover:text-cyan-300 font-mono text-[9px] tracking-wider uppercase font-extrabold flex items-center gap-1.5 border border-red-500/70 shadow-[0_0_12px_rgba(0,0,0,0.8)] transition-colors cursor-pointer"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>#SOVEREIGN SILICON ACTIVE</span>
                  </a>
                </div>

                {/* Technical calibration bracket line along the bottom edge */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent z-20" />
              </motion.div>
            ) : (
              <div className="w-full max-w-[280px] aspect-[3/4] border border-cyan-400/80 bg-cyan-400/5 flex flex-col items-center justify-center font-mono text-cyan-400 text-xs gap-3">
                <span className="text-sm font-bold">+</span>
                <span className="tracking-widest uppercase font-semibold">[OPERATOR_TARGET]</span>
                <span className="px-1.5 py-0.5 bg-cyan-400 text-black text-[9px] font-bold rounded-sm">280 × 380</span>
              </div>
            )}
          </div>

          {/* Right Column: Deployment Cards Stack + Tech Chips (Cols 9-12) */}
          <div id="rebuild-hero-stack" className="lg:col-span-4 flex flex-col justify-between space-y-4">
            {isStackPlaced || !isBuilding ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-3"
              >
                {RIGHT_STACK_ITEMS.map((item, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => {
                      sound.playHover();
                      setActiveCardIndex(idx);
                    }}
                    className={`p-3.5 bg-[#0b0b0e] border transition-all duration-200 cursor-pointer tactical-reticle ${
                      activeCardIndex === idx
                        ? "border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                        : "border-zinc-800/80 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-1">
                      <span className="text-red-500 font-bold">{item.code}</span>
                      <span className="px-1.5 py-0.2 bg-zinc-900 border border-zinc-800 text-[9px] uppercase">
                        {item.tag}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-sm text-white">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-zinc-400 font-mono mt-1 leading-snug">
                      {item.sub}
                    </p>
                  </div>
                ))}
              </motion.div>
            ) : (
              <div className="space-y-3">
                <div className="h-20 border border-dashed border-zinc-800/50 bg-zinc-950/40 rounded flex items-center justify-center font-mono text-zinc-700 text-xs">
                  [CARD_01_RUNTIME]
                </div>
                <div className="h-20 border border-dashed border-zinc-800/50 bg-zinc-950/40 rounded flex items-center justify-center font-mono text-zinc-700 text-xs">
                  [CARD_02_VOICE_AI]
                </div>
                <div className="h-20 border border-dashed border-zinc-800/50 bg-zinc-950/40 rounded flex items-center justify-center font-mono text-zinc-700 text-xs">
                  [CARD_03_CV_GROQ]
                </div>
              </div>
            )}

            {/* Tech Stack Chips at bottom right */}
            <div className={`pt-3 border-t border-zinc-800/80 transition-opacity duration-300 ${
              isStackPlaced || !isBuilding ? "opacity-100" : "opacity-20"
            }`}>
              <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-2">
                // ACTIVE OPERATIONAL ARSENAL
              </span>
              <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                {TECH_CHIPS.map((chip) => (
                  <span
                    key={chip}
                    className="px-2.5 py-1 bg-zinc-950 border border-zinc-800 text-zinc-300 hover:border-red-500/50 hover:text-white transition-colors"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
