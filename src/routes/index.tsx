import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Work } from "@/components/Work";
import { Reviews } from "@/components/Reviews";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { SideRailLeft, SideRailRight } from "@/components/SideRail";
import { MouseBlob } from "@/components/MouseBlob";
import { SectionDots } from "@/components/SectionDots";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muhammad Aamir — Mobile App Developer" },
      { name: "description", content: "Portfolio of Muhammad Aamir, a React Native mobile app developer with 5+ years building hybrid apps for iOS and Android." },
      { property: "og:title", content: "Muhammad Aamir — Mobile App Developer" },
      { property: "og:description", content: "React Native developer building hybrid mobile apps for iOS and Android." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <Navbar />
      <MouseBlob />
      <SideRailLeft />
      <SideRailRight />
      <SectionDots />
      <Hero />
      <About />
      <Experience />
      <Work />
      <Reviews />
      <Certifications />
      <Contact />
    </main>
  );
}
