import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Play, RotateCcw, Cpu, CheckCircle2, Terminal, ArrowRight, Zap, Bot, Database, Sparkles } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

type Scenario = {
  id: string;
  title: string;
  category: string;
  description: string;
  metrics: { label: string; value: string }[];
  steps: {
    node: string;
    agent: string;
    action: string;
    output: string;
    latency: string;
  }[];
};

const SCENARIOS: Scenario[] = [
  {
    id: "langgraph",
    title: "LangGraph Legislative Automation",
    category: "Holistic MD LLP — Multi-Agent RAG",
    description: "Automated legislative document comprehension & policy analysis using multi-agent state graphs.",
    metrics: [
      { label: "Latency Reduction", value: "30%" },
      { label: "RAG Accuracy", value: "+40%" },
      { label: "Doc Processing", value: "Sub-Second" },
    ],
    steps: [
      {
        node: "ROUTER",
        agent: "LangGraph Intent Classifier",
        action: "Parsing incoming legislative policy query & extracting metadata constraints...",
        output: "{ intent: 'policy_audit', jurisdiction: 'India/UK', urgency: 'high' }",
        latency: "14ms",
      },
      {
        node: "RAG_RETRIEVER",
        agent: "Vector Search Engine",
        action: "Querying dense embeddings across 10,000+ legislative documents using cosine similarity...",
        output: "[ 4 Relevant Policy Clauses Found | Similarity Score: 0.94 ]",
        latency: "85ms",
      },
      {
        node: "COMPLIANCE_AGENT",
        agent: "Tool Reasoning Agent",
        action: "Cross-referencing retrieved policy clauses against compliance rulebook...",
        output: "✓ Zero compliance conflicts detected. 2 risk warnings flagged.",
        latency: "120ms",
      },
      {
        node: "SYNTHESIZER",
        agent: "LLM Response Synthesizer",
        action: "Generating structured legislative summary with exact clause citations...",
        output: "Policy Audit Complete: All 4 clauses verified. Latency reduced by 30%.",
        latency: "210ms",
      },
    ],
  },
  {
    id: "stock_advisory",
    title: "Stock Advisory Multi-Agent System",
    category: "Predictive Analytics & RAG",
    description: "Predictive stock analysis & personalized investment advisor with 99.9% uptime inference API.",
    metrics: [
      { label: "API Uptime", value: "99.9%" },
      { label: "Inference Speed", value: "<1.2s" },
      { label: "Data Sources", value: "7+ Live Streams" },
    ],
    steps: [
      {
        node: "QUERY_INGEST",
        agent: "FastAPI Gateway",
        action: "Receiving user portfolio query: 'Analyze tech equity volatility for Q4'...",
        output: "{ ticker: 'AAPL/MSFT/NVDA', timeframe: 'Q4', model: 'LlamaIndex-RAG' }",
        latency: "8ms",
      },
      {
        node: "MARKET_FETCHER",
        agent: "Data Extraction Agent",
        action: "Fetching real-time price feeds, earnings reports & SEC filings from 7 data sources...",
        output: "[ Ingested 1,420 fundamental data points & sentiment feeds ]",
        latency: "140ms",
      },
      {
        node: "PREDICTIVE_MODEL",
        agent: "Transformer Inference Engine",
        action: "Running predictive sentiment models & monte carlo risk probability simulations...",
        output: "{ predicted_sharpe: 2.14, risk_factor: 'Low-Medium', trend: 'Bullish' }",
        latency: "340ms",
      },
      {
        node: "PORTFOLIO_AGENT",
        agent: "Investment Strategy Agent",
        action: "Formatting tailored investment allocation strategy with step-by-step reasoning...",
        output: "Recommendation: Rebalance 15% towards AI equities. Target return: +18.4%.",
        latency: "190ms",
      },
    ],
  },
  {
    id: "vision_analyzer",
    title: "VisionAnalyzer Multimodal Pipeline",
    category: "Computer Vision + Groq API",
    description: "Low-latency object detection & automated ingredient extraction from live camera feeds.",
    metrics: [
      { label: "FPS Rate", value: "30 FPS" },
      { label: "Groq Latency", value: "<90ms" },
      { label: "Extraction Accuracy", value: "98.2%" },
    ],
    steps: [
      {
        node: "CAMERA_STREAM",
        agent: "Django Video Processor",
        action: "Capturing live camera feed buffer at 1080p resolution...",
        output: "Frame sampled @ 30 FPS | Image Buffer size: 2.4 MB",
        latency: "12ms",
      },
      {
        node: "FRAME_NORMALIZER",
        agent: "OpenCV Preprocessing Node",
        action: "Applying bounding box segmentation & spatial contrast normalization...",
        output: "Bounding box regions localized: 3 Target Objects Detected",
        latency: "28ms",
      },
      {
        node: "GROQ_VISION_LLM",
        agent: "Groq Llama-Vision API",
        action: "Streaming frame embeddings to Groq LPU cluster for rapid ingredient extraction...",
        output: "{ detected_items: ['Organic Oats', 'Almond Milk', 'Chia Seeds'] }",
        latency: "88ms",
      },
      {
        node: "ANALYTICS_LOGGER",
        agent: "ClickHouse DB Pipeline",
        action: "Persisting structured ingredient metadata into ClickHouse analytics store...",
        output: "✓ Saved to ClickHouse DB log table | Query latency: 4ms",
        latency: "6ms",
      },
    ],
  },
];

export function AgentSandbox() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && currentStepIndex < selectedScenario.steps.length) {
      timer = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, currentStepIndex]);
        if (currentStepIndex + 1 < selectedScenario.steps.length) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          setIsRunning(false);
        }
      }, 1100);
    }
    return () => clearTimeout(timer);
  }, [isRunning, currentStepIndex, selectedScenario]);

  const handleStart = () => {
    setCurrentStepIndex(0);
    setCompletedSteps([]);
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStepIndex(0);
    setCompletedSteps([]);
  };

  const handleSelectScenario = (sc: Scenario) => {
    setIsRunning(false);
    setSelectedScenario(sc);
    setCurrentStepIndex(0);
    setCompletedSteps([]);
  };

  return (
    <section id="agent-sandbox" className="relative px-6 md:px-12 lg:px-20 py-32 bg-card/10">
      <div className="max-w-7xl mx-auto">
        <SectionTitle index="02" title="AI Agent Sandbox" kicker="LIVE AGENT ORCHESTRATION" />

        <p className="mt-4 text-muted-foreground max-w-2xl text-sm md:text-base">
          Interactive simulation of multi-agent state graphs, tool-based reasoning, and low-latency LLM inference pipelines built for production.
        </p>

        {/* Scenario Selection Tabs */}
        <div className="flex flex-wrap gap-3 mt-8">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc)}
              className={`px-5 py-2.5 rounded-full font-mono text-xs transition-all flex items-center gap-2 border ${
                selectedScenario.id === sc.id
                  ? "bg-primary text-primary-foreground border-primary font-bold shadow-md"
                  : "bg-card/60 text-muted-foreground border-border/60 hover:text-foreground hover:border-primary/40"
              }`}
            >
              <Bot className="h-3.5 w-3.5" />
              <span>{sc.title}</span>
            </button>
          ))}
        </div>

        {/* Main Interactive Sandbox Bento Layout */}
        <div className="grid lg:grid-cols-12 gap-6 mt-8">
          {/* Left Column: Control Panel & Architecture Graph (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bento-card spotlight-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] text-primary tracking-[0.2em] px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                    {selectedScenario.category}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-xs text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    SIMULATOR READY
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-foreground">
                  {selectedScenario.title}
                </h3>
                <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {selectedScenario.description}
                </p>

                {/* Metrics pill list */}
                <div className="grid grid-cols-3 gap-2 mt-6">
                  {selectedScenario.metrics.map((m) => (
                    <div key={m.label} className="bg-background/80 border border-border/60 p-2.5 rounded-xl text-center">
                      <p className="font-display font-bold text-primary text-sm">{m.value}</p>
                      <p className="font-mono text-[9px] text-muted-foreground mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-8 pt-4 border-t border-border/40">
                <button
                  onClick={handleStart}
                  disabled={isRunning}
                  className={`flex-1 py-3 px-6 rounded-full font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    isRunning
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-primary text-primary-foreground hover:opacity-90 shadow-md"
                  }`}
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  {isRunning ? "ORCHESTRATING..." : "RUN SIMULATION"}
                </button>

                <button
                  onClick={handleReset}
                  className="p-3 rounded-full glass text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                  aria-label="Reset simulation"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Agent Nodes Pipeline List */}
            <div className="bento-card spotlight-card p-6">
              <p className="font-mono text-xs text-muted-foreground mb-4 flex items-center gap-2">
                <Cpu className="h-4 w-4 text-primary" />
                <span>STATE GRAPH PIPELINE</span>
              </p>

              <div className="space-y-3">
                {selectedScenario.steps.map((step, idx) => {
                  const isDone = completedSteps.includes(idx);
                  const isCurrent = isRunning && currentStepIndex === idx;

                  return (
                    <div
                      key={step.node}
                      className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                        isCurrent
                          ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(0,212,255,0.2)]"
                          : isDone
                          ? "bg-card/80 border-emerald-500/40 text-foreground"
                          : "bg-card/40 border-border/40 text-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-7 w-7 rounded-full grid place-items-center text-xs font-mono font-bold ${
                            isCurrent
                              ? "bg-primary text-primary-foreground animate-spin"
                              : isDone
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-card border border-border"
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : idx + 1}
                        </div>
                        <div>
                          <p className="font-mono text-xs font-bold text-foreground">{step.node}</p>
                          <p className="text-[10px] text-muted-foreground font-mono">{step.agent}</p>
                        </div>
                      </div>

                      <span className="font-mono text-[10px] text-primary">{step.latency}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Terminal Console Stream (7 cols) */}
          <div className="lg:col-span-7 bento-card spotlight-card p-6 flex flex-col justify-between font-mono">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-border/40 mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-primary" />
                  <span className="text-xs text-foreground font-bold">LIVE AGENT TELEMETRY LOGS</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>
              </div>

              <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
                {completedSteps.length === 0 && !isRunning && (
                  <div className="text-center py-16 text-muted-foreground/60">
                    <Sparkles className="h-8 w-8 mx-auto mb-2 text-primary/40" />
                    <p className="text-xs">Click "RUN SIMULATION" to watch real-time multi-agent execution steps.</p>
                  </div>
                )}

                {selectedScenario.steps.map((step, idx) => {
                  const isDone = completedSteps.includes(idx);
                  const isCurrent = isRunning && currentStepIndex === idx;

                  if (!isDone && !isCurrent) return null;

                  return (
                    <motion.div
                      key={step.node}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-background/90 border border-border/80 text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between text-[11px] text-primary font-bold">
                        <span className="flex items-center gap-1.5">
                          <Zap className="h-3.5 w-3.5" /> [{step.node}] &mdash; {step.agent}
                        </span>
                        <span className="text-muted-foreground">{step.latency}</span>
                      </div>

                      <p className="text-foreground/90 font-mono text-[11px] leading-relaxed">
                        &gt; {step.action}
                      </p>

                      <div className="p-2.5 rounded-lg bg-card/90 border border-primary/20 text-emerald-400 font-mono text-[10px]">
                        {step.output}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Status Banner */}
            <div className="mt-6 pt-3 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground">
              <span>STATUS: {isRunning ? "EXECUTING GRAPH" : completedSteps.length > 0 ? "PIPELINE SUCCESS" : "IDLE"}</span>
              <span>ORCHESTRATION ENGINE: LANGGRAPH + GROQ</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
