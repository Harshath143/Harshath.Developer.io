export function Contact() {
  return (
    <section id="contact" className="px-6 lg:px-24 py-32 text-center">
      <p className="text-primary font-display text-sm tracking-widest mb-4">06. GET IN TOUCH</p>
      <h2 className="text-4xl md:text-6xl font-bold text-balance">Let's Work Together</h2>
      <p className="mt-6 max-w-xl mx-auto text-foreground/70 leading-relaxed">
        I'm open for new opportunities — especially ambitious or large projects. My inbox is always
        open. Whether you have a question or just want to say hi, I'll try my best to get back to you.
      </p>
      <a
        href="mailto:hello@example.com"
        className="mt-10 inline-flex items-center rounded-md border-2 border-primary px-8 py-4 text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        Say Hello
      </a>
      <footer className="mt-24 text-xs text-muted-foreground">
        Designed & built with care · © {new Date().getFullYear()}
      </footer>
    </section>
  );
}
