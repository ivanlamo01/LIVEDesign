"use client";

import Link from "next/link";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-2xl">
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 animate-pulse" />
                        <AlertTriangle className="w-24 h-24 text-indigo-500 relative z-10" />
                    </div>
                </div>

                <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">
                    404
                </h1>

                <h2 className="text-2xl font-bold text-white mb-6">
                    ¿Alucinación de la IA?
                </h2>

                <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                    Parece que la página que buscas no existe en esta realidad.
                    Pudo haber sido movida, eliminada o quizás nunca existió y fue un error en la matrix.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all hover:scale-105 shadow-lg shadow-indigo-500/20"
                    >
                        <Home className="w-4 h-4" />
                        Volver al Inicio
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-semibold hover:bg-slate-800 transition-all hover:border-slate-700"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Regresar
                    </button>
                </div>
            </div>

            {/* Code decoration */}
            <div className="absolute bottom-8 left-0 right-0 text-center opacity-20 font-mono text-xs text-slate-500">
                Error: PAGE_NOT_FOUND_EXCEPTION at /universe/reality/web/livedesign
            </div>
        </div>
    );
}
