import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative isolate px-6 pt-14 lg:px-8 overflow-hidden">
            
            {/* Efecto de luz de fondo (Glow superior) */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" 
                     style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} 
                />
            </div>

            <div className="mx-auto max-w-2xl py-24 sm:py-32 lg:py-40 text-center relative">
                
                {/* Badge "Nuevo" o "Disponible" */}
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-blue-400/50 transition-all cursor-pointer">
                        Potenciamos tu negocio con Inteligencia Artificial. <span className="font-semibold text-blue-400"><span className="absolute inset-0" aria-hidden="true"></span>Ver cómo</span>
                    </div>
                </div>
                
                {/* Título Principal */}
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                    Diseño Web & <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 animate-gradient">
                        Automatización Inteligente
                    </span>
                </h1>
                
                <p className="mt-6 text-lg leading-8 text-gray-300 max-w-xl mx-auto">
                    Transformamos procesos manuales en sistemas digitales eficientes. Desde webs de alto impacto hasta agentes de IA que trabajan por ti.
                </p>
                
                {/* Botones */}
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link href="#" className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 hover:scale-105 transition-all flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Ver Soluciones
                    </Link>
                    <Link href="#" className="text-sm font-semibold leading-6 text-white hover:text-blue-300 transition-colors flex items-center gap-1 group">
                        Agendar llamada <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>

            {/* Efecto de luz de fondo (Glow inferior) */}
            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
                <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#06b6d4] to-[#3b82f6] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" 
                     style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} 
                />
            </div>
        </section>
    );
}