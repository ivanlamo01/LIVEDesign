
    "use client";

    import { Code, Bot, Workflow, ArrowRight } from "lucide-react";
    import { motion } from "framer-motion";
    import React from "react"; // Added React import
    import Link from "next/link";

    const services = [
      {
        id: "desarrollo-web",
        link: "/services#web",
        title: "Desarrollo Web Moderno",
        description: "Sitios web rápidos, escalables y optimizados para SEO. Usamos Next.js y React para experiencias de usuario fluidas.",
        icon: <Code className="w-8 h-8 text-blue-400" />,
      },
      {
        id: "agentes-de-ia",
        link: "/services#automation-ai",
        title: "Agentes de IA",
        description: "Chatbots inteligentes y asistentes virtuales que atienden a tus clientes 24/7 y aprenden de tu negocio.",
        icon: <Bot className="w-8 h-8 text-emerald-400" />,
      },
      {
        id: "consulting",
        link: "/services#consulting",
        title: "Consultoría",
        description: "Optimización de procesos, automatización de tareas y creación de soluciones personalizadas para tu negocio.",
        icon: <Workflow className="w-8 h-8 text-purple-400" />,
      },
    ];

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
        },
      },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
        },
      },
    };

    export default function Services() {
      // Handle scroll to hash on mount
      React.useEffect(() => {
        if (window.location.hash) {
          const id = window.location.hash.substring(1);
          const element = document.getElementById(id);
          if (element) {
            setTimeout(() => {
              element.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 500); // Delay to allow animations to start
          }
        }
      }, []);

return (
  <section className="py-24 relative overflow-hidden" id="servicios">

    <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">

      {/* Encabezado de la sección */}
      <div className="mx-auto max-w-2xl text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-base font-semibold leading-7 text-blue-400"
        >
          Nuestras Soluciones
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400"
        >
          Tecnología que impulsa resultados
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg leading-8 text-gray-400"
        >
          No solo escribimos código. Diseñamos sistemas que hacen a tu empresa más eficiente y rentable.
        </motion.p>
      </div>

      {/* Grid de tarjetas */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        {services.map((service) => (
          <motion.div
            key={service.id}
            id={service.id}
            variants={itemVariants}
            className="flex flex-col items-start scroll-mt-32"
          >
            <div className="rounded-lg bg-white/5 p-2 ring-1 ring-white/10">
              {service.icon}
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold leading-8 text-white">
                {service.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-gray-400">
                {service.description}
              </p>
            </div>
            <div className="mt-6">
              <Link href={service.link} className="text-sm font-semibold leading-6 text-blue-400 hover:text-blue-300 flex items-center gap-1">
                Saber más <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);
}