export default function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "LIVE Design",
        "image": "/logo.png",
        "description": "Agencia de desarrollo web, automatización e inteligencia artificial.",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "La Plata",
            "addressCountry": "AR"
        },
        "url": "https://livedesignweb.com",
        "telephone": "+542216087519",
        "priceRange": "$$",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                ],
                "opens": "07:00",
                "closes": "22:00"
            }
        ],
        "sameAs": [
            "https://github.com/lived3sign",
            "https://linkedin.com/company/livedesign"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
