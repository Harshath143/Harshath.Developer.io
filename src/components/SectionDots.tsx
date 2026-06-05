import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "reviews", label: "Reviews" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export function SectionDots() {
  const [active, setActive] = useState("top");
  const [accent, setAccent] = useState<string>("var(--color-primary)");

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= mid) current = s.id;
      }
      setActive(current);
      const el = document.getElementById(current);
      if (el) {
        const themed = el.getAttribute("data-accent");
        setAccent(themed || "var(--color-primary)");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={s.label}
            className="group relative flex items-center justify-end h-3"
          >
            <span
              className="absolute right-6 px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border whitespace-nowrap"
            >
              {s.label}
            </span>
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: isActive ? 14 : 8,
                height: isActive ? 14 : 8,
                backgroundColor: isActive ? accent : "transparent",
                border: `2px solid ${isActive ? accent : "var(--color-muted-foreground)"}`,
                boxShadow: isActive ? `0 0 14px ${accent}` : "none",
              }}
            />
          </a>
        );
      })}
    </div>
  );
}
