import { SectionTitle } from "./SectionTitle";

const QUOTES = [
  { name: "Aisha Khan", role: "VP Engineering, Northwind", text: "Harshath turned our RAG demo into a real product. Latency dropped, accuracy jumped, and the team learned a ton along the way." },
  { name: "David Park", role: "CTO, FieldAI", text: "A rare engineer who treats evals as a first-class product surface. Our model quality is night-and-day better." },
  { name: "Lena Costa", role: "Head of Product, Atlas", text: "Ships fast, communicates clearly, designs for the user. Best AI hire we've made." },
  { name: "Ravi Menon", role: "Founder, BuildKit", text: "Mohammed unblocked an entire roadmap in two sprints. Our agents finally feel reliable." },
  { name: "Sara Okafor", role: "PM, OpenCanvas", text: "From whiteboard to deployed, with thoughtful tradeoffs at every step. Would hire again instantly." },
  { name: "Tom Hill", role: "Director ML, Lumen", text: "Equally strong in research and engineering — increasingly rare. Plus the UI he ships is beautiful." },
];

export function Testimonials() {
  const row = [...QUOTES, ...QUOTES];
  return (
    <section id="testimonials" className="relative px-6 md:px-16 lg:px-24 py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionTitle index="07" title="Kind Words" kicker="WHAT PEOPLE SAY" />
      </div>
      <div className="relative">
        <div className="flex gap-5 marquee w-max" style={{ animationDuration: "60s" }}>
          {row.map((q, i) => (
            <article
              key={i}
              className="glass rounded-2xl p-6 w-[340px] shrink-0 hover:border-primary transition-colors"
            >
              <p className="text-3xl font-display text-primary leading-none">"</p>
              <p className="text-sm leading-relaxed text-muted-foreground mt-2 text-pretty">{q.text}</p>
              <div className="mt-5 pt-4 border-t border-border">
                <p className="font-display font-bold">{q.name}</p>
                <p className="text-xs text-muted-foreground">{q.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
