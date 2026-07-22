import { motion } from "framer-motion";
import { useState } from "react";
import { Award, ExternalLink, GraduationCap, Trophy, CheckCircle2, Sparkles } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

type Cert = {
  name: string;
  issuer: string;
  year: string;
  category: "ai" | "dev";
  icon: typeof Trophy;
  badge: string;
};

const CERTS: Cert[] = [
  {
    name: "GATE 2024 (Data Science & AI - Rank 2852)",
    issuer: "IISc / IITs National Board",
    year: "2024",
    category: "ai",
    icon: Trophy,
    badge: "NATIONAL AIR #2852",
  },
  {
    name: "Master Data Science",
    issuer: "IITM GUVI",
    year: "2024",
    category: "ai",
    icon: GraduationCap,
    badge: "VERIFIED CREDENTIAL",
  },
  {
    name: "Advanced Programming Professional",
    issuer: "IITM GUVI",
    year: "2024",
    category: "dev",
    icon: Award,
    badge: "VERIFIED CREDENTIAL",
  },
];

export function Certifications() {
  const [filter, setFilter] = useState<"all" | "ai" | "dev">("all");

  const filteredCerts = filter === "all" ? CERTS : CERTS.filter((c) => c.category === filter);

  return (
    <section id="certifications" className="relative px-6 md:px-12 lg:px-20 py-32 bg-card/10">
      <div className="max-w-6xl mx-auto">
        <SectionTitle index="06" title="Achievements & Certifications" kicker="NATIONAL DISTINCTIONS & PROFESSIONAL CREDENTIALS" />

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2.5 mt-8">
          {[
            { id: "all", label: "All Credentials" },
            { id: "ai", label: "Data Science & AI" },
            { id: "dev", label: "Software Engineering" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-2 rounded-full font-mono text-xs transition-all ${
                filter === tab.id
                  ? "bg-primary text-primary-foreground font-bold shadow-sm"
                  : "bg-card/60 text-muted-foreground border border-border/60 hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {filteredCerts.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bento-card bento-card-hover spotlight-card p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[10px] text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full font-bold">
                      {c.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                    {c.name}
                  </h3>

                  <p className="mt-2 text-xs text-muted-foreground font-mono">
                    {c.issuer} &bull; {c.year}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-xs font-mono text-emerald-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Authenticated
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground hover:text-primary transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

