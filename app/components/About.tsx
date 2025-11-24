"use client";

import { CheckCircle2, Users, Trophy, Zap } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { name: 'Proyectos Entregados', value: '+5', icon: Trophy },
  { name: 'Ahorro en Procesos', value: '40%', icon: Zap },
  { name: 'Soporte Técnico', value: '24/7', icon: Users },
];

export default function About() {
  return (
    <section className="relative py-24 bg-slate-950 overflow-hidden" id="nosotros">
      {/* Elemento decorativo de fondo mejorado */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl opacity-30 pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl opacity-20 pointer-events-none animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">

          {/* Columna de Texto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:pr-8 lg:pt-4"
          >
            <div className="lg:max-w-lg">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-base font-semibold leading-7 text-blue-400"
              >
                Sobre Nosotros
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                Más que desarrolladores, somos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">consultores estratégicos</span>.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-6 text-lg leading-8 text-gray-300"
              >
                LIVE Design nació con una meta clara: cerrar la brecha entre la tecnología compleja y los negocios reales.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-base leading-7 text-gray-400"
              >
                Combinamos una sólida base en programación con una visión moderna de automatización. No te vendemos una web y desaparecemos; construimos la infraestructura digital para que tu empresa escale sin dolor.
              </motion.p>

              <motion.ul
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-8 space-y-4"
              >
                {[
                  'Enfoque en resultados medibles (KPIs).',
                  'Arquitectura escalable (Node.js, React, Cloud).',
                  'Integración real de Inteligencia Artificial.'
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex gap-x-3 text-gray-300"
                  >
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-blue-400" aria-hidden="true" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>

          {/* Columna Visual / Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
                    transition: { duration: 0.2 }
                  }}
                  className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all duration-300 group cursor-pointer"
                >
                  <stat.icon className="h-8 w-8 text-blue-400 mb-4 group-hover:scale-110 group-hover:text-blue-300 transition-all duration-300" />
                  <dt className="text-sm font-medium leading-6 text-gray-400 group-hover:text-gray-300 transition-colors">{stat.name}</dt>
                  <dd className="mt-2 text-3xl font-bold tracking-tight text-white">{stat.value}</dd>
                </motion.div>
              ))}

              {/* Carta destacada */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(168, 85, 247, 0.4)",
                  transition: { duration: 0.2 }
                }}
                className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-6 rounded-2xl sm:col-span-1 flex flex-col justify-center text-white shadow-lg shadow-purple-900/30 overflow-hidden group cursor-pointer"
              >
                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                <p className="text-lg font-bold mb-2 relative z-10">¿Listo para innovar?</p>
                <p className="text-sm text-blue-100 mb-4 relative z-10">Tu competencia ya está automatizando. No te quedes atrás.</p>

                {/* Orbe decorativo */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}