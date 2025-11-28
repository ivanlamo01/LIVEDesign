import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
    title: "Servicios | LIVE Design",
    description: "Desarrollo Web, Automatización con IA y Diseño UX/UI. Soluciones tecnológicas a medida para potenciar tu negocio.",
    openGraph: {
        title: "Servicios | LIVE Design",
        description: "Desarrollo Web, Automatización con IA y Diseño UX/UI. Soluciones tecnológicas a medida para potenciar tu negocio.",
        url: "https://livedesignweb.com/services",
    },
};

export default function ServicesPage() {
    return <ServicesContent />;
}
