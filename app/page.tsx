import Header from "./components/Header";
import Hero from "./components/Hero";
import FlowArt from "./components/FlowArt";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Education from "./components/sections/Education";
import Certifications from "./components/sections/Certifications";
import Contact from "./components/sections/Contact";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <FlowArt aria-label="Portfolio story scroll">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
      </FlowArt>
      <Footer />
    </>
  );
}
