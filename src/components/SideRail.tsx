import { Github, Youtube, Instagram, Twitter, Linkedin } from "lucide-react";

const socials = [
  { Icon: Github, href: "https://github.com", label: "GitHub" },
  { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export function SideRailLeft() {
  return (
    <aside className="fixed left-6 bottom-0 z-30 hidden lg:flex flex-col items-center gap-5 text-muted-foreground">
      {socials.map(({ Icon, href, label }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
           className="hover:text-primary transition-colors">
          <Icon className="h-5 w-5" />
        </a>
      ))}
      <div className="w-px h-24 bg-foreground/40" />
    </aside>
  );
}

export function SideRailRight() {
  return (
    <aside className="fixed right-6 bottom-0 z-30 hidden lg:flex flex-col items-center gap-6 text-muted-foreground">
      <a href="mailto:hello@example.com"
         className="[writing-mode:vertical-rl] tracking-widest text-sm hover:text-primary transition-colors">
        hello@example.com
      </a>
      <div className="w-px h-24 bg-foreground/40" />
    </aside>
  );
}
