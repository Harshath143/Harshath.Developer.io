import { motion } from "framer-motion";
import { useState } from "react";
import { Briefcase, Calendar, MapPin, ChevronRight, CheckCircle2, Terminal } from "lucide-react";
import { sound } from "@/lib/audioSynth";

interface Job {
  company: string;
  role: string;
  type: string;
  location: string;
  period: string;
  current: boolean;
  stationCode: string;
  description: string;
  bullets: string[];
  tags: string[];
}

const JOBS: Job[] = [
  {
    company: "Holistic MD LLP",
    role: "AI & ML Engineer",
    type: "Full-time",
    location: "Coimbatore, India [On-site]",
    period: "Dec 2025 – Present",
    current: true,
    stationCode: "STATION_ALPHA // HOLISTIC_MD",
    description: "AI Developer specializing in GenAI backend development and distributed systems. Expert in building scalable LLM inference platforms, multi-agent orchestration, and RAG pipelines with strong focus on performance optimization and production reliability.",
    bullets: [
      "Developed VisionAnalyzer, a real-time computer vision application using Django and Groq API to perform low-latency object detection and automated ingredient extraction from live 60 FPS camera feeds.",
      "Implemented LLM-powered RAG workflows, enhancing document comprehension and policy analysis accuracy by 40%.",
      "Developed and deployed intelligent AI agents with tool-based reasoning and Dynamic Task Execution for management simulations.",
      "Built production legislative automation system using LangGraph + RAG pipelines, reducing processing latency by 30%.",
    ],
    tags: ["Python", "Django", "FastAPI", "Redis", "LangChain", "LangGraph", "Groq API", "RAG Pipelines", "Multi-Agent Systems"],
  },
  {
    company: "OPSEN",
    role: "AI Developer",
    type: "Full-time",
    location: "London, UK [Remote]",
    period: "Oct 2025 – Nov 2025",
    current: false,
    stationCode: "STATION_BRAVO // OPSEN_UK",
    description: "AI Developer specializing in GenAI backend development and distributed systems. Expertise in building scalable LLM inference platforms, multi-agent orchestration, and RAG pipelines.",
    bullets: [
      "Integrated ClickHouse database with multi-agent architecture, enabling high-speed analytics and scalable data storage for AI-driven risk models.",
      "Implemented LLM-powered RAG workflows, enhancing document comprehension and policy analysis accuracy by 40%.",
      "Developed and deployed intelligent AI agents with tool-based reasoning and Dynamic Task Execution for risk management simulations.",
      "Built production legislative automation system using LangGraph + RAG pipelines, reducing processing latency by 30%.",
    ],
    tags: ["Python", "ClickHouse", "LLM", "RAG Pipelines", "Multi-Agent Architecture", "LangGraph", "Distributed Systems"],
  },
  {
    company: "TMIS",
    role: "Machine Learning Intern",
    type: "Full-time",
    location: "Chennai, India",
    period: "Feb 2025 – March 2025",
    current: false,
    stationCode: "STATION_CHARLIE // TMIS_LABS",
    description: "Assisted in developing and deploying machine learning models to solve real-world problems. Supported data preprocessing, exploratory data analysis, feature engineering, and model evaluation tasks.",
    bullets: [
      "Built and deployed a classification model to detect anomalies in health records, improving data quality and consistency by 85%.",
      "Engineered data pipelines for preprocessing millions of patient records using Python and Pandas.",
      "Evaluated model performance using standard metrics and improved model accuracy through hyperparameter tuning.",
      "Documented workflows and collaborated with team members on project milestones.",
    ],
    tags: ["Python", "TensorFlow", "Scikit-learn", "Pandas", "NumPy", "Data Analysis", "Machine Learning"],
  },
  {
    company: "WeInvest - Digital Wealth Platform",
    role: "Data Analyst Intern",
    type: "Remote Internship",
    location: "Bengaluru, India [Remote]",
    period: "Jul 2023 – Sep 2023",
    current: false,
    stationCode: "STATION_DELTA // WEINVEST",
    description: "Worked on financial data analysis and reporting to support digital wealth management solutions. Delivered data-driven insights and collaborated with cross-functional teams to optimize investment models.",
    bullets: [
      "Analyzed and processed over 1 million financial data points, identifying key market trends that contributed to a 15% improvement in portfolio recommendation accuracy.",
      "Automated routine data validation tasks, decreasing errors by 25% and improving data quality for downstream analysis.",
      "Developed interactive dashboards using Tableau to visualize financial metrics, enhancing decision-making for stakeholders.",
      "Collaborated with data engineering team to optimize ETL processes, reducing data processing time by 30%.",
    ],
    tags: ["Python", "SQL", "Tableau", "Excel", "Data Visualization", "Financial Analysis"],
  },
];

export function TacticalExperience() {
  const [activeJobIndex, setActiveJobIndex] = useState(0);

  return (
    <section id="experience" className="relative px-4 md:px-8 lg:px-12 py-28 border-t border-zinc-800/80 bg-[#050505]">
      
      {/* Background Radar Grid */}
      <div className="absolute inset-0 radar-grid opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-800/80 mb-10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-red-500 mb-2">
              <span className="h-1.5 w-1.5 bg-red-500" />
              <span>// 04:00 SEC. OPERATIONAL RECORD // 04</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Combat Deployments & Experience
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-500">
            [VERIFIED_STATIONS: {JOBS.length} // ALL_RECORDS_ACTIVE]
          </div>
        </div>

        {/* Split Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Station Selector Cards (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-3">
            {JOBS.map((job, idx) => {
              const isSelected = activeJobIndex === idx;
              return (
                <button
                  key={job.company}
                  onClick={() => {
                    sound.playClick();
                    setActiveJobIndex(idx);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`w-full text-left p-4 md:p-5 border transition-all duration-200 cursor-pointer tactical-reticle ${
                    isSelected
                      ? "bg-[#0b0b0e] border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                      : "bg-[#08080a] border-zinc-800/80 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                    <span className={isSelected ? "text-red-400 font-bold" : "text-zinc-500"}>
                      {job.stationCode}
                    </span>
                    {job.current ? (
                      <span className="px-2 py-0.5 bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 font-bold">
                        CURRENT_DUTY
                      </span>
                    ) : (
                      <span className="text-zinc-600">{job.period}</span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-lg text-white">
                    {job.role}
                  </h3>
                  <p className="font-mono text-xs text-zinc-400 mt-0.5 flex items-center justify-between">
                    <span>{job.company}</span>
                    <span className="text-[11px] text-zinc-600">{job.location}</span>
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Job Detailed Telemetry (Cols 6-12) */}
          <div className="lg:col-span-7 bg-[#0b0b0e] border border-zinc-800/90 p-6 md:p-8 tactical-reticle">
            {(() => {
              const job = JOBS[activeJobIndex];
              return (
                <div>
                  {/* Station Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800/80 font-mono text-xs">
                    <div>
                      <span className="text-red-500 font-bold">{job.stationCode}</span>
                      <h4 className="font-display font-bold text-2xl text-white mt-1">
                        {job.role} <span className="text-red-400">@ {job.company}</span>
                      </h4>
                    </div>
                    <div className="text-right sm:text-right font-mono text-xs text-zinc-400">
                      <div>{job.period}</div>
                      <div className="text-zinc-500 text-[11px]">{job.location}</div>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="mt-5 text-sm text-zinc-300 leading-relaxed font-sans">
                    {job.description}
                  </p>

                  {/* Quantifiable Impact Bullets */}
                  <div className="mt-6 pt-4 border-t border-zinc-800/60 space-y-3">
                    <span className="font-mono text-xs text-red-400 font-bold uppercase tracking-wider block">
                      // MISSION DIRECTIVES & OUTCOMES
                    </span>
                    {job.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-3 text-xs md:text-sm text-zinc-300">
                        <span className="text-red-500 font-mono font-bold select-none mt-0.5">&gt;</span>
                        <span className="leading-relaxed">{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stack Chips */}
                  <div className="mt-6 pt-5 border-t border-zinc-800/80">
                    <span className="font-mono text-[10px] text-zinc-500 uppercase block mb-2">
                      // SYSTEM STACK DEPLOYED
                    </span>
                    <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-zinc-950 border border-zinc-800 text-zinc-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

        </div>

      </div>

    </section>
  );
}

