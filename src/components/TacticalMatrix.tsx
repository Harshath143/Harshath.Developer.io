import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Github, ExternalLink, Terminal, Copy, Check, Filter, Layers, Database, Cpu } from "lucide-react";
import { sound } from "@/lib/audioSynth";
import { useAgentRebuild, FULL_MATRIX_SUBTITLE, FULL_MATRIX_CARDS } from "@/context/AgentRebuildContext";

interface MatrixItem {
  id: string;
  sysCode: string;
  title: string;
  category: "Autonomous AI" | "Quant & Markets" | "Core Engineering";
  tag: string;
  tagColor: string;
  blurb: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  github?: string;
}

const MATRIX_ITEMS: MatrixItem[] = [
  {
    id: "mat-01",
    sysCode: "#SYS-01",
    title: "Multi-LLM Parliament Architecture",
    category: "Autonomous AI",
    tag: "Autonomous AI",
    tagColor: "text-red-400 border-red-500/40 bg-red-950/20",
    blurb: FULL_MATRIX_CARDS[0],
    stack: ["Multi-Agent", "Consensus Protocol", "LangGraph", "Groq LPU"],
    metrics: [
      { label: "Shards", value: "6 Personas" },
      { label: "Voting", value: "Borda Count" },
      { label: "Convergence", value: "<1.4s" },
    ],
    github: "https://github.com/Harshath143/AI_Company_prototype",
  },
  {
    id: "mat-02",
    sysCode: "#SYS-02",
    title: "AIT Kronos — ML Time Series Forecaster",
    category: "Quant & Markets",
    tag: "Machine Learning",
    tagColor: "text-amber-400 border-amber-500/40 bg-amber-950/20",
    blurb: FULL_MATRIX_CARDS[1],
    stack: ["FastAPI", "PyTorch", "Transformers", "Docker"],
    metrics: [
      { label: "P95 Latency", value: "<1.2s" },
      { label: "Uptime", value: "99.9%" },
      { label: "Feeds", value: "7+ Streams" },
    ],
    github: "https://github.com/Harshath143/AI_Agent_Investment_Advisory",
  },
  {
    id: "mat-03",
    sysCode: "#SYS-03",
    title: "DLFM — Dynamical Latent Field Model",
    category: "Core Engineering",
    tag: "Deep Learning",
    tagColor: "text-cyan-400 border-cyan-500/40 bg-cyan-950/20",
    blurb: FULL_MATRIX_CARDS[2],
    stack: ["PyTorch, CUDA", "Latent Dynamics", "TensorRT"],
    metrics: [
      { label: "Dimension", value: "1024-D" },
      { label: "Loss (MSE)", value: "0.0014" },
      { label: "Execution", value: "Pure CUDA" },
    ],
    github: "https://github.com/Harshath143",
  },
  {
    id: "mat-04",
    sysCode: "#SYS-04",
    title: "GPU-Accelerated Cryptographic Search",
    category: "Core Engineering",
    tag: "GPU Acceleration",
    tagColor: "text-emerald-400 border-emerald-500/40 bg-emerald-950/20",
    blurb: FULL_MATRIX_CARDS[3],
    stack: ["CUDA C++", "secp256k1", "RTX 4070"],
    metrics: [
      { label: "Throughput", value: "85M keys/s" },
      { label: "Arch", value: "SM 8.9" },
      { label: "Precision", value: "Bit-exact" },
    ],
    github: "https://github.com/Harshath143",
  },
  {
    id: "mat-05",
    sysCode: "#SYS-05",
    title: "Hedge Fund Structure & Institutional Design",
    category: "Quant & Markets",
    tag: "Financial Architecture",
    tagColor: "text-purple-400 border-purple-500/40 bg-purple-950/20",
    blurb: FULL_MATRIX_CARDS[4],
    stack: ["LP/GP Architecture", "Risk Modeling", "Python"],
    metrics: [
      { label: "Watermark", value: "High-Water" },
      { label: "Auditing", value: "Realtime" },
      { label: "Compliance", value: "Automated" },
    ],
    github: "https://github.com/Harshath143",
  },
  {
    id: "mat-06",
    sysCode: "#SYS-06",
    title: "Axiom of Truth Cognitive Framework",
    category: "Autonomous AI",
    tag: "AI Philosophy",
    tagColor: "text-red-400 border-red-500/40 bg-red-950/20",
    blurb: FULL_MATRIX_CARDS[5],
    stack: ["Epistemology", "Verification", "Truth Engine"],
    metrics: [
      { label: "Hallucination", value: "<0.1%" },
      { label: "Anchors", value: "Axiomatic" },
      { label: "Grounding", value: "100%" },
    ],
    github: "https://github.com/Harshath143",
  },
];

type CategoryFilter = "ALL Systems (6)" | "Autonomous AI" | "Quant & Markets" | "Core Engineering";

export function TacticalMatrix() {
  const [activeTab, setActiveTab] = useState<CategoryFilter>("ALL Systems (6)");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const {
    phase,
    matrixSubtitle,
    matrixCards,
    matrixBuiltCount,
    isMatrixBuilt,
    activeBox,
  } = useAgentRebuild();

  const isBuilding = phase === "BUILDING";

  const categories: CategoryFilter[] = [
    "ALL Systems (6)",
    "Autonomous AI",
    "Quant & Markets",
    "Core Engineering",
  ];

  const filteredItems = MATRIX_ITEMS.filter((item) => {
    if (activeTab === "ALL Systems (6)") return true;
    return item.category === activeTab;
  });

  const handleCopyClone = (id: string, sysCode: string) => {
    sound.playClick();
    navigator.clipboard.writeText(`git clone https://github.com/Harshath143/${sysCode.toLowerCase()}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="matrix" className="relative px-4 md:px-8 lg:px-12 py-24 border-t border-zinc-800/80 bg-[#050505]">
      
      {/* Background Subtle Radar Grid */}
      <div className="absolute inset-0 radar-grid opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div id="rebuild-matrix-header" className="mb-8">
          <div className="text-red-500 font-mono text-[11px] font-bold uppercase tracking-widest mb-1.5">
            ENGINEERING INDEX
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            The Systems Matrix
          </h2>
          <div className="mt-2 min-h-[1.5rem]">
            {matrixSubtitle || !isBuilding ? (
              <p className="text-xs sm:text-sm text-zinc-400 font-mono max-w-3xl">
                {isBuilding ? matrixSubtitle : FULL_MATRIX_SUBTITLE}
                {isBuilding && activeBox?.id === "matrix-header" && (
                  <span className="inline-block w-1.5 h-3.5 bg-cyan-400 animate-pulse ml-0.5" />
                )}
              </p>
            ) : (
              <div className="h-3 bg-zinc-900/60 rounded w-96 border border-dashed border-zinc-800/40" />
            )}
          </div>
        </div>

        {/* Tactical Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-zinc-800/80">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setActiveTab(cat);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`px-3.5 py-1.5 font-mono text-xs transition-all duration-200 cursor-pointer ${
                activeTab === cat
                  ? "bg-red-600 text-white font-bold shadow-[0_0_12px_rgba(239,68,68,0.35)] border border-red-500"
                  : "bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700"
              }`}
            >
              [{cat}]
            </button>
          ))}
        </div>

        {/* 3-Column Tactical Systems Grid (Exact match to video frames 40s, 42s, 46s) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            const streamedBlurb = matrixCards[idx] || "";
            const isUnlocked = idx < matrixBuiltCount || !isBuilding;
            const cardElementId = `rebuild-matrix-card-${idx + 1}`;

            return (
              <div
                key={item.id}
                id={cardElementId}
                className={`bg-[#0b0b0e] border p-6 flex flex-col justify-between tactical-reticle transition-all duration-300 ${
                  isUnlocked
                    ? "border-zinc-800/90 hover:border-red-500/60"
                    : "border-zinc-800/40 opacity-35"
                }`}
              >
                {isUnlocked ? (
                  <>
                    <div>
                      {/* Top Bar: Category Tag Pill + System Code */}
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${item.tagColor}`}>
                          {item.tag}
                        </span>
                        <span className="font-mono text-xs font-bold text-zinc-500">
                          {item.sysCode}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-bold text-lg text-white mb-2 leading-snug">
                        {item.title}
                      </h3>

                      {/* Blurb - streamed text */}
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed mb-5 min-h-[3rem]">
                        {isBuilding ? streamedBlurb : item.blurb}
                        {isBuilding && streamedBlurb && streamedBlurb.length < item.blurb.length && (
                          <span className="inline-block w-1.5 h-3.5 bg-cyan-400 animate-pulse ml-0.5" />
                        )}
                      </p>

                      {/* 3 Telemetry Metrics */}
                      <div className="grid grid-cols-3 gap-1.5 py-3 border-y border-zinc-800/80 mb-5 font-mono text-[10px]">
                        {item.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="p-1.5 bg-zinc-950 border border-zinc-800/80">
                            <span className="text-zinc-500 block">{m.label}</span>
                            <span className="text-white font-bold block mt-0.5">{m.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      {/* Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {item.stack.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-400"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* Bottom Actions: Clone Command & GitHub Link */}
                      <div className="flex items-center justify-between pt-3 border-t border-zinc-800/60 font-mono text-[11px]">
                        <button
                          onClick={() => handleCopyClone(item.id, item.sysCode)}
                          className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>git::clone</span>
                            </>
                          )}
                        </button>

                        {item.github && (
                          <a
                            href={item.github}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => sound.playClick()}
                            className="flex items-center gap-1 text-zinc-400 hover:text-red-400 transition-colors"
                          >
                            <span>Inspect</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="h-64 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <div className="h-4 w-20 bg-zinc-900 border border-dashed border-red-500/30 rounded" />
                        <span className="font-mono text-xs text-zinc-700">{item.sysCode}</span>
                      </div>
                      <div className="h-5 bg-zinc-900/60 rounded w-3/4 mb-3 border border-dashed border-zinc-800/40" />
                      <div className="space-y-2">
                        <div className="h-3 bg-zinc-900/40 rounded w-full border border-dashed border-zinc-800/30" />
                        <div className="h-3 bg-zinc-900/30 rounded w-5/6 border border-dashed border-zinc-800/30" />
                      </div>
                    </div>
                    <div className="h-3 bg-zinc-900/20 rounded w-1/2 border border-dashed border-zinc-800/30" />
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
