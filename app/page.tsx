import Header from "./components/Header";
import Hero from "./components/Hero";
import FlowArt from "./components/FlowArt";
import FeaturedWork from "./components/sections/FeaturedWork";
import OpenSource from "./components/sections/OpenSource";
import Projects from "./components/sections/Projects";
import Writing from "./components/sections/Writing";
import Experience from "./components/sections/Experience";
import About from "./components/sections/About";
import Credentials from "./components/sections/Credentials";
import Contact from "./components/sections/Contact";
import Footer from "./components/Footer";

/**
 * Nine sections. Evidence first, biography late.
 *
 * FlowArt pins every section, so each one added costs real scroll distance;
 * Education and Certifications are merged into Credentials for that reason.
 */
export default function Page() {
  return (
    <>
      <Header />
      <FlowArt aria-label="Portfolio story scroll">
        <Hero />
        <FeaturedWork />
        <OpenSource />
        <Projects />
        <Writing />
        <Experience />
        <About />
        <Credentials />
        <Contact />
      </FlowArt>
      <Footer />
    </>
  );
}
