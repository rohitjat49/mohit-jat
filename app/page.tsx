import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import Intro from "@/components/sections/Intro";
import Expertise from "@/components/sections/Expertise";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Journey from "@/components/sections/Journey";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <Intro />

      <Expertise />

      <About />

      <Work />

      <Journey />

      <Blog />

      <Contact />

      <Footer />
    </main>
  );
}