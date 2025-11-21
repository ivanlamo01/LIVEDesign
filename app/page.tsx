import Hero from "./components/hero";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import CTA from "./components/CallToAction";
export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      
      {/* Sección 1: Hero */}
      <Hero />

      {/* Sección 2: About */}
      <About />

      {/* Sección 3: Servicios */}
      <Services />

      {/* Sección 4: Portafolio */}
      <Portfolio />

      {/* Sección 5: Call To Action */}
      <CTA />
    </div>
  );
}