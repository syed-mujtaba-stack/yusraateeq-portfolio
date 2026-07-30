import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import dynamic from "next/dynamic";

// Eagerly load the first 2 sections (above the fold).
// Everything else is dynamically imported — Next.js splits them into separate
// chunks that are only downloaded when the browser is idle / user scrolls near.

const Experience    = dynamic(() => import("@/components/sections/Experience").then(m => ({ default: m.Experience })));
const Education     = dynamic(() => import("@/components/sections/Education").then(m => ({ default: m.Education })));
const Skills        = dynamic(() => import("@/components/sections/Skills").then(m => ({ default: m.Skills })));
const TechStack     = dynamic(() => import("@/components/sections/TechStack").then(m => ({ default: m.TechStack })));
const Services      = dynamic(() => import("@/components/sections/Services").then(m => ({ default: m.Services })));
const Projects      = dynamic(() => import("@/components/sections/Projects").then(m => ({ default: m.Projects })));
const GitHubStats   = dynamic(() => import("@/components/sections/GitHubStats").then(m => ({ default: m.GitHubStats })));
const Certificates  = dynamic(() => import("@/components/sections/Certificates").then(m => ({ default: m.Certificates })));
const Achievements  = dynamic(() => import("@/components/sections/Achievements").then(m => ({ default: m.Achievements })));
const Testimonials  = dynamic(() => import("@/components/sections/Testimonials").then(m => ({ default: m.Testimonials })));
const FAQs          = dynamic(() => import("@/components/sections/FAQs").then(m => ({ default: m.FAQs })));
const Blog          = dynamic(() => import("@/components/sections/Blog").then(m => ({ default: m.Blog })));
const Contact       = dynamic(() => import("@/components/sections/Contact").then(m => ({ default: m.Contact })));

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Education />
      <Skills />
      <TechStack />
      <Services />
      <Projects />
      <GitHubStats />
      <Certificates />
      <Achievements />
      <Testimonials />
      <FAQs />
      <Blog />
      <Contact />
    </>
  );
}
