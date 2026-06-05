import { ExternalLink } from "lucide-react";

const certs = [
  { title: "Full Stack Developer", org: "DigiPakistan", date: "Dec 2023" },
  { title: "MERN Stack Developer", org: "Jawan Pakistan", date: "Feb 2022" },
  { title: "AWS, Microservices & Serverless", org: "Self Learning", date: "Aug 2022" },
  { title: "SEO — Search Engine Optimization", org: "DigiSkills", date: "Aug 2020" },
  { title: "WordPress Developer", org: "DigiSkills", date: "Aug 2020" },
  { title: "Graphic Designer", org: "DigiSkills", date: "May 2020" },
];

export function Certifications() {
  return (
    <section id="certifications" className="px-6 lg:px-24 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-primary font-display text-2xl">05.</span>
          <h2 className="text-3xl md:text-4xl font-bold">Licenses & Certifications</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certs.map((c) => (
            <a
              key={c.title}
              href="#"
              className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-5 hover:border-primary/40 hover:-translate-y-0.5 transition-all"
            >
              <div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">{c.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{c.org}</p>
                <p className="text-xs text-muted-foreground mt-2">Issued {c.date} · No Expiration</p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
