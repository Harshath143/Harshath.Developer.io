import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

const CERTS = [
  { name: "DeepLearning.AI — LLM Specialization", issuer: "Coursera", year: "2024" },
  { name: "AWS Certified ML Specialty", issuer: "Amazon Web Services", year: "2024" },
  { name: "TensorFlow Developer", issuer: "Google", year: "2023" },
  { name: "LangChain Agents Production", issuer: "LangChain Academy", year: "2024" },
  { name: "MLOps Specialization", issuer: "DeepLearning.AI", year: "2023" },
  { name: "Generative AI with LLMs", issuer: "AWS / DeepLearning.AI", year: "2023" },
];

export function Certifications() {
  return (
    <section id="certifications" className="relative px-6 md:px-16 lg:px-24 py-32">
      <div className="max-w-6xl mx-auto">
        <SectionTitle index="05" title="Certifications" kicker="VERIFIED CREDENTIALS" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTS.map((c, i) => (
            <motion.a
              key={c.name}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -4 }}
              data-cursor="hover"
              className="group relative glass rounded-2xl p-6 block overflow-hidden"
            >
              <div
                aria-hidden
                className="absolute -top-1 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, var(--color-primary), transparent)" }}
              />
              <div className="flex items-start justify-between gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center">
                  <Award className="h-5 w-5" />
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </div>
              <h3 className="mt-5 font-display font-bold leading-tight">{c.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground font-mono">{c.issuer} · {c.year}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
