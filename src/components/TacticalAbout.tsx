import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Cpu, Zap, Database, ShieldCheck, CheckCircle2, Award, Terminal, Code2 } from "lucide-react";
import { sound } from "@/lib/audioSynth";
import {
  useAgentRebuild,
  FULL_ABOUT_BIO_P1,
  FULL_ABOUT_BIO_P2,
  FULL_ABOUT_BIO_P3,
  FULL_ABOUT_QUOTE,
} from "@/context/AgentRebuildContext";

const STATS = [
  { value: 1, suffix: "+", label: "Years In Production", sub: "Holistic MD LLP & OPSEN" },
  { value: 10, suffix: "+", label: "Shipped AI Systems", sub: "RAG & Autonomous Agents" },
  { value: 15, suffix: "", label: "Verified Credentials", sub: "GATE Top 5% & IITM GUVI" },
  { value: 7, suffix: "+", label: "Multi-Agent Networks", sub: "LangGraph StateGraphs" },
];

const TENETS = [
  {
    id: "sovereign",
    number: "01",
    title: "Sovereign Silicon",
    tagline: "Zero reliance on third-party cloud lock-in for critical inference pathways.",
    desc: "Architecting on-premise and edge-capable AI systems using local Ollama instances, Groq LPU hardware acceleration, and lightweight models like Wav2Vec2 and MMS-TTS. This enables deterministic sub-90ms roundtrip speeds while ensuring absolute data sovereignty and air-gapped security.",
    telemetry: [
      { label: "Target Latency", value: "<90ms P99" },
      { label: "Execution Mode", value: "Offline Edge / LPU" },
      { label: "Speech Engine", value: "Wav2Vec2 + MMS-TTS" },
    ],
  },
  {
    id: "architecture",
    number: "02",
    title: "First-Principles Architecture",
    tagline: "Every layer built with deliberate necessity. No brittle prompt chains.",
    desc: "Moving beyond naive linear chains to directed acyclic graphs via LangGraph. Each specialized agent (Planner, Architect, Retriever, Validator) operates with isolated context, tool-reasoning bounds, and verified fallback mechanisms to eliminate circular reasoning loops and guarantee output convergence.",
    telemetry: [
      { label: "Orchestrator", value: "LangGraph StateGraph" },
      { label: "Handoff Protocol", value: "Structured Tool Call" },
      { label: "Error Recovery", value: "Deterministic Retry Gate" },
    ],
  },
  {
    id: "verification",
    number: "03",
    title: "Axiomatic Verification",
    tagline: "Autonomous systems must verify actions against deterministic ground truths.",
    desc: "Rigorous evaluation pipelines utilizing cosine similarity thresholds, RAG triad metrics (Context Relevance, Groundedness, Answer Relevance), and synthetic stress testing. Hallucination guardrails and automated regression gates ensure no untested weights reach production users.",
    telemetry: [
      { label: "Context Hit-Rate", value: "98.4%" },
      { label: "Evaluation Framework", value: "RAG Triad + TruLens" },
      { label: "Accuracy Boost", value: "+40% Empirical" },
    ],
  },
  {
    id: "rag",
    number: "04",
    title: "Distributed Memory Bus",
    tagline: "Multi-tiered caching pairing dense vector indexes with analytical columnar storage.",
    desc: "Combining dense vector retrievers with Redis cache layers and ClickHouse analytical databases for real-time document comprehension and high-speed telemetry. Ingesting millions of records with sub-second retrieval times to feed autonomous agents with real-time operational context.",
    telemetry: [
      { label: "Vector Search", value: "Dense + Sparse Hybrid" },
      { label: "Analytics DB", value: "ClickHouse Columnar" },
      { label: "Cache Layer", value: "Redis Key-Value" },
    ],
  },
];

function AnimatedCounter({ to, suffix }: { to: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const dur = 1200;
        const t0 = performance.now();
        const frame = (t: number) => {
          const progress = Math.min(1, (t - t0) / dur);
          setVal(Math.floor(start + (to - start) * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) requestAnimationFrame(frame);
        };
        requestAnimationFrame(frame);
        observer.disconnect();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

export function TacticalAbout() {
  const [openTenet, setOpenTenet] = useState<string>("sovereign");
  const {
    phase,
    aboutBioP1,
    aboutBioP2,
    aboutBioP3,
    aboutQuote,
    isAboutBuilt,
    activeBox,
  } = useAgentRebuild();
  const isBuilding = phase === "BUILDING";

  return (
    <section id="about" className="relative px-4 md:px-8 lg:px-12 py-24 border-t border-zinc-800/80 bg-[#050505]">
      
      {/* Background Radar Grid */}
      <div className="absolute inset-0 radar-grid opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Top Tag as shown in video: // 01.00 SEC_ABOUT INDEX [01/05] */}
        <div id="rebuild-about-header" className="font-mono text-xs text-zinc-500 mb-6 flex items-center gap-2">
          <span>// 01.00 SEC_ABOUT INDEX [01/05]</span>
          {isBuilding && activeBox?.id === "about-header" && (
            <span className="inline-block w-1.5 h-3.5 bg-cyan-400 animate-pulse" />
          )}
        </div>

        {/* Section Header */}
        <div className="mb-10">
          <div className="text-red-500 font-mono text-[11px] font-bold uppercase tracking-widest mb-1.5">
            ENGINEER PROFILE
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Background & Philosophy
          </h2>
        </div>

        {/* Split Layout as in video */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Bio Prose + Red Callout Quote (Cols 1-7) */}
          <div className="lg:col-span-7 space-y-5">
            <div id="rebuild-about-bio">
              {aboutBioP1 || !isBuilding ? (
                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans text-pretty">
                    {isBuilding ? aboutBioP1 : FULL_ABOUT_BIO_P1}
                    {isBuilding && aboutBioP1 && !aboutBioP2 && (
                      <span className="inline-block w-1.5 h-4 bg-cyan-400 animate-pulse ml-0.5" />
                    )}
                  </p>

                  {(aboutBioP2 || !isBuilding) && (
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans text-pretty">
                      {isBuilding ? aboutBioP2 : FULL_ABOUT_BIO_P2}
                      {isBuilding && aboutBioP2 && !aboutBioP3 && (
                        <span className="inline-block w-1.5 h-4 bg-cyan-400 animate-pulse ml-0.5" />
                      )}
                    </p>
                  )}

                  {(aboutBioP3 || !isBuilding) && (
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans text-pretty">
                      {isBuilding ? aboutBioP3 : FULL_ABOUT_BIO_P3}
                      {isBuilding && aboutBioP3 && (
                        <span className="inline-block w-1.5 h-4 bg-cyan-400 animate-pulse ml-0.5" />
                      )}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  <div className="h-4 bg-zinc-900/60 rounded w-full border border-dashed border-zinc-800/40" />
                  <div className="h-4 bg-zinc-900/50 rounded w-11/12 border border-dashed border-zinc-800/40" />
                  <div className="h-4 bg-zinc-900/40 rounded w-4/5 border border-dashed border-zinc-800/40" />
                  <div className="h-4 bg-zinc-900/30 rounded w-9/12 border border-dashed border-zinc-800/40" />
                </div>
              )}
            </div>

            {/* Red Callout Box with bold vertical left border as seen in video */}
            <div id="rebuild-about-quote" className="relative p-4 sm:p-5 bg-[#0b0b0e] border-l-4 border-l-red-600 border border-zinc-800/80 my-4 min-h-[5.5rem]">
              {activeBox?.id === "about-quote" && (
                <div className="absolute -top-5 left-0 px-1.5 py-0.2 bg-cyan-400 text-black font-mono text-[9px] font-bold rounded-sm z-20">
                  580 × 120
                </div>
              )}
              {aboutQuote || !isBuilding ? (
                <p className="font-sans text-sm sm:text-base text-white font-medium italic leading-relaxed">
                  {isBuilding ? aboutQuote : FULL_ABOUT_QUOTE}
                  {isBuilding && activeBox?.id === "about-quote" && (
                    <span className="inline-block w-1.5 h-4 bg-cyan-400 animate-pulse ml-0.5" />
                  )}
                </p>
              ) : (
                <div className="space-y-2">
                  <div className="h-3.5 bg-zinc-900/60 rounded w-full border border-dashed border-zinc-800/40" />
                  <div className="h-3.5 bg-zinc-900/40 rounded w-4/5 border border-dashed border-zinc-800/40" />
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Operational Tenets Accordion as in video (Cols 8-12) */}
          <div id="rebuild-about-tenets" className="lg:col-span-5 space-y-2.5">
            {TENETS.map((tenet) => {
              const isOpen = (isAboutBuilt || !isBuilding) && openTenet === tenet.id;
              return (
                <div
                  key={tenet.id}
                  className={`bg-[#0b0b0e] border transition-all duration-200 overflow-hidden ${
                    isOpen ? "border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.15)]" : "border-zinc-800/80 hover:border-zinc-700"
                  }`}
                >
                  <button
                    onClick={() => {
                      sound.playClick();
                      setOpenTenet(openTenet === tenet.id ? "" : tenet.id);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className="w-full p-4 flex items-center justify-between text-left font-mono cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`text-xs font-bold ${isOpen ? "text-red-500" : "text-zinc-500"}`}>
                        {tenet.number}
                      </span>
                      <h4 className="font-display font-bold text-base text-white">
                        {tenet.title}
                      </h4>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-zinc-400 transition-transform duration-200 shrink-0 ml-2 ${
                        isOpen ? "rotate-180 text-red-500" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-4 pt-1 border-t border-zinc-800/60 font-sans"
                      >
                        <p className="text-xs text-zinc-400 font-mono mb-2">
                          // {tenet.tagline}
                        </p>
                        <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                          {tenet.desc}
                        </p>
                        <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-zinc-800/60 font-mono text-[10px]">
                          {tenet.telemetry.map((t, idx) => (
                            <div key={idx} className="p-1.5 bg-zinc-950 border border-zinc-800">
                              <span className="text-zinc-500 block">{t.label}</span>
                              <span className="text-white font-bold block mt-0.5">{t.value}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

        {/* Tactical Stat Counters Row */}
        <div id="rebuild-about-counters" className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 transition-opacity duration-300 ${
          isAboutBuilt || !isBuilding ? "opacity-100" : "opacity-25"
        }`}>
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-[#0b0b0e] border border-zinc-800/80 hover:border-red-500/50 p-5 tactical-reticle transition-colors"
            >
              <div className="font-mono text-3xl font-extrabold text-white">
                {isAboutBuilt || !isBuilding ? (
                  <AnimatedCounter to={s.value} suffix={s.suffix} />
                ) : (
                  <span>0{s.suffix}</span>
                )}
              </div>
              <div className="font-mono text-xs font-bold text-red-400 mt-2 uppercase tracking-wider">
                {s.label}
              </div>
              <div className="font-mono text-[11px] text-zinc-500 mt-0.5">
                {s.sub}
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
