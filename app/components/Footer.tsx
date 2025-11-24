"use client";

import { Github, Linkedin, Twitter, Mail, ArrowRight, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { subscribeToNewsletter } from "../lib/actions";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage("");

    const result = await subscribeToNewsletter(email);

    if (result.success) {
      setStatus('success');
      setMessage(result.message || "¡Gracias por suscribirte!");
      setEmail("");
    } else {
      setStatus('error');
      setMessage("Hubo un error. Intenta nuevamente.");
    }
  };

  return (
    <footer className="relative mt-20 border-t border-slate-800 bg-slate-950 pt-16 pb-8">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-indigo-900/10 blur-3xl" />
        <div className="absolute top-[10%] right-[0%] h-[400px] w-[400px] rounded-full bg-purple-900/10 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-screen-xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Columna 1: Marca */}
          <div className="space-y-6">
            <a href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600" />
              <span className="text-2xl font-bold text-slate-100">
                LIVE <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Design</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed text-slate-400">
              Transformamos ideas complejas en experiencias digitales excepcionales. Desarrollo web, automatización e IA para el futuro de tu negocio.
            </p>
            <div className="flex gap-4">
              <SocialLink href="https://github.com/lived3sign" icon={<Github size={20} />} label="GitHub" />
              <SocialLink href="#" icon={<Linkedin size={20} />} label="LinkedIn" />
              <SocialLink href="#" icon={<Twitter size={20} />} label="Twitter" />
            </div>
          </div>

          {/* Columna 2: Servicios */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-slate-100">Servicios</h3>
            <ul className="space-y-4">
              <FooterLink href="/services#web">Desarrollo Web</FooterLink>
              <FooterLink href="/services#automation-ia">Agentes de IA</FooterLink>
              <FooterLink href="/services#design">Diseño UX/UI</FooterLink>
              <FooterLink href="/services#consulting">Consultoría Tech</FooterLink>
            </ul>
          </div>

          {/* Columna 3: Compañía */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-slate-100">Compañía</h3>
            <ul className="space-y-4">
              <FooterLink href="/about">Sobre Nosotros</FooterLink>
              <FooterLink href="/portfolio">Portafolio</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/careers">Carreras</FooterLink>
              <FooterLink href="/contact">Contacto</FooterLink>
            </ul>
          </div>

          {/* Columna 4: Newsletter */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-slate-100">Newsletter</h3>
            <p className="mb-4 text-sm text-slate-400">
              Suscríbete para recibir las últimas novedades en tecnología y diseño.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/50 px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all disabled:opacity-50"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className={`group flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white transition-all active:scale-95 ${status === 'success'
                    ? 'bg-emerald-600 hover:bg-emerald-500'
                    : 'bg-indigo-600 hover:bg-indigo-500'
                  } disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Suscribiendo...
                  </>
                ) : status === 'success' ? (
                  <>
                    <Check size={16} />
                    ¡Suscrito!
                  </>
                ) : (
                  <>
                    Suscribirse
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
              {message && (
                <p className={`text-xs ${status === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-slate-500">
              © 2024 LIVE Design™. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-indigo-400 transition-colors">Privacidad</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Términos</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/50 text-slate-400 transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-400"
      aria-label={label}
      target="_blank"
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a
        href={href}
        className="group flex items-center text-sm text-slate-400 transition-colors hover:text-indigo-400"
      >
        <span className="relative overflow-hidden">
          {children}
          <span className="absolute bottom-0 left-0 h-px w-full -translate-x-full bg-indigo-400 transition-transform duration-300 group-hover:translate-x-0" />
        </span>
      </a>
    </li>
  );
}