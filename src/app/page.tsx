import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Education from "@/components/education";
import Skills, { Skills2 } from "@/components/skills";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar />
      <Hero />
      <About />
      <Education />
      <div className="relative z-10">
        <svg
          className="w-full h-16 text-white/5"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M0,96L120,90.7C240,85,480,75,720,69.3C960,64,1200,64,1320,64L1440,64L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"
          />
        </svg>
      </div>
      <Skills />
      {/* <Skills2 /> */}
      <Experience />
      <Projects />
      <div className="relative z-10">
        <svg
          className="w-full h-16 text-white/5"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
          />
        </svg>
      </div>
      <Contact />
    </main>
  );
}
