import { Quote } from "lucide-react";

const reviews = [
  { name: "Lauren", source: "Fiverr", text: "Wonderful service and even better customer service. A great experience!" },
  { name: "Christopher Peters", source: "Upwork", text: "Great work, flexible on changes, helped me understand choices where there was ambiguity. Will hire again!" },
  { name: "Tony Yim", source: "Fiverr", text: "This seller is amazing — my current developer couldn't fix it, but he could." },
  { name: "Colin", source: "Fiverr", text: "Jumped through a bunch of hoops and hurdles to deliver a great job. Thanks!" },
  { name: "Rukaiya Bashir", source: "Fiverr", text: "A pleasure to work with — experienced and excellent work. Highly recommended." },
  { name: "Amir Tanoli", source: "Fiverr", text: "Super talented and professional. Loved the end product. Highly recommended+++" },
];

export function Reviews() {
  return (
    <section id="reviews" className="px-6 lg:px-24 py-24 bg-secondary/40">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-primary font-display text-2xl">04.</span>
          <h2 className="text-3xl md:text-4xl font-bold">Some Reviews</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <figure key={r.name + r.text} className="rounded-2xl bg-card border border-border p-6 relative">
              <Quote className="absolute top-4 right-4 h-6 w-6 text-primary/20" />
              <blockquote className="text-foreground/80 leading-relaxed">"{r.text}"</blockquote>
              <figcaption className="mt-5 pt-4 border-t border-border">
                <p className="font-semibold text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">via {r.source}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
