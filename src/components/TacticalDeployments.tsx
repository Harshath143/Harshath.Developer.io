import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Github, ExternalLink, Terminal, Cpu, Database, Layers, Radio, CheckCircle2, ChevronRight, Activity } from "lucide-react";
import { sound } from "@/lib/audioSynth";
import { VoiceGPTPlayer } from "./VoiceGPTPlayer";
import { useAgentRebuild, FULL_DEPLOY_TITLE, FULL_DEPLOY_DESC } from "@/context/AgentRebuildContext";

const LAYERS = [
  {
    id: "l1",
    short: "L1: Uncensored Core",
    label: "LAYER 01 // COGNITIVE CORE",
    title: "Uncensored Base Cognitive Foundation",
    desc: "Raw unfiltered local model inference running natively on GPU workstation. Completely sovereign execution free from vendor-imposed guardrail distortions or arbitrary refusal algorithms.",
    chips: ["Local 9B Quantized", "RTX 4070 12GB", "Groq LPU Engine"],
  },
  {
    id: "l2",
    short: "L2: Dynamic Tone",
    label: "LAYER 02 // PERSONALITY DISPATCH",
    title: "Contextual Persona & Prompt Engineering",
    desc: "Dynamic role orchestration shifting between rigorous analytical audit, tactical technical execution, and structured conversational synthesis depending on domain urgency.",
    chips: ["Adaptive System Prompt", "Token Optimizer", "Few-Shot Alignment"],
  },
  {
    id: "l3",
    short: "L3: Voice Synthesis",
    label: "LAYER 03 // SPEECH & AUDIO HARNESS",
    title: "Multilingual Offline Audio Pipeline",
    desc: "Wav2Vec2 acoustic phoneme recognition combined with Facebook MMS-TTS neural vocoders. 100% air-gapped Tamil, Marathi, and English voice interaction running at <450ms TTS generation.",
    chips: ["Wav2Vec2 STT", "Meta MMS-TTS", "<450ms Latency"],
  },
  {
    id: "l4",
    short: "L4: Autonomous Loop",
    label: "LAYER 04 // AGENT SWARM ROUTER",
    title: "LangGraph Directed Acyclic State Machine",
    desc: "Multi-agent consensus architecture where Planner, Architect, Developer, and Reviewer agents pass structured state objects with guaranteed convergence and zero circular deadlock.",
    chips: ["LangGraph StateGraph", "Deterministic Gate", "Structured Handoff"],
  },
  {
    id: "l5",
    short: "L5: 4-Tier Memory",
    label: "LAYER 05 // VECTOR & CACHE BUS",
    title: "Hybrid Columnar & Dense Vector Memory",
    desc: "Four-tier memory architecture pairing in-memory L1 cache with Redis key-value store, Qdrant/FAISS dense semantic embeddings, and ClickHouse high-velocity columnar analytics.",
    chips: ["Redis L1 Cache", "Dense Vector Store", "ClickHouse Columnar"],
  },
  {
    id: "l6",
    short: "L6: Proactive Brain",
    label: "LAYER 06 // CONTINUOUS VERIFICATION",
    title: "Automated RAG Triad Benchmarking",
    desc: "Continuous evaluation against gold-standard test sets. Context relevance, groundedness, and answer correctness measured automatically before any weight or pipeline update is released.",
    chips: ["RAG Triad Metrics", "TruLens Validation", "Zero Hallucination Gate"],
  },
  {
    id: "l7",
    short: "L7: Self-Evolution",
    label: "LAYER 07 // REFLECTION & EXPANSION",
    title: "Autonomous Tool Generation & Fine-Tuning",
    desc: "Continuous self-improvement loops that analyze execution trace failures, synthesize new tool definitions, and trigger local LoRA fine-tuning runs on curated interaction logs.",
    chips: ["Autonomous Tool Creator", "LoRA Fine-tuning", "Trace Analyzer"],
  },
];

const SUB_DEPLOYMENTS = [
  {
    category: "DEFI // HIGH-FREQUENCY",
    title: "Flash_Lab — Arbitrage & Liquidation Engine",
    desc: "Production flash loan arbitrage and Aave V3 liquidation engine deployed on Polygon mainnet. Custom Solidity contract with asynchronous multi-hop routing.",
    bullets: [
      "Polygon Mainnet (Aave V3 Flash Loans)",
      "Uniswap V3, QuickSwap & Curve Liquidity",
      "2,969 LOC Async WebSockets Engine",
    ],
    chips: ["Solidity", "Aave V3", "WebSockets"],
    github: "https://github.com/Harshath143/AI_Agent_Investment_Advisory",
  },
  {
    category: "MOBILE // COMMERCIAL PRODUCT",
    title: "Biller — Offline-First Invoicing System",
    desc: "Commercial mobile billing and inventory application deployed for active retail enterprises. Operates in zero-connectivity environments with instant thermal printing.",
    bullets: [
      "Offline SQLite with Repository Pattern",
      "ESC/POS Bluetooth Thermal Printing",
      "GST-Compliant Invoicing & Realtime P&L",
    ],
    chips: ["Flutter", "Offline SQLite", "Bluetooth ESC/POS"],
    github: "https://github.com/Harshath143",
  },
  {
    category: "QUANT // INSTITUTIONAL FLOW",
    title: "Quantitative XAUUSD & Forex Engine",
    desc: "Systematized institutional trading engine for commodities/currency pairs based on Inner Circle Trader (ICT) concepts. Real-time institutional order flow and liquidity sweeps.",
    bullets: [
      "ICT Order Flow & Fair Value Gaps (FVG)",
      "Pine Script v5 Indicator Suite & Webhooks",
      "Strict Multi-Timeframe Confluence",
    ],
    chips: ["ICT Order Flow", "Pine Script v5", "FastAPI"],
    github: "https://github.com/Harshath143",
  },
];

export function TacticalDeployments() {
  const {
    phase,
    deployTitle,
    deployDesc,
    isDeployMetricsPlaced,
    activeDeployLayer,
    isDeployLayersPlaced,
    isDeploymentsBuilt,
    activeBox,
  } = useAgentRebuild();
  const [userSelectedLayer, setUserSelectedLayer] = useState<string | null>(null);

  const isBuilding = phase === "BUILDING";

  // Use user click or sync with tour
  const currentLayerId = userSelectedLayer || activeDeployLayer || "l1";
  const activeLayer = LAYERS.find((l) => l.id === currentLayerId) || LAYERS[0];

  return (
    <section id="deployments" className="relative px-4 md:px-8 lg:px-12 py-24 border-t border-zinc-800/80 bg-[#050505]">
      
      {/* Background Subtle Radar Grid */}
      <div className="absolute inset-0 radar-grid opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header as in video frame 22s */}
        <div id="rebuild-deploy-header" className="mb-10">
          <div className="text-red-500 font-mono text-[11px] font-bold uppercase tracking-widest mb-1.5">
            ARCHITECTURAL SHOWCASE
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Flagship Deployments
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-mono max-w-3xl">
            Production-grade systems running 24/7 across local silicon, blockchain mainnets, and commercial endpoints.
          </p>
        </div>

        {/* Flagship Hero Card (Exact match to video frame 22s and 28s) */}
        <div id="rebuild-deploy-ecosystem" className="relative bg-[#0b0b0e] border border-zinc-800/90 p-6 md:p-8 tactical-reticle mb-8">
          {activeBox?.id === "deploy-ecosystem" && (
            <div className="absolute -top-6 left-0 px-1.5 py-0.5 bg-cyan-500 text-black font-mono text-[9px] font-bold rounded-sm tracking-wider z-20">
              1144 × 420
            </div>
          )}

          {/* Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-950/40 border border-red-500/40 text-red-400 font-mono text-[10px] font-bold mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            CORE ECOSYSTEM
          </div>

          <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight flex items-center">
            <span>{isBuilding ? deployTitle : FULL_DEPLOY_TITLE}</span>
            {isBuilding && deployTitle && !deployDesc && (
              <span className="inline-block w-2 h-7 bg-cyan-400 animate-pulse ml-1" />
            )}
          </h3>

          <div className="mt-3 min-h-[3rem]">
            {deployDesc || !isBuilding ? (
              <p className="text-xs sm:text-sm text-zinc-300 font-sans max-w-4xl leading-relaxed">
                {isBuilding ? deployDesc : FULL_DEPLOY_DESC}
                {isBuilding && activeBox?.id === "deploy-ecosystem" && deployDesc && (
                  <span className="inline-block w-1.5 h-4 bg-cyan-400 animate-pulse ml-0.5" />
                )}
              </p>
            ) : (
              <div className="space-y-2 max-w-4xl pt-1">
                <div className="h-3.5 bg-zinc-900/60 rounded w-full border border-dashed border-zinc-800/40" />
                <div className="h-3.5 bg-zinc-900/40 rounded w-5/6 border border-dashed border-zinc-800/40" />
              </div>
            )}
          </div>

          {/* 4 Giant Metric Numbers in Red as in video frames 22s & 28s */}
          <div id="rebuild-deploy-metrics" className="grid grid-cols-2 sm:grid-cols-4 gap-6 my-8 py-5 border-y border-zinc-800/80 font-mono text-center sm:text-left">
            <div>
              <div className="text-3xl sm:text-5xl font-extrabold text-red-500">
                {isDeployMetricsPlaced || !isBuilding ? "478" : "--"}
              </div>
              <div className="text-[11px] text-zinc-400 mt-1 uppercase font-semibold">MCP Tools</div>
            </div>
            <div>
              <div className="text-3xl sm:text-5xl font-extrabold text-red-500">
                {isDeployMetricsPlaced || !isBuilding ? "14" : "--"}
              </div>
              <div className="text-[11px] text-zinc-400 mt-1 uppercase font-semibold">MCP Servers</div>
            </div>
            <div>
              <div className="text-3xl sm:text-5xl font-extrabold text-red-500">
                {isDeployMetricsPlaced || !isBuilding ? "15m" : "--"}
              </div>
              <div className="text-[11px] text-zinc-400 mt-1 uppercase font-semibold">Cycle Time</div>
            </div>
            <div>
              <div className="text-3xl sm:text-5xl font-extrabold text-red-500">
                {isDeployMetricsPlaced || !isBuilding ? "Master" : "--"}
              </div>
              <div className="text-[11px] text-zinc-400 mt-1 uppercase font-semibold">Status</div>
            </div>
          </div>

          {/* 7-LAYER CONSTITUTIONAL STACK as in video */}
          <div id="rebuild-deploy-layers" className="mt-6">
            <div className="text-[11px] font-mono font-bold text-white uppercase tracking-wider mb-1">
              7-LAYER CONSTITUTIONAL STACK
            </div>
            <div className="text-[10px] font-mono text-zinc-500 mb-4">
              Click a layer to inspect implementation
            </div>

            {/* Horizontal Layer Pills Bar */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-zinc-950 border border-zinc-800 mb-5">
              {LAYERS.map((layer) => {
                const isActive = activeLayer.id === layer.id;
                return (
                  <button
                    key={layer.id}
                    onClick={() => {
                      sound.playClick();
                      setUserSelectedLayer(layer.id);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className={`px-3 py-1 font-mono text-xs transition-all cursor-pointer ${
                      isActive
                        ? "bg-red-600 text-white font-bold shadow-[0_0_10px_rgba(239,68,68,0.4)]"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                    }`}
                  >
                    {layer.short}
                  </button>
                );
              })}
            </div>

            {/* Active Layer Inspector Box as in video frame 28s */}
            <div className="p-5 bg-zinc-950 border border-zinc-800">
              <div className="font-mono text-[10px] text-red-500 font-bold uppercase mb-1">
                {activeLayer.label}
              </div>
              <h4 className="font-display font-bold text-lg text-white mb-2">
                {activeLayer.title}
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed mb-4">
                {activeLayer.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {activeLayer.chips.map((chip) => (
                  <span
                    key={chip}
                    className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 font-mono text-[10px] text-zinc-300"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* 3 Sub-Deployment Project Cards (Exact match to video frame 34s) */}
        <div id="rebuild-deploy-subcards" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {SUB_DEPLOYMENTS.map((proj, idx) => {
            const isUnlocked = isDeploymentsBuilt || !isBuilding;
            return (
              <div
                key={idx}
                className={`bg-[#0b0b0e] border p-5 flex flex-col justify-between tactical-reticle transition-all duration-300 ${
                  isUnlocked
                    ? "border-zinc-800/90 hover:border-red-500/60"
                    : "border-zinc-800/40 opacity-40"
                }`}
              >
                {isUnlocked ? (
                  <>
                    <div>
                      <div className="font-mono text-[10px] text-red-500 font-bold uppercase mb-2">
                        {proj.category}
                      </div>
                      <h4 className="font-display font-bold text-base text-white mb-2 leading-snug">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4">
                        {proj.desc}
                      </p>
                      <ul className="space-y-1.5 font-mono text-[11px] text-zinc-300 mb-5">
                        {proj.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-1.5">
                            <span className="text-red-500">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {proj.chips.map((chip) => (
                          <span
                            key={chip}
                            className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-300"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>

                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => sound.playClick()}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-white transition-colors"
                      >
                        <Github className="h-3.5 w-3.5 text-zinc-400" />
                        <span>Source Code</span>
                        <ChevronRight className="h-3 w-3 text-red-500" />
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="h-48 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="h-3 bg-zinc-900/60 rounded w-28 border border-dashed border-red-500/30" />
                      <div className="h-4 bg-zinc-900/60 rounded w-48 border border-dashed border-zinc-800/40" />
                      <div className="h-3 bg-zinc-900/40 rounded w-full border border-dashed border-zinc-800/40" />
                    </div>
                    <div className="h-3 bg-zinc-900/30 rounded w-32 border border-dashed border-zinc-800/40" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
