import About from "@/components/sections/about";
import Blog from "@/components/sections/blog";
import Contact from "@/components/sections/contact";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Blog />
    </>
  );
}
