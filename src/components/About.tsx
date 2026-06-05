import portrait from "@/assets/portrait.jpg";

const skills = [
  "JavaScript/TypeScript", "React Native / React.js", "Firebase", "Firestore",
  "Cognito", "Node.js", "Express.js", "AWS", "MongoDB", "Serverless",
];

export function About() {
  return (
    <section id="about" className="relative px-6 lg:px-24 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-primary font-display text-2xl">01.</span>
          <h2 className="text-3xl md:text-4xl font-bold">My Portfolio</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-12 items-start">
          <div className="space-y-5 text-foreground/75 leading-relaxed">
            <p>
              Greetings, I'm Muhammad Aamir Malik, a seasoned mobile app developer with over 5
              years of experience in the dynamic IT industry. My expertise lies in crafting
              cutting-edge, full-stack mobile and hybrid applications for Android and iOS using
              React Native.
            </p>
            <p>
              Having delivered projects to satisfied clients worldwide, I've collaborated with
              individuals from various cultures — from local software houses to Fiverr and Upwork,
              and eventually international companies.
            </p>
            <p>Over time I've specialized in many technologies, some of them are…</p>

            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 pt-4">
              {skills.map((s) => (
                <li key={s} className="flex items-center gap-3 text-foreground/80">
                  <span className="text-primary">▸</span>
                  <span className="text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative group max-w-xs justify-self-center lg:justify-self-end">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-xl border-2 border-primary -z-10 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
            <div className="rounded-xl overflow-hidden bg-primary/10">
              <img
                src={portrait}
                alt="Portrait of Muhammad Aamir"
                className="w-full h-full object-cover mix-blend-multiply grayscale hover:grayscale-0 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
