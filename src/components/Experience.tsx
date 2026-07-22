import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, ChevronRight, Briefcase } from "lucide-react";
import { useState } from "react";
import { SectionTitle } from "./SectionTitle";

const JOBS = [
  {
    company: "Holistic MD LLP",
    role: "AI & ML Engineer",
    type: "Full-time",
    location: "Coimbatore, India [On-site]",
    period: "Dec 2025 – Present",
    current: true,
    description: "AI Developer specializing in GenAI backend development and distributed systems. Expert in building scalable LLM inference platforms, multi-agent orchestration, and RAG pipelines with strong focus on performance optimization and production reliability.",
    bullets: [
      "Developed VisionAnalyzer, a real-time computer vision application using Django and Groq API to perform low-latency object detection and automated ingredient extraction from live camera feeds.",
      "Implemented LLM-powered RAG workflows, enhancing document comprehension and policy analysis accuracy by 40%.",
      "Developed and deployed intelligent AI agents with tool-based reasoning and Dynamic Task Execution for management simulations.",
      "Built production legislative automation system using LangGraph + RAG pipelines, reducing processing latency by 30%."
    ],
    tags: [
      "Python", "Django", "FastAPI", "Redis", "LangChain", "LangGraph", 
      "Groq API", "RAG Pipelines", "Multi-Agent Systems", "Dynamic Task Execution", 
      "Distributed Systems", "AI Developer"
    ]
  },
  {
    company: "OPSEN",
    role: "AI Developer",
    type: "Full-time",
    location: "London, UK [Remote]",
    period: "Oct 2025 – Nov 2025",
    current: false,
    description: "AI Developer specializing in GenAI backend development and distributed systems. Expertise in building scalable LLM inference platforms, multi-agent orchestration, and RAG pipelines.",
    bullets: [
      "Integrated ClickHouse database with multi-agent architecture, enabling high-speed analytics and scalable data storage for AI-driven risk models.",
      "Implemented LLM-powered RAG workflows, enhancing document comprehension and policy analysis accuracy by 40%.",
      "Developed and deployed intelligent AI agents with tool-based reasoning and Dynamic Task Execution for risk management simulations.",
      "Built production legislative automation system using LangGraph + RAG pipelines, reducing processing latency by 30%."
    ],
    tags: [
      "Python", "ClickHouse", "LLM", "RAG Pipelines", "Multi-Agent Architecture", 
      "LangGraph", "Dynamic Task Execution", "Git", "Distributed Systems"
    ]
  },
  {
    company: "TMIS",
    role: "Machine Learning Intern",
    type: "Full-time",
    location: "Chennai, India",
    period: "Feb 2025 – March 2025",
    current: false,
    description: "Assisted in developing and deploying machine learning models to solve real-world problems. Supported data preprocessing, exploratory data analysis, feature engineering, and model evaluation tasks.",
    bullets: [
      "Built and deployed a classification model to detect anomalies in health records, improving data quality and consistency by 85%.",
      "Engineered data pipelines for preprocessing millions of patient records using Python and Pandas.",
      "Evaluated model performance using standard metrics and improved model accuracy through hyperparameter tuning.",
      "Documented workflows and collaborated with team members on project milestones."
    ],
    tags: [
      "Python", "TensorFlow", "Scikit-learn", "Pandas", "NumPy", 
      "Data Analysis", "Machine Learning", "Git", "Jupyter Notebook"
    ]
  },
  {
    company: "WeInvest - Digital Wealth Platform",
    role: "Data Analyst Intern",
    type: "Remote Internship",
    location: "Bengaluru, India [Remote]",
    period: "Jul 2023 – Sep 2023",
    current: false,
    description: "Worked on financial data analysis and reporting to support digital wealth management solutions. Delivered data-driven insights and collaborated with cross-functional teams to optimize investment models.",
    bullets: [
      "Analyzed and processed over 1 million financial data points, identifying key market trends that contributed to a 15% improvement in portfolio recommendation accuracy.",
      "Automated routine data validation tasks, decreasing errors by 25% and improving data quality for downstream analysis.",
      "Developed interactive dashboards using Tableau to visualize financial metrics, enhancing decision-making for stakeholders.",
      "Collaborated with data engineering team to optimize ETL processes, reducing data processing time by 30%."
    ],
    tags: [
      "Python", "SQL", "Tableau", "Excel", "Data Visualization", 
      "Data Analysis", "Financial Analysis", "Reporting Tools"
    ]
  }
];

export function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="relative px-6 md:px-12 lg:px-20 py-32">
      <div className="max-w-6xl mx-auto">
        <SectionTitle index="03" title="Experience" kicker="WHERE I'VE BUILT" />

        <div className="relative pl-6 md:pl-10 mt-12">
          {/* Timeline continuous vertical accent line */}
          <div className="absolute left-2 md:left-3 top-0 bottom-0 w-px bg-border" />
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.6 }}
            className="absolute left-2 md:left-3 top-0 w-px bg-gradient-to-b from-primary via-primary/60 to-transparent"
          />

          <div className="space-y-8">
            {JOBS.map((j, i) => {
              const isExpanded = expandedIndex === i;
              return (
                <motion.div
                  key={j.company + j.role}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative group"
                >
                  {/* Timeline Node Dot */}
                  <span
                    className={`absolute -left-[27px] md:-left-[35px] top-6 h-4 w-4 rounded-full border-2 border-background transition-transform duration-300 ${
                      j.current
                        ? "bg-primary ring-4 ring-primary/20 scale-110"
                        : "bg-muted-foreground/40 group-hover:bg-primary group-hover:scale-125"
                    }`}
                  />

                  <div className="bento-card bento-card-hover spotlight-card p-6 md:p-8">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-primary font-bold">{j.company}</span>
                          {j.current && (
                            <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-[10px]">
                              CURRENT ROLE
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                          {j.role}
                        </h3>

                        {/* Metadata */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs font-mono text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-primary" />
                            {j.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-primary" />
                            {j.type}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 font-mono text-xs text-primary bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full">
                          <Calendar className="h-3.5 w-3.5" />
                          {j.period}
                        </span>
                        <button
                          onClick={() => setExpandedIndex(isExpanded ? null : i)}
                          className="p-1.5 rounded-lg glass text-muted-foreground hover:text-primary transition-colors"
                          aria-label="Toggle details"
                        >
                          <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                        </button>
                      </div>
                    </div>

                    {/* Summary Description */}
                    <p className="mt-4 text-sm text-foreground/85 leading-relaxed font-sans font-medium">
                      {j.description}
                    </p>

                    {/* Bullet Accomplishments */}
                    <div className={`mt-5 space-y-2.5 transition-all duration-300 ${isExpanded ? "block" : "hidden md:block"}`}>
                      {j.bullets.map((b) => (
                        <div key={b} className="flex gap-3 text-muted-foreground text-sm leading-relaxed">
                          <span className="text-primary select-none">▸</span>
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="mt-6 pt-4 border-t border-border/40 flex flex-wrap gap-2">
                      {j.tags.map((t) => (
                        <span
                          key={t}
                          className="bg-card/60 border border-border/60 hover:border-primary/45 rounded-lg px-2.5 py-1 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-all cursor-default"
                          data-cursor="hover"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

