import type { Metadata } from "next";
import PortfolioContent from "./PortfolioContent";

export const metadata: Metadata = {
    title: "Portafolio | LIVE Design",
    description: "Explora nuestros casos de éxito en desarrollo web, automatización y diseño. Proyectos reales que transforman negocios.",
    openGraph: {
        title: "Portafolio | LIVE Design",
        description: "Explora nuestros casos de éxito en desarrollo web, automatización y diseño. Proyectos reales que transforman negocios.",
        url: "https://livedesignweb.com/portfolio",
    },
};

export default function PortfolioPage() {
    return <PortfolioContent />;
}
