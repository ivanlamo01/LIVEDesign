import Hero from "./components/hero";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import CTA from "./components/CallToAction";
import LoadingScreen from "./components/LoadingScreen";
import MouseTrail from "./components/MouseTrail";
import TechTicker from "./components/TechTicker";
import ServicesPortfolioWrapper from "./components/ServicesPortfolioWrapper";

export default function Home() {
  return (
    <>
      <MouseTrail />
      <LoadingScreen />

      <div className="flex flex-col ">

        {/* Sección 1: Hero */}
        <Hero />

        {/* Sección 2: About */}
        <About />

        {/* Cinta de Tecnologías */}
        <TechTicker />

        <ServicesPortfolioWrapper>
          {/* Sección 3: Servicios */}
          <Services />

          {/* Sección 4: Portafolio */}
          <Portfolio />
        </ServicesPortfolioWrapper>

        {/* Sección 5: Call To Action */}
        <CTA />
      </div>
    </>
  );
}