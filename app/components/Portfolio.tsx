"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "LMM Estética",
    description: "E-commerce de productos estéticos y de cuidado personal.",
    tags: ["Next.js", "Firebase", "Tailwind"],
    gradient: "from-blue-600 to-cyan-500",
    image: "/image.png",
    link: "https://lmmestetica.com.ar"
  },
  {
    title: "Modelo de chatbot con IA",
    description: "Chatbot con IA para el manejo de consultas y respuestas en tiempo real. Integración con n8n.",
    tags: ["BD vectorial", "n8n", "IA", "json"],
    gradient: "from-emerald-600 to-teal-500",
    image: "/workflow2.jpeg",
    link: "#",
    action: "open-chat"
  },
  {
    title: "Consultorio Dra. Lamas",
    description: "Landing page personal con sistema de agendamiento para profesional de salud (Obstetricia).",
    tags: ["Astro", "Design", "SEO"],
    gradient: "from-purple-600 to-pink-500",
    image: "/image3.png",
    link: "https://gestando-obstetricia.web.app/"
  },
  {
    title: "El Bebedero",
    description: "Sistema de punto de venta con control de stock, analisis gráfico de ventas y clientes.",
    tags: ["Next.js", "Firebase", "Tailwind"],
    gradient: "from-orange-500 to-red-500",
    image: "/image2.png",
    link: "#"
  },
];

export default function Portfolio() {
  return (
    <section className="py-24" id="proyectos">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-base font-semibold leading-7 text-blue-400"
          >
            Nuestro Trabajo
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Proyectos Destacados
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-gray-400"
          >
            Soluciones reales que ya están generando valor para nuestros clientes.
          </motion.p>
        </div>

        <div className="flex flex-col gap-24">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              {/* Imagen / Preview */}
              <div className="w-full lg:w-1/2">
                <div className={`relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br ${project.gradient} group shadow-2xl shadow-blue-900/20`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                </div>
              </div>

              {/* Contenido */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="flex gap-2 mb-6 flex-wrap">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium text-blue-300 bg-blue-900/30 rounded-full border border-blue-500/20">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-3xl font-bold text-white mb-4">
                  {project.title}
                </h3>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  {project.description}
                </p>

                {project.action === 'open-chat' ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      window.dispatchEvent(new Event('open-chatbot'));
                    }}
                    className="inline-flex items-center text-base font-semibold text-blue-400 hover:text-blue-300 transition-colors group cursor-pointer"
                  >
                    Ver Proyecto <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                ) : (
                  <a href={project.link} target="_blank" className="inline-flex items-center text-base font-semibold text-blue-400 hover:text-blue-300 transition-colors group">
                    Ver Proyecto <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}