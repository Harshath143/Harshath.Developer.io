import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDownToLine, Folder, Send, Terminal, Cpu, Award, Briefcase, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import resumePdf from "../assets/Mohammed_Harshath.pdf";
import profilePic from "../assets/Harshath_profile.jpeg";

const ROLES = ["AI Engineer", "LLM Developer", "RAG Architect", "ML Engineer", "Prompt Engineer", "Business Analyst", "Project Manager", "Software Engineer", "Automation Engineer"];

const TERMINAL_LOGS = [
  { text: "System Initialized: LangGraph Multi-Agent Orchestration", color: "text-emerald-400" },
  { text: "RAG Pipeline: Vector DB hit-rate 98.4% (Latency 14ms)", color: "text-cyan-400" },
  { text: "Groq & VisionAnalyzer: Real-time Camera Stream @ 60 FPS", color: "text-purple-400" },
  { text: "GATE 2024 Verified: AIR 2852 (Top 5% National AI/DS)", color: "text-amber-400" },
  { text: "Active Status: Building AI products @ Holistic MD LLP", color: "text-primary" }
];

function useScrambleText(words: string[], hold = 2000, speed = 35) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);

  const glyphs = "01#$%-+?*[]{}<>_@&%X";

  useEffect(() => {
    const targetWord = words[wordIndex % words.length];
    let resolveProgress = 0;
    let intervalId: NodeJS.Timeout;

    const animate = () => {
      const resolvedCount = Math.floor(resolveProgress);
      let currentText = "";

      for (let i = 0; i < targetWord.length; i++) {
        if (i < resolvedCount) {
          currentText += targetWord[i];
        } else {
          if (targetWord[i] === " ") {
            currentText += " ";
          } else {
            currentText += glyphs[Math.floor(Math.random() * glyphs.length)];
          }
        }
      }

      setText(currentText);

      if (resolvedCount < targetWord.length) {
        resolveProgress += 0.45;
        intervalId = setTimeout(animate, speed);
      } else {
        intervalId = setTimeout(() => {
          setWordIndex((prev) => prev + 1);
        }, hold);
      }
    };

    animate();

    return () => clearTimeout(intervalId);
  }, [wordIndex, words, hold, speed]);

  return text;
}

export function Hero() {
  const scrambled = useScrambleText(ROLES);
  const [isMounted, setIsMounted] = useState(false);
  const [activeLogIndex, setActiveLogIndex] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setActiveLogIndex((prev) => (prev + 1) % TERMINAL_LOGS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-dvh flex items-center px-6 md:px-12 lg:px-20 pt-28 pb-20 overflow-hidden"
    >
      {/* Background ambient mesh grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Main Hero Card (Cols 1-7) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 bento-card spotlight-card p-8 md:p-12 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-primary mb-6">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>// SENIOR AI & MACHINE LEARNING ENGINEER</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.98] tracking-tight text-balance">
              Mohammed <br />
              <span className="gradient-text">Harshath SS.</span>
            </h1>

            <div className="mt-6 flex items-center gap-3 font-mono text-base md:text-xl">
              <span className="text-muted-foreground">$</span>
              <span className="text-foreground">{scrambled}</span>
              <span className="inline-block w-2.5 h-5 bg-primary animate-pulse" />
            </div>

            <p className="mt-8 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground text-pretty">
              I engineer scalable GenAI backends, multi-agent orchestration platforms, and high-performance RAG pipelines. Bridging machine learning architectures with robust distributed systems, I deliver production-ready AI solutions optimized for latency, evaluation accuracy, and enterprise reliability.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              data-cursor="hover"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground font-medium hover:-translate-y-0.5 transition-transform shadow-[0_10px_30px_-10px_var(--color-primary)]"
            >
              <Folder className="h-4 w-4" />
              View Projects
            </a>
            <a
              href={isMounted ? resumePdf : "#"}
              target="_blank"
              rel="noopener noreferrer"
              download="Mohammed_Harshath_Resume.pdf"
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium hover:border-primary hover:text-primary transition-colors"
            >
              <ArrowDownToLine className="h-4 w-4" />
              Resume
            </a>
            <a
              href="#contact"
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium hover:border-primary hover:text-primary transition-colors"
            >
              <Send className="h-4 w-4" />
              Contact
            </a>
          </div>
        </motion.div>

        {/* Profile Highlight Card (Cols 8-12 Top) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6"
        >
          {/* Profile Photo & Live Status */}
          <div className="bento-card spotlight-card p-6 flex flex-col justify-between group">
            <div className="flex items-center gap-5">
              <div className="relative h-20 w-20 rounded-2xl overflow-hidden border border-primary/30 shrink-0">
                <img
                  src={profilePic}
                  alt="Mohammed Harshath Profile"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-background animate-pulse" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px]">
                  <CheckCircle2 className="h-3 w-3" /> Available for Roles
                </div>
                <h3 className="font-display text-lg font-bold mt-1.5 text-foreground">Mohammed Harshath</h3>
                <p className="font-mono text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3 text-primary" /> Coimbatore, India
                </p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-xs">
              <span className="font-mono text-muted-foreground">Currently @</span>
              <span className="font-medium text-primary font-mono">Building AI @ Holistic MD LLP</span>
            </div>
          </div>

          {/* Live AI Command Center Terminal with Interactive Prompt */}
          <div className="bento-card spotlight-card p-6 flex flex-col justify-between font-mono bg-card/95 border-primary/20">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2 text-xs text-primary font-bold">
                <Terminal className="h-4 w-4" />
                <span>INTERACTIVE AI TERMINAL</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              </div>
            </div>

            <div className="my-4 space-y-2 text-xs min-h-[95px] overflow-hidden">
              <div className="flex items-start gap-2 text-emerald-400">
                <span className="text-muted-foreground select-none">&gt;</span>
                <span>Active: Building GenAI @ Holistic MD LLP</span>
              </div>
              <div className="flex items-start gap-2 text-cyan-400">
                <span className="text-muted-foreground select-none">&gt;</span>
                <span>LangGraph Multi-Agent RAG & Groq Vision API</span>
              </div>
              <div className="flex items-start gap-2 text-amber-400">
                <span className="text-muted-foreground select-none">&gt;</span>
                <span>GATE 2024: AIR #2852 (Top 5% National AI/DS)</span>
              </div>
            </div>

            {/* Interactive Command Prompt Line */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const input = (e.target as any).cmd.value.trim().toLowerCase();
                if (!input) return;
                if (input.includes("skill")) {
                  document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
                } else if (input.includes("project")) {
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                } else if (input.includes("contact")) {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                } else if (input.includes("sandbox") || input.includes("agent")) {
                  document.getElementById("agent-sandbox")?.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.dispatchEvent(new CustomEvent("open-command-palette"));
                }
                (e.target as any).cmd.value = "";
              }}
              className="pt-3 border-t border-border/60 flex items-center gap-2 text-xs"
            >
              <span className="text-primary font-bold select-none">&gt;</span>
              <input
                name="cmd"
                type="text"
                placeholder="Type 'skills', 'projects', or press ⌘K..."
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-xs font-mono"
              />
              <button type="submit" className="text-[10px] text-primary border border-primary/30 px-2 py-0.5 rounded hover:bg-primary/10">
                RUN
              </button>
            </form>
          </div>

        </motion.div>

        {/* Quick Stats Bento Row (Cols 1-12 Bottom) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4 mt-2"
        >
          <div className="bento-card bento-card-hover p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="font-mono text-xs uppercase tracking-wider">Experience</span>
              <Briefcase className="h-4 w-4 text-primary" />
            </div>
            <p className="font-display text-3xl md:text-4xl font-bold text-foreground">1<span className="text-primary">+</span> Yrs</p>
            <p className="text-xs text-muted-foreground mt-1">Holistic MD LLP & OPSEN</p>
          </div>

          <div className="bento-card bento-card-hover p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="font-mono text-xs uppercase tracking-wider">Shipped</span>
              <Folder className="h-4 w-4 text-primary" />
            </div>
            <p className="font-display text-3xl md:text-4xl font-bold text-foreground">10<span className="text-primary">+</span></p>
            <p className="text-xs text-muted-foreground mt-1">Production & AI Projects</p>
          </div>

          <div className="bento-card bento-card-hover p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="font-mono text-xs uppercase tracking-wider">GATE 2024</span>
              <Award className="h-4 w-4 text-amber-400" />
            </div>
            <p className="font-display text-3xl md:text-4xl font-bold text-amber-400">#2852</p>
            <p className="text-xs text-muted-foreground mt-1">Top 5% National (DS & AI)</p>
          </div>

          <div className="bento-card bento-card-hover p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="font-mono text-xs uppercase tracking-wider">Certifications</span>
              <Sparkles className="h-4 w-4 text-purple-400" />
            </div>
            <p className="font-display text-3xl md:text-4xl font-bold text-foreground">15</p>
            <p className="text-xs text-muted-foreground mt-1">IITM GUVI & Professional</p>
          </div>
        </motion.div>

      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 text-muted-foreground opacity-60 hover:opacity-100 transition-opacity">
        <span className="font-mono text-[9px] tracking-[0.3em]">SCROLL</span>
        <motion.div
          className="h-6 w-px bg-current"
          animate={{ scaleY: [0.3, 1, 0.3], transformOrigin: "top" }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      </div>
    </section>
  );
}

