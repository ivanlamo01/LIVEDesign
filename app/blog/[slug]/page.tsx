import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, Share2, User } from "lucide-react";

// Mock data store (in a real app this would be a CMS or DB)
const posts: Record<string, any> = {
    "futuro-ia-desarrollo-web": {
        title: "El futuro de la IA en el desarrollo web",
        content: `
      <p>La inteligencia artificial no es solo una moda pasajera; está redefiniendo fundamentalmente cómo concebimos, diseñamos y construimos aplicaciones web.</p>
      
      <h2>Más allá del código repetitivo</h2>
      <p>Herramientas como GitHub Copilot y ChatGPT ya nos ayudan a escribir código más rápido, pero el verdadero cambio viene en la arquitectura y la experiencia de usuario. Las interfaces generativas, que se adaptan en tiempo real a las necesidades del usuario, son el siguiente paso.</p>
      
      <h2>Personalización extrema</h2>
      <p>Imagina un sitio web que no solo sabe tu nombre, sino que reordena su contenido basándose en tu comportamiento de navegación en tiempo real. Eso es lo que la IA hace posible hoy.</p>
      
      <blockquote>"La IA no reemplazará a los desarrolladores, pero los desarrolladores que usen IA reemplazarán a los que no lo hagan."</blockquote>
      
      <h2>Conclusión</h2>
      <p>Estamos en el inicio de una revolución. Adaptarse ahora es clave para liderar el mercado en los próximos años.</p>
    `,
        date: "24 Nov 2024",
        readTime: "5 min",
        author: "Iván Lamas",
        role: "Lead Developer",
        category: "Inteligencia Artificial",
        gradient: "from-indigo-500 to-purple-500"
    },
    "automatizacion-n8n": {
        title: "Automatiza tu negocio con n8n",
        content: `
      <p>n8n se ha convertido en la herramienta favorita para quienes buscan automatización potente sin las restricciones de costos de otras plataformas.</p>
      <h2>¿Por qué n8n?</h2>
      <p>A diferencia de Zapier o Make, n8n es self-hostable, lo que significa privacidad total de tus datos y costos fijos, sin importar cuántas ejecuciones realices.</p>
    `,
        date: "20 Nov 2024",
        readTime: "8 min",
        author: "Equipo LIVE",
        role: "Automation Experts",
        category: "Automatización",
        gradient: "from-emerald-500 to-teal-500"
    },
    "nextjs-14-novedades": {
        title: "Por qué elegimos Next.js 14",
        content: `
      <p>Next.js 14 introdujo Server Actions estables, cambiando para siempre cómo manejamos las mutaciones de datos en React.</p>
      <h2>Server Actions: El fin de las API routes innecesarias</h2>
      <p>Ahora podemos ejecutar código de servidor directamente desde nuestros componentes, simplificando la arquitectura y mejorando la seguridad.</p>
    `,
        date: "15 Nov 2024",
        readTime: "6 min",
        author: "Equipo LIVE",
        role: "Lead Developer",
        category: "Desarrollo",
        gradient: "from-blue-500 to-cyan-500"
    }
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = posts[slug];

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-slate-950 pt-24 pb-20">
            {/* Hero Header */}
            <div className="relative h-[400px] w-full overflow-hidden mb-12">
                <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-20`} />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/0 via-slate-950/50 to-slate-950" />

                <div className="relative h-full max-w-4xl mx-auto px-6 flex flex-col justify-end pb-12">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 w-fit">
                        <ArrowLeft className="w-4 h-4" />
                        Volver al Blog
                    </Link>

                    <div className="flex items-center gap-4 mb-4">
                        <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-300 border border-indigo-500/30">
                            {post.category}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-6 text-sm text-slate-300">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                                <User className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="font-semibold text-white">{post.author}</p>
                                <p className="text-xs text-slate-500">{post.role}</p>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-slate-800" />
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {post.readTime} lectura
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6">
                <div
                    className="prose prose-invert prose-lg prose-indigo max-w-none
            prose-headings:font-bold prose-headings:text-white
            prose-p:text-slate-300 prose-p:leading-relaxed
            prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:text-indigo-300
            prose-blockquote:border-l-indigo-500 prose-blockquote:bg-slate-900/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
            prose-strong:text-white"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Share / Footer */}
                <div className="mt-16 pt-8 border-t border-slate-800 flex justify-between items-center">
                    <p className="text-slate-500 text-sm">
                        ¿Te gustó este artículo? Compártelo.
                    </p>
                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-slate-300 hover:bg-slate-800 transition-colors">
                        <Share2 className="w-4 h-4" />
                        Compartir
                    </button>
                </div>
            </div>
        </article>
    );
}
