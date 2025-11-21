import { Code, Bot, Workflow, ArrowRight } from "lucide-react";

const services = [
  {
    title: "Desarrollo Web Moderno",
    description: "Sitios web rápidos, escalables y optimizados para SEO. Usamos Next.js y React para experiencias de usuario fluidas.",
    icon: <Code className="w-8 h-8 text-blue-500" />,
  },
  {
    title: "Agentes de IA",
    description: "Chatbots inteligentes y asistentes virtuales que atienden a tus clientes 24/7 y aprenden de tu negocio.",
    icon: <Bot className="w-8 h-8 text-emerald-500" />,
  },
  {
    title: "Automatización de Procesos",
    description: "Conectamos tus herramientas (CRM, Email, Sheets) mediante n8n para eliminar tareas repetitivas y ahorrar horas.",
    icon: <Workflow className="w-8 h-8 text-purple-500" />,
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-slate-950" id="servicios">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Encabezado de la sección */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-blue-400">Nuestras Soluciones</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Tecnología que impulsa resultados
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-400">
            No solo escribimos código. Diseñamos sistemas que hacen a tu empresa más eficiente y rentable.
          </p>
        </div>

        {/* Grid de tarjetas */}
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="flex flex-col justify-between rounded-2xl bg-slate-900 p-8 ring-1 ring-white/10 transition-all hover:ring-blue-500/50 hover:bg-slate-800/50 hover:shadow-lg hover:shadow-blue-900/20">
              <div>
                <div className="mb-6 inline-flex items-center justify-center rounded-lg bg-slate-800 p-3 ring-1 ring-white/10">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold leading-8 text-white">
                  {service.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-400">
                  {service.description}
                </p>
              </div>
              <div className="mt-6">
                 <a href="#" className="text-sm font-semibold leading-6 text-blue-400 hover:text-blue-300 flex items-center gap-1 group">
                    Saber más <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                 </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}