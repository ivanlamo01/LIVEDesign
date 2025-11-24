import Link from "next/link";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";

const posts = [
    {
        slug: "futuro-ia-desarrollo-web",
        title: "El futuro de la IA en el desarrollo web",
        excerpt: "Descubre cómo la inteligencia artificial está transformando la forma en que construimos y diseñamos experiencias digitales.",
        date: "24 Nov 2024",
        readTime: "5 min",
        category: "Inteligencia Artificial",
        image: "/blog/ai-future.jpg", // Placeholder
        gradient: "from-indigo-500 to-purple-500"
    },
    {
        slug: "automatizacion-n8n",
        title: "Automatiza tu negocio con n8n",
        excerpt: "Guía práctica para empezar a automatizar procesos repetitivos y ahorrar horas de trabajo manual cada semana.",
        date: "20 Nov 2024",
        readTime: "8 min",
        category: "Automatización",
        image: "/blog/automation.jpg", // Placeholder
        gradient: "from-emerald-500 to-teal-500"
    },
    {
        slug: "nextjs-14-novedades",
        title: "Por qué elegimos Next.js 14",
        excerpt: "Analizamos las ventajas de Server Actions, Partial Prerendering y por qué es nuestra elección para proyectos escalables.",
        date: "15 Nov 2024",
        readTime: "6 min",
        category: "Desarrollo",
        image: "/blog/nextjs.jpg", // Placeholder
        gradient: "from-blue-500 to-cyan-500"
    }
];

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-slate-950 pt-24 pb-20">
            {/* Header */}
            <section className="px-6 lg:px-8 mb-16">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                        Nuestro <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Blog</span>
                    </h1>
                    <p className="text-lg leading-8 text-slate-300">
                        Insights, tutoriales y noticias sobre tecnología, diseño y automatización.
                    </p>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link href={`/blog/${post.slug}`} key={post.slug} className="group relative flex flex-col overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10">

                                {/* Image Placeholder with Gradient */}
                                <div className={`h-48 w-full bg-gradient-to-br ${post.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                                            <Tag className="w-3 h-3" />
                                            {post.category}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                                        {post.title}
                                    </h3>

                                    <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-800 pt-4 mt-auto">
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {post.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {post.readTime}
                                            </span>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-indigo-400 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
