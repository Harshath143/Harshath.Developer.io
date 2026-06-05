import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Activity, Database, Network, ShieldCheck, Cpu } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

export function Telemetry() {
  const [latency, setLatency] = useState(122);
  const [latencyHistory, setLatencyHistory] = useState<number[]>([120, 124, 118, 125, 122, 119, 126, 121, 123, 120]);
  const [ragAcc, setRagAcc] = useState(94.2);
  const [cacheHit, setCacheHit] = useState(84.6);
  const [activeAgents, setActiveAgents] = useState([true, true, true, true, true, true, true, false, true, true, true, true]);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      // 1. Update Latency
      const latDiff = (Math.random() - 0.5) * 6;
      setLatency((prev) => {
        const nextVal = Math.round(Math.max(110, Math.min(140, prev + latDiff)));
        setLatencyHistory((history) => {
          const newHistory = [...history.slice(1), nextVal];
          return newHistory;
        });
        return nextVal;
      });

      // 2. Update RAG accuracy
      setRagAcc((prev) => {
        const accDiff = (Math.random() - 0.5) * 0.2;
        return parseFloat(Math.max(92.5, Math.min(96.5, prev + accDiff)).toFixed(2));
      });

      // 3. Update Cache Hit Rate
      setCacheHit((prev) => {
        const hitDiff = (Math.random() - 0.5) * 0.4;
        return parseFloat(Math.max(80.0, Math.min(90.0, prev + hitDiff)).toFixed(2));
      });

      // 4. Randomly toggle one agent beacon status
      setActiveAgents((prev) => {
        const next = [...prev];
        const indexToToggle = Math.floor(Math.random() * next.length);
        // Ensure at least 8 agents are active
        const activeCount = next.filter(Boolean).length;
        if (activeCount <= 8) {
          next[indexToToggle] = true;
        } else {
          next[indexToToggle] = Math.random() > 0.15;
        }
        return next;
      });
    }, 1200);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Generate SVG path for Latency Sparkline
  const getSparklinePath = () => {
    const width = 120;
    const height = 40;
    const maxVal = Math.max(...latencyHistory) + 2;
    const minVal = Math.min(...latencyHistory) - 2;
    const range = maxVal - minVal || 1;

    const points = latencyHistory.map((val, i) => {
      const x = (i / (latencyHistory.length - 1)) * width;
      const y = height - ((val - minVal) / range) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    return `M ${points.join(" L ")}`;
  };

  return (
    <section id="telemetry" className="relative px-6 md:px-16 lg:px-24 py-24 bg-card/20 border-y border-primary/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <SectionTitle index="SYS" title="Operational Telemetry" kicker="REAL-TIME DIAGNOSTIC MONITORS (DEV_MODE ACTIVE)" />
          <div className="flex items-center gap-2 font-mono text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full w-fit self-start md:self-auto">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            LIVE_METRICS_FEED: COMPILING
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: LLM Latency */}
          <div className="glass rounded-2xl p-6 flex flex-col justify-between hover:border-primary/20 transition-colors duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-muted-foreground">LLM INFERENCE</span>
                <Activity className="h-4 w-4 text-purple-400" />
              </div>
              <h4 className="font-display font-bold text-3xl text-foreground">
                {latency} <span className="text-xs text-muted-foreground font-mono font-normal">ms</span>
              </h4>
              <p className="mt-1 text-xs text-muted-foreground font-sans">
                Average query response time (p95)
              </p>
            </div>
            
            <div className="mt-6 flex items-center justify-between gap-4">
              <span className="font-mono text-[10px] text-muted-foreground/50">10s HISTORY</span>
              <svg width="120" height="40" className="overflow-visible">
                <motion.path
                  d={getSparklinePath()}
                  fill="none"
                  stroke="#A855F7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{ d: getSparklinePath() }}
                  transition={{ duration: 0.4 }}
                />
              </svg>
            </div>
          </div>

          {/* Card 2: RAG Accuracy */}
          <div className="glass rounded-2xl p-6 flex flex-col justify-between hover:border-primary/20 transition-colors duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-muted-foreground">RAG ACCURACY</span>
                <Database className="h-4 w-4 text-blue-400" />
              </div>
              <h4 className="font-display font-bold text-3xl text-foreground">
                {ragAcc} <span className="text-xs text-muted-foreground font-mono font-normal">%</span>
              </h4>
              <p className="mt-1 text-xs text-muted-foreground font-sans">
                Dense-sparse retrieval relevancy score
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="font-mono text-[10px] text-muted-foreground/50">EVALUATION MATRIX</span>
              <div className="flex items-center gap-1">
                <span className="text-xs font-mono text-blue-400 font-semibold">OPTIMAL</span>
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-ping" />
              </div>
            </div>
          </div>

          {/* Card 3: Multi-Agent Beacons */}
          <div className="glass rounded-2xl p-6 flex flex-col justify-between hover:border-primary/20 transition-colors duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-muted-foreground">MULTI-AGENT POOL</span>
                <Network className="h-4 w-4 text-emerald-400" />
              </div>
              <h4 className="font-display font-bold text-3xl text-foreground">
                {activeAgents.filter(Boolean).length} <span className="text-xs text-muted-foreground font-mono font-normal">/ {activeAgents.length}</span>
              </h4>
              <p className="mt-1 text-xs text-muted-foreground font-sans">
                Active LangGraph agent execution loops
              </p>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[10px] text-muted-foreground/50">POOL STATUS</span>
                <span className="font-mono text-[9px] text-emerald-400">{Math.round((activeAgents.filter(Boolean).length / activeAgents.length) * 100)}% ACTIVE</span>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {activeAgents.map((active, i) => (
                  <span
                    key={i}
                    className={`h-2.5 rounded-sm transition-all duration-500 ${
                      active 
                        ? "bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.4)]" 
                        : "bg-muted-foreground/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Card 4: API Gateway & Cache */}
          <div className="glass rounded-2xl p-6 flex flex-col justify-between hover:border-primary/20 transition-colors duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-muted-foreground">API INGRESS</span>
                <ShieldCheck className="h-4 w-4 text-rose-400" />
              </div>
              <h4 className="font-display font-bold text-3xl text-foreground">
                99.99 <span className="text-xs text-muted-foreground font-mono font-normal">% UPTIME</span>
              </h4>
              <p className="mt-1 text-xs text-muted-foreground font-sans">
                Redis cache hits & rate limits check
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-border/40">
              <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                <span>REDIS CACHE HITS</span>
                <span className="text-rose-400 font-semibold">{cacheHit}%</span>
              </div>
              <div className="h-1.5 w-full bg-muted-foreground/10 rounded-full mt-1.5 overflow-hidden">
                <motion.div 
                  animate={{ width: `${cacheHit}%` }} 
                  className="h-full bg-rose-500/80 rounded-full" 
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
