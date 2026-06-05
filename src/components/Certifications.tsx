import { motion } from "framer-motion";
import { Award, ExternalLink, GraduationCap, Trophy } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

const CERTS = [
  {
    name: "GATE 2024 (Data Science & AI - Rank 2852)",
    issuer: "National Board",
    year: "2024",
    icon: Trophy,
    colorClass: "text-amber-400"
  },
  {
    name: "Master Data Science",
    issuer: "IITM GUVI",
    year: "2024",
    icon: GraduationCap,
    colorClass: "text-blue-400"
  },
  {
    name: "Advanced Programming Professional",
    issuer: "IITM GUVI",
    year: "2024",
    icon: Award,
    colorClass: "text-rose-400"
  }
];

export function Certifications() {
  return (
    <section id="certifications" className="relative px-6 md:px-16 lg:px-24 py-32 bg-card/10">
      <div className="max-w-6xl mx-auto">
        <SectionTitle index="05" title="Achievements & Certifications" kicker="NATIONAL DISTINCTIONS & PROFESSIONAL CREDENTIALS" />
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {CERTS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group relative glass rounded-2xl p-6 block overflow-hidden transition-all duration-300 hover:border-primary/30"
              >
                {/* Accent glow on hover */}
                <div
                  aria-hidden
                  className="absolute -top-px left-6 right-6 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: "linear-gradient(90deg, transparent, var(--color-primary), transparent)"
                  }}
                />
                
                <div className="flex items-start justify-between gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className={`h-5 w-5 ${c.colorClass}`} />
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                </div>
                
                <h3 className="mt-5 font-display font-bold leading-snug text-foreground/90 group-hover:text-foreground transition-colors min-h-[50px]">
                  {c.name}
                </h3>
                
                <p className="mt-2 text-xs text-muted-foreground font-mono">
                  {c.issuer} · {c.year}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
