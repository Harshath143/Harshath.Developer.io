import { useState, useEffect } from "react";
import { Menu, X, Github } from "lucide-react";
import { sound } from "@/lib/audioSynth";

interface TacticalNavbarProps {
  onOpenCommandPalette?: () => void;
  onOpenDevConsole?: () => void;
}

export function TacticalNavbar({ onOpenCommandPalette, onOpenDevConsole }: TacticalNavbarProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "deployments", "matrix", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "about", label: "About", href: "#about" },
    { id: "deployments", label: "Flagships", href: "#deployments" },
    { id: "matrix", label: "Matrix", href: "#matrix" },
    { id: "contact", label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    sound.playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 pointer-events-none flex justify-center px-4">
      {/* Centered Floating Tactical Pill Navbar (Exact 1:1 match to reference video) */}
      <nav className="pointer-events-auto flex items-center gap-3 sm:gap-6 bg-[#09090c]/92 backdrop-blur-md border border-zinc-800/80 rounded-full px-3.5 sm:px-4 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.9)] select-none">
        
        {/* Brand Tag: Compact Red Square Badge + Monospace Name */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#hero");
          }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <span className="w-5 h-5 rounded-[4px] bg-[#ef4444] text-white flex items-center justify-center font-mono font-black text-[10px] tracking-tighter shadow-[0_0_10px_rgba(239,68,68,0.5)] group-hover:scale-105 transition-transform">
            MH
          </span>
          <span className="font-mono text-xs font-extrabold text-white tracking-tight group-hover:text-red-400 transition-colors">
            HARSHATH.
          </span>
        </a>

        {/* Vertical divider */}
        <div className="hidden sm:block h-3.5 w-px bg-zinc-800" />

        {/* Navigation Links */}
        <div className="hidden sm:flex items-center gap-5 text-xs font-sans text-zinc-400">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`transition-colors py-0.5 relative ${
                  isActive
                    ? "text-white font-medium"
                    : "hover:text-zinc-200 text-zinc-400"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-500 rounded-full shadow-[0_0_6px_#ef4444]" />
                )}
              </a>
            );
          })}
        </div>

        {/* Right Section: Status Indicator & Dispatch CTA (2-level stacked, exact match to video) */}
        <div className="flex items-center gap-2 pl-1">
          {/* Direct GitHub Profile Link */}
          <a
            href="https://github.com/Harshath143"
            target="_blank"
            rel="noopener noreferrer"
            title="Mohammed Harshath on GitHub (@Harshath143)"
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover()}
            className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-full transition-colors hidden sm:flex items-center justify-center cursor-pointer"
          >
            <Github className="h-3.5 w-3.5" />
          </a>

          <div className="flex flex-col items-end justify-center">
            <div className="hidden xs:flex items-center gap-1 font-mono text-[9px] text-emerald-400 leading-none mb-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399] animate-pulse" />
              <span className="font-medium tracking-tight">Available</span>
            </div>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center px-2.5 py-0.5 rounded-full border border-cyan-400/80 hover:border-cyan-300 text-cyan-300 hover:text-black bg-cyan-950/40 hover:bg-cyan-400 font-mono text-[10px] font-bold tracking-wider transition-all shadow-[0_0_12px_rgba(34,211,238,0.25)] hover:shadow-[0_0_18px_rgba(34,211,238,0.5)] cursor-pointer"
            >
              <span>DISPATCH...</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-1 text-zinc-400 hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-14 left-4 right-4 bg-[#0a0a0d]/95 backdrop-blur-xl border border-zinc-800 rounded-xl p-3 shadow-2xl flex flex-col gap-2 font-mono text-xs text-zinc-300">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="px-3 py-2 rounded hover:bg-zinc-900 hover:text-white transition-colors flex items-center justify-between"
            >
              <span>{link.label}</span>
              {activeSection === link.id && <span className="h-1.5 w-1.5 rounded-full bg-red-500" />}
            </a>
          ))}
          <a
            href="https://github.com/Harshath143"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded hover:bg-zinc-900 hover:text-white transition-colors flex items-center justify-between text-zinc-300 border-t border-zinc-800/80 pt-3"
          >
            <span className="flex items-center gap-2">
              <Github className="h-3.5 w-3.5 text-red-500" />
              <span>GitHub // @Harshath143</span>
            </span>
          </a>
        </div>
      )}
    </header>
  );
}
