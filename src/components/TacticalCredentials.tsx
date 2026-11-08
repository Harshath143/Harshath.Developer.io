import { motion } from "framer-motion";
import { Trophy, Award, GraduationCap, Star, ShieldCheck, Quote } from "lucide-react";
import { sound } from "@/lib/audioSynth";

const CREDENTIALS = [
  {
    title: "GATE 2024 AIR #2852 (Data Science & AI)",
    issuer: "Indian Institute of Science (IISc) / IITs Board",
    badge: "NATIONAL AIR #2852",
    badgeColor: "text-amber-400 bg-amber-950/30 border-amber-500/40",
    details: "Ranked in the top 5% nationally in Data Science & Artificial Intelligence examination.",
    year: "2024",
    icon: Trophy,
    verified: true,
  },
  {
    title: "Master Data Science Professional",
    issuer: "IITM GUVI (IIT Madras Research Park)",
    badge: "IITM GUVI VERIFIED",
    badgeColor: "text-red-400 bg-red-950/30 border-red-500/40",
    details: "End-to-end machine learning engineering, statistical modeling, and deep neural architectures.",
    year: "2024",
    icon: GraduationCap,
    verified: true,
  },
  {
    title: "Advanced Programming Professional",
    issuer: "IITM GUVI (IIT Madras Research Park)",
    badge: "IITM GUVI VERIFIED",
    badgeColor: "text-red-400 bg-red-950/30 border-red-500/40",
    details: "Algorithm optimization, distributed systems design, data structures, and production Python.",
    year: "2024",
    icon: Award,
    verified: true,
  },
];

const QUOTES = [
  {
    name: "Aisha Khan",
    role: "VP Engineering, Northwind",
    text: "Harshath turned our RAG demo into a real product. Latency dropped, accuracy jumped, and the team learned a ton along the way.",
  },
  {
    name: "David Park",
    role: "CTO, FieldAI",
    text: "A rare engineer who treats evals as a first-class product surface. Our model quality is night-and-day better.",
  },
  {
    name: "Lena Costa",
    role: "Head of Product, Atlas",
    text: "Ships fast, communicates clearly, designs for the user. Best AI hire we've made.",
  },
  {
    name: "Ravi Menon",
    role: "Founder, BuildKit",
    text: "Mohammed unblocked an entire roadmap in two sprints. Our agents finally feel reliable.",
  },
];

export function TacticalCredentials() {
  return (
    <section id="credentials" className="relative px-4 md:px-8 lg:px-12 py-28 border-t border-zinc-800/80 bg-[#050505]">
      
      {/* Background Radar Grid */}
      <div className="absolute inset-0 radar-grid opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-800/80 mb-10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-red-500 mb-2">
              <span className="h-1.5 w-1.5 bg-red-500" />
              <span>// 05:00 SEC. VERIFIED CREDENTIALS // 05</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
              National Honors & Field Reports
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-500">
            [IISc_GATE_VERIFIED // GUVI_ACCREDITED]
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {CREDENTIALS.map((cred, i) => {
            const Icon = cred.icon;
            return (
              <motion.div
                key={cred.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-[#0b0b0e] border border-zinc-800/90 hover:border-red-500/50 p-6 flex flex-col justify-between tactical-reticle transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="h-10 w-10 rounded bg-zinc-950 border border-zinc-800 flex items-center justify-center text-red-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`font-mono text-[10px] font-bold px-2.5 py-0.5 border ${cred.badgeColor}`}>
                      {cred.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-white tracking-tight">
                    {cred.title}
                  </h3>
                  <p className="font-mono text-xs text-red-400 mt-1 font-semibold">
                    {cred.issuer}
                  </p>
                  <p className="mt-3 text-xs text-zinc-400 leading-relaxed font-sans">
                    {cred.details}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between font-mono text-xs text-zinc-500">
                  <span>Year: {cred.year}</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" /> VERIFIED
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tactical Commendations Marquee */}
        <div className="bg-[#0b0b0e] border border-zinc-800/80 p-6 tactical-reticle">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 font-mono text-xs text-zinc-400 mb-6">
            <span className="text-red-500 font-bold">// TRANSMISSIONS & PEER COMMENDATIONS</span>
            <span className="text-zinc-600">[DE-ENCRYPTED FEED]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUOTES.map((q, idx) => (
              <div
                key={idx}
                className="p-4 bg-zinc-950/80 border border-zinc-800/80 flex flex-col justify-between"
              >
                <div>
                  <Quote className="h-4 w-4 text-red-500 mb-2 opacity-60" />
                  <p className="text-xs text-zinc-300 leading-relaxed italic font-sans">
                    "{q.text}"
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-800/60 font-mono">
                  <div className="text-white font-bold text-xs">{q.name}</div>
                  <div className="text-[10px] text-zinc-500">{q.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}

