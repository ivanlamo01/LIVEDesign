"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

type LoadingScreenProps = {
    minDuration?: number;
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ minDuration = 1.8 }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) return 100;
                const increment = Math.random() * 15 + 5;
                return Math.min(prev + increment, 100);
            });
        }, 200);

        const timer = setTimeout(() => {
            setProgress(100);
            setTimeout(() => setIsVisible(false), 300);
        }, minDuration * 1000);

        return () => {
            clearTimeout(timer);
            clearInterval(progressInterval);
        };
    }, [minDuration]);

    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        delay: i * 0.1,
        duration: 3 + Math.random() * 2,
        x: (Math.random() - 0.5) * 300,
        y: (Math.random() - 0.5) * 300,
    }));

    // Calcular el ángulo del progreso para el círculo
    const circumference = 2 * Math.PI * 90; // radio de 90px
    const progressOffset = circumference - (progress / 100) * circumference;

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#050816] via-[#0a0f2e] to-[#050816]"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    {/* Orbes de fondo animados */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            animate={{
                                scale: [1, 1.3, 1],
                                x: [0, 50, 0],
                                y: [0, -30, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 8,
                                ease: "easeInOut",
                            }}
                            className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-purple-600/25 blur-3xl"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.4, 1],
                                x: [0, -60, 0],
                                y: [0, 40, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 10,
                                ease: "easeInOut",
                                delay: 1,
                            }}
                            className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-violet-500/25 blur-3xl"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 12,
                                ease: "linear",
                            }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-purple-500/15 blur-3xl"
                        />
                    </div>

                    {/* Partículas flotantes mejoradas */}
                    <div className="absolute inset-0 overflow-hidden">
                        {particles.map((particle) => (
                            <motion.div
                                key={particle.id}
                                className="absolute top-1/2 left-1/2 h-1.5 w-1.5 rounded-full bg-purple-400/70"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0, 1.5, 0],
                                    x: [0, particle.x],
                                    y: [0, particle.y],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: particle.duration,
                                    delay: particle.delay,
                                    ease: "easeOut",
                                }}
                            />
                        ))}
                    </div>

                    {/* CONTENIDO CENTRAL */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: -10 }}
                        transition={{ type: "spring", stiffness: 150, damping: 18 }}
                        className="relative flex flex-col items-center gap-8 px-4 py-6 sm:px-8"
                    >
                        {/* Logo con animación de entrada */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                                delay: 0.1,
                            }}
                            className="relative"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    ease: "easeInOut",
                                }}
                            >
                                <Image
                                    src="/logo.png"
                                    alt="LIVE Design"
                                    width={100}
                                    height={100}
                                    priority
                                    className="drop-shadow-[0_0_40px_rgba(139,92,246,0.85)]"
                                />
                            </motion.div>

                            {/* Anillo pulsante alrededor del logo */}
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-purple-400/40"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.4, 0, 0.4],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    ease: "easeOut",
                                }}
                            />
                        </motion.div>

                        {/* Nombre / marca */}
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25, duration: 0.5 }}
                            className="flex items-center gap-2.5 text-sm font-semibold tracking-[0.25em] uppercase"
                        >
                            <motion.span
                                animate={{
                                    boxShadow: [
                                        "0 0 18px rgba(168,85,247,0.5)",
                                        "0 0 28px rgba(168,85,247,0.8)",
                                        "0 0 18px rgba(168,85,247,0.5)",
                                    ],
                                }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400 px-3 py-1 text-[0.68rem] text-slate-950 shadow-lg"
                            >
                                LIVE
                            </motion.span>
                            <span className="text-slate-100">Design</span>
                        </motion.div>

                        {/* Círculo de progreso único y elegante */}
                        <div className="relative flex items-center justify-center">
                            {/* SVG para el círculo de progreso */}
                            <svg className="h-52 w-52 -rotate-90 transform">
                                {/* Círculo de fondo */}
                                <circle
                                    cx="104"
                                    cy="104"
                                    r="90"
                                    stroke="rgba(255, 255, 255, 0.08)"
                                    strokeWidth="8"
                                    fill="none"
                                />

                                {/* Círculo de progreso con gradiente */}
                                <defs>
                                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#a855f7" />
                                        <stop offset="50%" stopColor="#c084fc" />
                                        <stop offset="100%" stopColor="#ec4899" />
                                    </linearGradient>
                                </defs>

                                <motion.circle
                                    cx="104"
                                    cy="104"
                                    r="90"
                                    stroke="url(#progressGradient)"
                                    strokeWidth="8"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    initial={{ strokeDashoffset: circumference }}
                                    animate={{ strokeDashoffset: progressOffset }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    style={{
                                        filter: "drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))",
                                    }}
                                />
                            </svg>

                            {/* Contenido central del círculo */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                {/* Porcentaje grande */}
                                <motion.div
                                    key={Math.floor(progress)}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-6xl font-bold bg-gradient-to-br from-purple-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent"
                                >
                                    {Math.floor(progress)}
                                </motion.div>

                                {/* Símbolo de porcentaje */}
                                <motion.div
                                    animate={{ opacity: [0.6, 1, 0.6] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 2,
                                        ease: "easeInOut",
                                    }}
                                    className="text-2xl font-light text-slate-300/80"
                                >
                                    %
                                </motion.div>
                            </div>

                            {/* Brillo central pulsante */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.2, 0.4, 0.2],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    ease: "easeInOut",
                                }}
                                className="absolute inset-[30%] rounded-full bg-gradient-to-br from-purple-400 via-violet-500 to-fuchsia-500 blur-2xl"
                            />
                        </div>

                        {/* Textos descriptivos */}
                        <div className="mt-2 flex flex-col items-center gap-2">
                            <motion.p
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-sm font-medium uppercase tracking-[0.25em] text-slate-300/90"
                            >
                                Inicializando
                            </motion.p>
                            <motion.p
                                className="text-xs text-slate-400/90"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    ease: "easeInOut",
                                }}
                            >
                                Cargando experiencia inteligente
                                <motion.span
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1.5,
                                        ease: "easeInOut",
                                    }}
                                >
                                    …
                                </motion.span>
                            </motion.p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
