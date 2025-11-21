import { ExternalLink, Github } from "lucide-react";

// Datos de ejemplo (Aquí pondrás tus 5 proyectos reales)
const projects = [
  {
    title: "EcoDesign Aberturas",
    description: "Plataforma de cotización automática para una fábrica de aberturas de PVC. Reduce el tiempo de presupuesto en un 80%.",
    tags: ["Next.js", "Firebase", "Tailwind"],
    gradient: "from-blue-600 to-cyan-500", // Color de fondo temporal
    link: "#"
  },
  {
    title: "Fajre Stock App",
    description: "WebApp de gestión de inventario en tiempo real para restaurante de comida árabe. Control de stock e insumos.",
    tags: ["React", "Node.js", "SQL"],
    gradient: "from-emerald-600 to-teal-500",
    link: "#"
  },
  {
    title: "Consultorio Dra. Lamas",
    description: "Landing page personal con sistema de agendamiento para profesional de salud (Obstetricia).",
    tags: ["Astro", "Design", "SEO"],
    gradient: "from-purple-600 to-pink-500",
    link: "#"
  },
    {
    title: "Automation Dashboard",
    description: "Panel interno para visualización de métricas de agentes de IA y flujos de n8n.",
    tags: ["n8n", "Python", "API Rest"],
    gradient: "from-orange-500 to-red-500",
    link: "#"
  },
];

export default function Portfolio() {
  return (
    <section className="py-24 bg-slate-950" id="proyectos">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-blue-400">Nuestro Trabajo</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Proyectos Destacados
          </p>
          <p className="mt-4 text-lg text-gray-400">
            Soluciones reales que ya están generando valor para nuestros clientes.
          </p>
        </div>

        {/* Grid de Proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <div key={index} className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-colors">
              
              {/* Placeholder de Imagen (El degradado) */}
              {/* Cuando tengas fotos, reemplaza este div por <Image src={...} /> */}
              <div className={`h-48 w-full bg-gradient-to-br ${project.gradient} opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center`}>
                <span className="text-white/20 font-bold text-4xl uppercase tracking-widest">Preview</span>
              </div>

              <div className="p-8">
                <div className="flex gap-2 mb-4 flex-wrap">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium text-blue-300 bg-blue-900/30 rounded-full border border-blue-500/20">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <a href={project.link} className="inline-flex items-center text-sm font-semibold text-white hover:text-blue-400 transition-colors">
                  Ver Proyecto <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}