import { useState } from "react";

const jobs = [
  {
    company: "Algoace",
    role: "Full Stack Developer",
    period: "Onsite · November 2022 – Present",
    bullets: [
      "Built full-stack hybrid mobile apps with React Native, AWS microservices and Firebase.",
      "Led architecture decisions for performance-critical features used by thousands of users.",
      "Collaborated with cross-functional teams to ship features end-to-end.",
    ],
  },
  {
    company: "Upwork & Fiverr",
    role: "Freelance Mobile Developer",
    period: "Remote · 2020 – 2022",
    bullets: [
      "Delivered 40+ mobile and web projects to clients across 15 countries.",
      "Maintained a top-rated profile through punctual delivery and clean code.",
      "Specialized in React Native, Firebase, and Node.js back-ends.",
    ],
  },
  {
    company: "Softstings",
    role: "Mobile App Developer",
    period: "Onsite · 2019 – 2020",
    bullets: [
      "Joined an early-stage team and shipped the company's first cross-platform app.",
      "Owned the Android release pipeline and CI workflows.",
      "Mentored two junior developers on React Native fundamentals.",
    ],
  },
];

export function Experience() {
  const [active, setActive] = useState(0);
  const job = jobs[active];
  return (
    <section id="experience" className="px-6 lg:px-24 py-24 bg-secondary/40">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-primary font-display text-2xl">02.</span>
          <h2 className="text-3xl md:text-4xl font-bold">My Work Experience</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid md:grid-cols-[200px_1fr] gap-8">
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible">
            {jobs.map((j, i) => (
              <button
                key={j.company}
                onClick={() => setActive(i)}
                className={`text-left whitespace-nowrap px-4 py-3 border-l-2 md:border-l-2 border-b-2 md:border-b-0 transition-colors text-sm font-medium ${
                  i === active
                    ? "border-primary text-primary bg-primary/5"
                    : "border-border text-muted-foreground hover:text-foreground hover:bg-background"
                }`}
              >
                {j.company}
              </button>
            ))}
          </div>
          <div className="min-h-[260px]">
            <h3 className="text-xl font-bold">
              {job.role} <span className="text-primary">@ {job.company}</span>
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{job.period}</p>
            <ul className="mt-6 space-y-3">
              {job.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-foreground/80">
                  <span className="text-primary mt-1">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
