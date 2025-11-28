"use client";

import { motion } from "framer-motion";
import { Code2, Bot, CheckCircle2, ArrowRight, HelpCircle, AlertTriangle, Zap, Layers, Cpu, Palette, LineChart, Brain } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const services = [
    {
        id: "web",
        title: "Desarrollo Web & Aplicaciones",
        promise: "No hacemos plantillas. Construimos activos digitales.",
        problem: "Las webs lentas y genéricas pierden clientes. Wordpress suele ser inseguro y pesado.",
        solution: [
            "Desarrollo a medida con React y Next.js",
            "Arquitectura 'Serverless' (escala infinita, costo bajo)",
            "Diseño UX/UI enfocado en conversión (ventas)"
        ],
        features: [
            "Optimización SEO Técnica",
            "Panel de Administración (CMS)",
            "Integración de Pagos",
            "Analítica Avanzada"
        ],
        deliverables: [
            "Código Fuente Propiedad del Cliente",
            "Hosting Configurado",
            "Dominio Conectado",
            "Manual de Uso"
        ],
        techStack: ["Next.js", "React", "Tailwind", "Firebase", "TypeScript", "Node.js", "MySQL", "MongoDB"],
        idealFor: "E-commerce, Landing Pages corporativas, Dashboards internos",
        icon: <Code2 className="w-8 h-8" />,
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        id: "automation-ai",
        title: "Automatización & Inteligencia Artificial",
        promise: "Tu empresa en piloto automático.",
        problem: "Tareas repetitivas y falta de respuesta inmediata frenan tu crecimiento y queman a tu equipo.",
        solution: [
            "Workflows automatizados con n8n",
            "Agentes de IA entrenados con tu data",
            "Conexión total entre tus apps (CRM, Slack, Sheets)"
        ],
        features: [
            "Sincronización Bidireccional",
            "Chatbots 24/7 (No alucinan)",
            "Procesamiento de Documentos",
            "Análisis Predictivo"
        ],
        deliverables: [
            "Mapa de Procesos Automatizados",
            "Bot Desplegado y Entrenado",
            "Dashboard de Control",
            "Documentación Técnica"
        ],
        techStack: ["n8n", "OpenAI", "Python", "Pinecone", "Zapier", "LangChain"],
        useCase: "Cuando entra un lead, la IA lo califica, lo guarda en el CRM, avisa a ventas y le envía un presupuesto personalizado. Sin intervención humana.",
        icon: <Brain className="w-8 h-8" />,
        gradient: "from-purple-600 to-pink-500"
    },
    {
        id: "design",
        title: "Diseño UI/UX & Branding",
        promise: "No solo se ve bien. Vende.",
        problem: "Productos confusos o estéticamente pobres generan desconfianza y pierden usuarios en segundos.",
        solution: [
            "Sistemas de Diseño Escalables",
            "Prototipado de Alta Fidelidad",
            "Investigación de Usuarios (UX Research)"
        ],
        features: [
            "Diseño Responsivo",
            "Micro-interacciones",
            "Identidad Visual Coherente",
            "Accesibilidad Web"
        ],
        deliverables: [
            "Archivos Editables en Figma",
            "Guía de Estilos",
            "Prototipo Interactivo",
            "Assets Gráficos"
        ],
        techStack: ["Figma", "Adobe CC", "Rive", "Spline"],
        idealFor: "Startups, Rebranding, Productos Digitales Nuevos",
        icon: <Palette className="w-8 h-8" />,
        gradient: "from-orange-500 to-red-500"
    },
    {
        id: "consulting",
        title: "Consultoría Tecnológica",
        promise: "Te ayudamos a tomar las mejores decisiones.",
        problem: "Elegir mal la tecnología puede costar mucho dinero y tiempo a largo plazo.",
        solution: [
            "Asesoría Técnica Personalizada",
            "Revisión de Proyectos",
            "Planificación de Futuro"
        ],
        features: [
            "Análisis de Requerimientos",
            "Optimización de Presupuesto",
            "Selección de Herramientas",
            "Mejores Prácticas"
        ],
        deliverables: [
            "Plan de Trabajo",
            "Reporte de Estado",
            "Recomendaciones Claras",
            "Soporte de Dudas"
        ],
        techStack: ["Google Cloud", "AWS", "Vercel"],
        idealFor: "Emprendedores, Startups, Dudas puntuales",
        icon: <LineChart className="w-8 h-8" />,
        gradient: "from-emerald-500 to-teal-500"
    }
];

const steps = [
    { number: "01", title: "Diagnóstico", description: "No escribimos código sin entender tu negocio." },
    { number: "02", title: "Propuesta & MVP", description: "Te mostramos un prototipo rápido." },
    { number: "03", title: "Desarrollo Ágil", description: "Entregas semanales, vas viendo el progreso." },
    { number: "04", title: "Entrega & Capacitación", description: "Te enseñamos a usar tu nuevo sistema." }
];

const faqs = [
    { question: "¿Necesito pagar mantenimiento mensual?", answer: "Depende del proyecto. Para webs estáticas no suele ser necesario. Para sistemas complejos o bots, ofrecemos planes de soporte." },
    { question: "¿La web es autoadministrable?", answer: "Sí, implementamos CMS modernos (como Sanity o Strapi) para que puedas editar contenidos sin tocar código." },
    { question: "¿Cuánto tarda una implementación típica?", answer: "Desde 2 semanas para una landing page hasta 2-3 meses para aplicaciones complejas." }
];

export default function ServicesContent() {
    const pathname = usePathname();

    return (
        <main key={pathname} className="min-h-screen bg-slate-950 pt-24">
            {/* Hero Section */}
            <section className="relative px-6 lg:px-8 py-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10" />

                <div className="mx-auto max-w-3xl text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6"
                    >
                        Nuestras Soluciones <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Tecnológicas</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg leading-8 text-slate-300"
                    >
                        Desglosamos la complejidad técnica en productos simples que hacen crecer tu facturación.
                    </motion.p>
                </div>
            </section>

            {/* Services Blocks */}
            <section className="px-6 lg:px-8 py-12">
                <div className="mx-auto max-w-7xl space-y-32">
                    {services.map((service, index) => (
                        <motion.div
                            id={service.id}
                            key={service.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-start`}
                        >
                            {/* Visual Side - Sticky if possible, or just large */}
                            <div className="w-full lg:w-5/12 lg:sticky lg:top-32">
                                <div className={`relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br ${service.gradient} p-1 shadow-2xl shadow-indigo-500/10`}>
                                    <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" />
                                    <div className="relative h-full flex flex-col items-center justify-center text-center p-8 border border-white/10 rounded-[20px]">
                                        <div className={`p-6 rounded-2xl bg-gradient-to-br ${service.gradient} mb-8 shadow-lg shadow-indigo-500/20 transform transition-transform hover:scale-110 duration-500`}>
                                            <div className="text-white scale-150">
                                                {service.icon}
                                            </div>
                                        </div>
                                        <h3 className="text-3xl font-bold text-white mb-4">{service.title}</h3>
                                        <p className={`text-xl text-transparent bg-clip-text bg-gradient-to-r ${service.gradient} font-bold`}>
                                            "{service.promise}"
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="w-full lg:w-7/12 space-y-10">
                                {/* Problem Box */}
                                <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 flex gap-4 items-start">
                                    <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-2">El Problema</h4>
                                        <p className="text-slate-300 text-lg leading-relaxed">{service.problem}</p>
                                    </div>
                                </div>

                                {/* Solution List */}
                                <div>
                                    <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <Zap className="w-4 h-4" /> Nuestra Solución
                                    </h4>
                                    <ul className="space-y-4">
                                        {service.solution.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-slate-200 text-lg">
                                                <CheckCircle2 className={`w-6 h-6 mt-0.5 text-transparent bg-clip-text bg-gradient-to-r ${service.gradient} shrink-0`} />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Features & Deliverables Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-800">
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                            <Layers className="w-4 h-4" /> Características
                                        </h4>
                                        <ul className="space-y-2">
                                            {service.features.map((feature, i) => (
                                                <li key={i} className="text-slate-400 text-sm flex items-center gap-2">
                                                    <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4" /> Entregables
                                        </h4>
                                        <ul className="space-y-2">
                                            {service.deliverables.map((item, i) => (
                                                <li key={i} className="text-slate-400 text-sm flex items-center gap-2">
                                                    <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Tech Stack */}
                                <div className="pt-6 border-t border-slate-800">
                                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <Cpu className="w-4 h-4" /> Stack Tecnológico
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {service.techStack.map((tech) => (
                                            <span key={tech} className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {service.useCase && (
                                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mt-6">
                                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-2">Caso de Uso Real</span>
                                        <p className="text-slate-300 italic">"{service.useCase}"</p>
                                    </div>
                                )}

                                <div className="pt-4">
                                    <Link
                                        href="/#contacto"
                                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r ${service.gradient} text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/20`}
                                    >
                                        Me interesa esta solución
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Methodology */}
            <section className="px-6 lg:px-8 py-24 bg-slate-900/30 mt-12">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Cómo funcionamos</h2>
                        <p className="text-slate-400">Metodología transparente, sin sorpresas.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative p-6 rounded-2xl border border-slate-800 bg-slate-950/50 hover:border-indigo-500/30 transition-colors"
                            >
                                <div className="text-4xl font-bold text-slate-800 mb-4">{step.number}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-slate-400 text-sm">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="px-6 lg:px-8 py-24">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">Preguntas Frecuentes</h2>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-3">
                                    <HelpCircle className="w-5 h-5 text-indigo-400" />
                                    {faq.question}
                                </h3>
                                <p className="text-slate-400 pl-8">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-6 lg:px-8 pb-24">
                <div className="mx-auto max-w-5xl p-12 rounded-3xl bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/20 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/[0.05] -z-10" />
                    <h2 className="text-3xl font-bold text-white mb-6">¿No estás seguro de qué solución necesitas?</h2>
                    <div className="flex justify-center">
                        <button
                            onClick={() => window.dispatchEvent(new Event('start-consultation-flow'))}
                            className="cursor-pointer hover:opacity-90 transition-opacity hover:shadow-lg hover:shadow-indigo-500/20  inline-flex items-center gap-2 bg-white text-slate-950 px-8 py-4 rounded-full font-bold hover:bg-slate-200 transition-colors"
                        >
                            Hablemos de tu caso particular
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
