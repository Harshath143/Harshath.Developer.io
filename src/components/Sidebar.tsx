import { Github, Linkedin, Twitter, Mail, Youtube, BookOpen } from "lucide-react";

const SOCIALS = [
  { Icon: Github, href: "https://github.com", label: "GitHub" },
  { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { Icon: Mail, href: "mailto:harshath@example.com", label: "Email" },
  { Icon: BookOpen, href: "https://medium.com", label: "Medium" },
  { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export function SidebarLeft() {
  return (
    <aside className="fixed left-5 bottom-0 z-30 hidden md:flex flex-col items-center gap-5 after:content-[''] after:block after:w-px after:h-24 after:bg-border after:mt-4">
      {SOCIALS.map(({ Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={label}
          data-cursor="hover"
          className="group relative text-muted-foreground hover:text-primary transition-all hover:-translate-y-1"
        >
          <Icon className="h-[18px] w-[18px] transition-transform group-hover:scale-110" />
          <span
            aria-hidden
            className="absolute inset-0 rounded-full opacity-0 blur-md group-hover:opacity-60 transition-opacity"
            style={{ background: "var(--color-primary)" }}
          />
        </a>
      ))}
    </aside>
  );
}

export function SidebarRight() {
  return (
    <aside className="fixed right-5 bottom-0 z-30 hidden md:flex flex-col items-center gap-6 after:content-[''] after:block after:w-px after:h-24 after:bg-border after:mt-4">
      <a
        href="mailto:harshath@example.com"
        data-cursor="hover"
        className="font-mono text-xs tracking-[0.25em] text-muted-foreground hover:text-primary transition-colors"
        style={{ writingMode: "vertical-rl" }}
      >
        harshath@example.com
      </a>
    </aside>
  );
}
