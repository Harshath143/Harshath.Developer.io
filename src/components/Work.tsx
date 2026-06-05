import { ExternalLink, Smartphone } from "lucide-react";

const projects = [
  {
    name: "X-Dividend Mobile App",
    blurb:
      "Real-time stock market data with categories like Most Actives, Gainers and Losers. Sort by sector, price, dividend or ex-dividend date.",
    tags: ["React Native", "Hybrid", "Android", "iOS"],
    accent: "from-rose-400/30 to-amber-300/30",
  },
  {
    name: "Interect — Family Chat",
    blurb:
      "Helps families connect with other families nearby using geolocation. Create events, chat, and discover like-minded households.",
    tags: ["React Native", "Firebase", "Maps"],
    accent: "from-sky-400/30 to-emerald-300/30",
  },
  {
    name: "ShareIt: Share & Win",
    blurb:
      "Community-driven storytelling app with in-app coin purchases and rich engagement features.",
    tags: ["React Native", "IAP", "Node.js"],
    accent: "from-violet-400/30 to-pink-300/30",
  },
  {
    name: "Pick&Drop: Driver Solution",
    blurb:
      "Location-based platform for airport transfer drivers — accept ride requests and serve passengers reliably.",
    tags: ["React Native", "Maps", "Realtime"],
    accent: "from-amber-400/30 to-orange-300/30",
  },
  {
    name: "LearningGuide: Photography",
    blurb:
      "A polished educational app for photography enthusiasts, built with React Native and TypeScript.",
    tags: ["React Native", "TypeScript"],
    accent: "from-emerald-400/30 to-teal-300/30",
  },
];

export function Work() {
  return (
    <section id="work" className="px-6 lg:px-24 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-primary font-display text-2xl">03.</span>
          <h2 className="text-3xl md:text-4xl font-bold">Things I've Worked On</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <article
              key={p.name}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:border-primary/40"
            >
              <div className={`aspect-[4/3] rounded-xl bg-gradient-to-br ${p.accent} grid place-items-center mb-5`}>
                <Smartphone className="h-14 w-14 text-foreground/40" />
              </div>
              <p className="text-xs uppercase tracking-wider text-primary font-medium">Featured Project</p>
              <h3 className="mt-2 text-lg font-bold group-hover:text-primary transition-colors">
                {p.name}
              </h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{p.blurb}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="text-[11px] px-2 py-1 rounded-full bg-secondary text-foreground/70">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href="#"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
              >
                View Details <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
