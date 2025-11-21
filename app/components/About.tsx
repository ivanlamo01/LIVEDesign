import { CheckCircle2, Users, Trophy, Zap } from "lucide-react";

const stats = [
  { name: 'Proyectos Entregados', value: '+5', icon: Trophy },
  { name: 'Ahorro en Procesos', value: '40%', icon: Zap },
  { name: 'Soporte Técnico', value: '24/7', icon: Users },
];

export default function About() {
  return (
    <section className="relative py-24 bg-slate-950 overflow-hidden" id="nosotros">
      {/* Elemento decorativo de fondo */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
          
          {/* Columna de Texto */}
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-blue-400">Sobre Nosotros</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Más que desarrolladores, somos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">consultores estratégicos</span>.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                LIVE Design nació con una meta clara: cerrar la brecha entre la tecnología compleja y los negocios reales. 
              </p>
              <p className="mt-4 text-base leading-7 text-gray-400">
                Combinamos una sólida base en programación con una visión moderna de automatización. No te vendemos una web y desaparecemos; construimos la infraestructura digital para que tu empresa escale sin dolor.
              </p>
              
              <ul className="mt-8 space-y-4">
                <li className="flex gap-x-3 text-gray-300">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-blue-400" aria-hidden="true" />
                    <span>Enfoque en resultados medibles (KPIs).</span>
                </li>
                <li className="flex gap-x-3 text-gray-300">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-blue-400" aria-hidden="true" />
                    <span>Arquitectura escalable (Node.js, React, Cloud).</span>
                </li>
                <li className="flex gap-x-3 text-gray-300">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-blue-400" aria-hidden="true" />
                    <span>Integración real de Inteligencia Artificial.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Columna Visual / Stats */}
          <div className="flex flex-col gap-6">
            {/* Aquí podrías poner una foto de ustedes dos trabajando si tienen una buena. 
                Si no, este grid de "métricas" queda muy profesional y tech. */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors backdrop-blur-sm">
                        <stat.icon className="h-8 w-8 text-blue-400 mb-4" />
                        <dt className="text-sm font-medium leading-6 text-gray-400">{stat.name}</dt>
                        <dd className="mt-2 text-3xl font-bold tracking-tight text-white">{stat.value}</dd>
                    </div>
                ))}
                
                {/* Carta destacada */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-2xl sm:col-span-1 flex flex-col justify-center text-white shadow-lg shadow-purple-900/20">
                    <p className="text-lg font-bold mb-2">¿Listo para innovar?</p>
                    <p className="text-sm text-blue-100 mb-4">Tu competencia ya está automatizando. No te quedes atrás.</p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}