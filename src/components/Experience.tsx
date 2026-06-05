import { motion } from "framer-motion";
import { MapPin, Calendar, Clock } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

const JOBS = [
  {
    company: "Holistic MD LLP",
    role: "AI & ML Engineer",
    type: "Full-time",
    location: "Coimbatore, India [On-site]",
    period: "Dec 2025 – Present",
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
  return (
    <section id="experience" className="relative px-6 md:px-16 lg:px-24 py-32">
      <div className="max-w-5xl mx-auto">
        <SectionTitle index="03" title="Experience" kicker="WHERE I'VE BUILT" />

        <div className="relative pl-8 md:pl-12 mt-12">
          {/* timeline line */}
          <div className="absolute left-2 md:left-4 top-0 bottom-0 w-px bg-border" />
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.6 }}
            className="absolute left-2 md:left-4 top-0 w-px bg-gradient-to-b from-primary via-primary/60 to-transparent"
          />

          <div className="space-y-16">
            {JOBS.map((j, i) => (
              <motion.div
                key={j.company + j.role}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="relative group"
              >
                <span className="absolute -left-[34px] md:-left-[42px] top-2.5 h-3.5 w-3.5 rounded-full bg-primary ring-4 ring-background shadow-[0_0_18px_var(--color-primary)] transition-transform group-hover:scale-125" />
                
                <div className="glass rounded-2xl p-6 transition-all duration-300 group-hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                  {/* Title and date row */}
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                        {j.role} <span className="text-primary font-normal">@ {j.company}</span>
                      </h3>
                      
                      {/* Location & job type */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs font-mono text-muted-foreground/80">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-primary/70" />
                          {j.location}
                        </span>
                        <span className="h-2.5 w-px bg-border hidden sm:inline" />
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-primary/70" />
                          {j.type}
                        </span>
                      </div>
                    </div>

                    <span className="flex items-center gap-1.5 font-mono text-xs text-primary/95 bg-primary/5 border border-primary/15 px-3 py-1 rounded-full whitespace-nowrap">
                      <Calendar className="h-3 w-3" />
                      {j.period}
                    </span>
                  </div>

                  {/* Job intro description */}
                  <p className="mt-5 text-sm text-foreground/85 leading-relaxed font-sans font-medium text-pretty">
                    {j.description}
                  </p>

                  {/* Bullet accomplishments */}
                  <ul className="mt-4 space-y-2.5">
                    {j.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-muted-foreground text-pretty text-sm leading-relaxed">
                        <span className="text-primary mt-1 select-none">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack tags */}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
