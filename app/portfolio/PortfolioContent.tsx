"use client";

import { Key, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowRight, Layers, Smartphone, Globe, Code, Sparkles, Zap, Database, Brain, ShoppingCart, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const projects = [
    {
        id: "lmm",
        title: "LMM Estética",
        category: "E-Commerce",
        description: "Plataforma de comercio electrónico completa para productos estéticos. Diseñada para maximizar conversiones y ofrecer una experiencia de compra fluida.",
        images: ["/image.png", "/lmm.png", "/lmm2.png"], // Duplicated for demo
        tags: ["Next.js", "Firebase", "Tailwind"],
        link: "https://lmmestetica.com.ar",
        gradient: "from-blue-600 to-cyan-500",
        features: ["Carrito de compras en tiempo real", "Panel de administración", "Pasarela de pagos integrada", "Mercado Pago", "Reportes de ventas", "Gestión de clientes"],
        icon: <ShoppingCart className="w-6 h-6" />
    },
    {
        id: "chatbot",
        title: "Chatbot IA & n8n",
        category: "Automatización & IA",
        description: "Asistente virtual inteligente capaz de manejar consultas complejas y automatizar respuestas en tiempo real, integrado con flujos de trabajo de n8n.",
        images: ["/workflow2.jpeg", "/workflow2.jpeg", "/workflow2.jpeg"], // Duplicated for demo
        tags: ["BD Vectorial", "n8n", "IA", "JSON"],
        link: "#",
        action: "open-chat",
        gradient: "from-emerald-600 to-teal-500",
        features: ["Respuestas contextuales", "Integración con CRM", "Procesamiento de lenguaje natural"],
        icon: <Brain className="w-6 h-6" />
    },
    {
        id: "consultorio",
        title: "Consultorio Dra. Lamas",
        category: "Landing Page & Booking",
        description: "Sitio web profesional con sistema de agendamiento de turnos integrado. Optimizado para SEO y diseñado para generar confianza en los pacientes.",
        images: ["/image3.png", "/image3.png", "/image3.png"], // Duplicated for demo
        tags: ["Astro", "Design", "SEO"],
        link: "https://gestando-obstetricia.web.app/",
        gradient: "from-purple-600 to-pink-500",
        features: ["Sistema de reservas", "Blog autoadministrable", "Diseño responsive y accesible"],
        icon: <Calendar className="w-6 h-6" />
    },
    {
        id: "bebedero",
        title: "El Bebedero POS",
        category: "Sistema de Gestión",
        description: "Sistema de Punto de Venta (POS) robusto con control de inventario en tiempo real y análisis gráfico de ventas para la toma de decisiones.",
        images: ["/image2.png", "/image2.png", "/image2.png"], // Duplicated for demo
        tags: ["Next.js", "Firebase", "Tailwind"],
        link: "#",
        gradient: "from-orange-500 to-red-500",
        features: ["Control de stock", "Reportes de ventas", "Gestión de clientes"],
        icon: <Database className="w-6 h-6" />
    }
];

function ProjectCard({ project, index }: { project: any, index: number }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center group`}
        >
            {/* Image Side (Carousel) */}
            <div
                className="w-full lg:w-7/12 relative perspective-1000"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className={`absolute -inset-4 bg-gradient-to-r ${project.gradient} rounded-[2rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-700`} />
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 shadow-2xl shadow-black/50 transform transition-transform duration-700 group-hover:scale-[1.02] group-hover:-rotate-1">
                    <div className="aspect-video relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={project.images[currentImageIndex]}
                                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </AnimatePresence>

                        <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/0 transition-colors duration-500 pointer-events-none" />

                        {/* Navigation Controls */}
                        <div className={`absolute inset-0 flex items-center justify-between p-4 opacity-0 ${isHovered ? 'opacity-100' : ''} transition-opacity duration-300`}>
                            <button
                                onClick={prevImage}
                                className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm transition-colors transform hover:scale-110"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm transition-colors transform hover:scale-110"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Pagination Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {project.images.map((_: any, idx: Key | null | undefined) => (
                                <div
                                    key={idx}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Overlay Info on Image (Mobile/Tablet) */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950/90 to-transparent lg:hidden pointer-events-none">
                        <span className={`text-xs font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r ${project.gradient}`}>
                            {project.category}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-5/12 space-y-6">
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${project.gradient} bg-opacity-10`}>
                        <div className="text-white">
                            {project.icon}
                        </div>
                    </div>
                    <span className={`text-sm font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r ${project.gradient}`}>
                        {project.category}
                    </span>
                </div>

                <h3 className="text-3xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">
                    {project.title}
                </h3>

                <p className="text-slate-400 text-lg leading-relaxed">
                    {project.description}
                </p>

                {/* Features List */}
                <div className="py-4 border-y border-slate-800/50">
                    <ul className="space-y-2">
                        {project.features.map((feature: string, i: number) => (
                            <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                                <Zap className={`w-4 h-4 text-transparent bg-clip-text bg-gradient-to-r ${project.gradient}`} />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-400 group-hover:border-slate-700 transition-colors">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="pt-4 flex gap-4">
                    {project.action === 'open-chat' ? (
                        <button
                            onClick={() => {
                                window.dispatchEvent(new Event('open-chatbot'));
                            }}
                            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r ${project.gradient} text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1`}
                        >
                            Probar Demo
                            <Brain className="w-4 h-4" />
                        </button>
                    ) : (
                        <Link
                            href={project.link}
                            target="_blank"
                            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r ${project.gradient} text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1`}
                        >
                            Ver Proyecto
                            <ExternalLink className="w-4 h-4" />
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default function PortfolioContent() {
    const pathname = usePathname();

    return (
        <main key={pathname} className="min-h-screen bg-slate-950 pt-24">
            {/* Hero Section */}
            <section className="relative px-6 lg:px-8 py-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10" />

                {/* Floating Elements Animation */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-20 left-[10%] w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{ y: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-20 right-[10%] w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
                    />
                </div>

                <div className="mx-auto max-w-3xl text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 text-sm text-slate-400 mb-6 backdrop-blur-sm"
                    >
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        <span>Innovación y Tecnología</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6"
                    >
                        Nuestro <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Portafolio</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg leading-8 text-slate-300"
                    >
                        Transformamos ideas en soluciones digitales de alto impacto.
                        Cada proyecto es una historia de éxito.
                    </motion.p>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="px-6 lg:px-8 py-12">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 gap-20">
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-6 lg:px-8 py-24">
                <div className="mx-auto max-w-5xl p-12 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-grid-white/[0.05] -z-10" />
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors duration-700" />

                    <h2 className="text-3xl font-bold text-white mb-6">¿Tienes un proyecto en mente?</h2>
                    <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                        Ya sea una idea disruptiva o una mejora necesaria, tenemos la tecnología y la experiencia para hacerlo realidad.
                    </p>
                    <div className="flex justify-center">
                        <button
                            onClick={() => window.dispatchEvent(new Event('start-consultation-flow'))}
                            className="inline-flex items-center gap-2 bg-white text-slate-950 px-8 py-4 rounded-full font-bold hover:bg-indigo-50 transition-all hover:scale-105 shadow-xl shadow-white/10"
                        >
                            Iniciar Proyecto
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
