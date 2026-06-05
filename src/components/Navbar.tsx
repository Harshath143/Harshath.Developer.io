import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-40 px-6 lg:px-12 py-5 flex items-center justify-between">
      <a href="#top" className="flex items-center gap-2">
        <span className="h-12 w-12 rounded-full bg-primary/90 ring-4 ring-primary/20 grid place-items-center text-primary-foreground font-display font-bold">
          MA
        </span>
      </a>
      <nav className="hidden md:flex items-center gap-2">
        {links.map((l) => (
          <a key={l.href} href={l.href}
             className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
            {l.label}
          </a>
        ))}
        <a href="#contact"
           className="ml-3 inline-flex items-center rounded-md border border-primary/60 px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
          Curriculum Vitae | CV
        </a>
      </nav>
      <button
        className="md:hidden p-2 rounded-md border border-border"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mx-6 mt-2 rounded-xl border border-border bg-card shadow-lg p-4 flex flex-col gap-2 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
               className="px-3 py-2 rounded-md text-foreground/80 hover:bg-secondary">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}
             className="mt-2 text-center rounded-md border border-primary px-4 py-2 text-primary">
            Curriculum Vitae | CV
          </a>
        </div>
      )}
    </header>
  );
}
