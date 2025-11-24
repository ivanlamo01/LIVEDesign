"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Hero3D from "./Hero3D";

export default function Hero() {
    return (
        <section className="relative isolate px-6 pt-14 lg:px-8 overflow-hidden">
            {/* Animación 3D de fondo */}
            <Hero3D />

            {/* Efecto de luz de fondo superior mejorado con animación pulse */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 animate-pulse-slow" aria-hidden="true">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] via-[#b088fc] to-[#9089fc] opacity-25 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
                />
            </div>

            {/* Grid pattern de fondo sutil */}
            <div className="absolute inset-0 -z-10 opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                    backgroundSize: '64px 64px'
                }}
            />

            <div className="mx-auto max-w-2xl py-24 sm:py-32 lg:py-40 text-center relative z-10">

                {/* Badge mejorado con efecto float y mejor hover */}
                <div className="hidden sm:mb-8 sm:flex sm:justify-center animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
                    <div className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-gray-300 bg-white/5 backdrop-blur-sm ring-1 ring-white/10 hover:ring-blue-400/50 hover:bg-white/10 transition-all duration-300 cursor-pointer animate-float group">
                        <span className="flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                            Potenciamos tu negocio con Inteligencia Artificial.
                            <span className="font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">Ver cómo →</span>
                        </span>
                    </div>
                </div>

                {/* Título Principal mejorado con mejor efecto gradient */}
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-snug animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
                    <span className="block">Diseño Web &amp;</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 animate-gradient drop-shadow-[0_0_30px_rgba(147,51,234,0.3)]">
                        Automatización Inteligente
                    </span>
                </h1>

                {/* Descripción mejorada */}
                <p className="mt-8 text-lg sm:text-xl leading-8 text-gray-300 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
                    Transformamos procesos manuales en sistemas digitales eficientes. Desde webs de alto impacto hasta agentes de IA que trabajan por ti.
                </p>

                {/* Botones mejorados con efectos premium */}
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6 animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
                    <Link href="/services" className="group relative rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 overflow-hidden">
                        {/* Efecto de brillo en hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        <Sparkles className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform" />
                        <span className="relative z-20">Ver Soluciones</span>
                    </Link>
                    <button
                        onClick={() => window.dispatchEvent(new Event('start-contact-flow'))}
                        className="z-500 group text-sm font-semibold leading-6 text-gray-200 hover:text-white transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/5 cursor-pointer"
                    >
                        Agendar llamada
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:scale-110" />
                    </button>
                </div>
            </div>

            {/* Efecto de luz de fondo inferior mejorado */}
            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)] animate-pulse-slow" aria-hidden="true" style={{ animationDelay: '2s' }}>
                <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#06b6d4] via-[#3b82f6] to-[#6366f1] opacity-25 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
                />
            </div>

            {/* Efecto adicional de resplandor central */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow" style={{ animationDelay: '1s' }} />
        </section>
    );
}