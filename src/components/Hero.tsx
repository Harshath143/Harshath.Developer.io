import { ScrambleText } from "./ScrambleText";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-28 pb-20 px-6 lg:px-24 overflow-hidden">
      <div className="relative max-w-4xl z-10">
        <p className="text-lg md:text-xl text-muted-foreground mb-4">G'day, I'm</p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.02] text-foreground text-balance">
          Muhammad Aamir,
        </h1>
        <h2 className="mt-4 text-3xl md:text-5xl font-bold text-primary font-mono tracking-tight min-h-[1.2em]">
          <ScrambleText
            phrases={[
              "A Full Stack Hybrid App Developer",
              "A React Native Specialist",
              "A Mobile App Architect",
              "A Firebase & Node.js Engineer",
            ]}
          />
        </h2>
        <p className="mt-8 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/75">
          I'm a skilled mobile app developer with over 5 years of experience in the IT industry.
          Using React Native, I create full-stack mobile apps that cater to the needs of diverse
          clients. My expertise lies in developing hybrid apps for both Android and iOS platforms,
          ensuring users have access to efficient and user-friendly applications.
        </p>
        <a
          href="#contact"
          className="mt-10 inline-flex items-center rounded-md border-2 border-primary px-6 py-3 text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Contact me!
        </a>
      </div>
    </section>
  );
}
