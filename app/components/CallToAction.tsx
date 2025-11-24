"use client"
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section id="cta" className="relative isolate overflow-hidden bg-slate-900 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 text-center lg:text-left items-center">
          
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              ¿Tienes un proyecto en mente?
              <br />
              <span className="text-blue-400">Hagámoslo realidad.</span>
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              Ya sea automatizar tu flujo de ventas o renovar tu presencia digital. Agenda una consultoría gratuita de 15 minutos para evaluar tu caso.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={() => window.dispatchEvent(new Event('start-contact-flow'))} className="cursor-pointer rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all">
                Reservar Consultoría
              </button>
              <a href="#" className="text-sm font-semibold leading-6 text-white flex items-center justify-center gap-1 hover:text-blue-300 transition-colors group">
                Ver planes de precios <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1"/>
              </a>
            </div>
          </div>

          {/* Gráfico decorativo o estadística (Derecha) */}
          <div className="relative h-full w-full max-w-md mx-auto lg:mr-0">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl opacity-20 -z-10 rounded-full"></div>
             <div className="rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm">
                <div className="flex flex-col gap-4">
                    <div className="h-2 w-1/3 bg-white/20 rounded"></div>
                    <div className="h-2 w-2/3 bg-white/10 rounded"></div>
                    <div className="h-2 w-full bg-white/10 rounded"></div>
                    <div className="mt-4 p-4 rounded bg-blue-500/10 border border-blue-500/20">
                        <p className="text-blue-300 text-sm font-mono">
                            &gt; Iniciando optimización... <br/>
                            &gt; Reduciendo costos 30%... <br/>
                            &gt; Tarea completada ✅
                        </p>
                    </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}