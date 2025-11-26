"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { LogOut, User, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logOut } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  return (
    <>
      {/* BARRA SUPERIOR SIEMPRE VISIBLE */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 z-1000 w-full transition-all duration-700 ${scrolled || open
          ? "backdrop-blur-xl bg-black/30"
          : "bg-transparent backdrop-blur-none"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          >
            <Link
              href="/"
              className={`flex items-center space-x-2 group transition-all duration-500 ${open ? "opacity-0 pointer-events-none scale-90" : "opacity-100 scale-100"
                }`}
              onClick={closeMenu}
              aria-hidden={open}
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Image
                  src="/logo.png"
                  alt="LIVE Design logo"
                  width={100}
                  height={100}
                  priority
                  className="drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all duration-300"
                />
              </motion.div>

              <span className="text-slate-100 font-semibold text-sm md:text-base tracking-[0.25em] uppercase group-hover:text-blue-300 transition-colors duration-300">
                Design
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`hidden md:flex items-center gap-8 ${open ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            {[
              { href: "/", label: "Inicio" },
              { href: "/services", label: "Servicios" },
              { href: "/portfolio", label: "Portafolio" },
              { href: "/blog", label: "Blog" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative group py-1"
              >
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-300 tracking-wider uppercase">
                  {link.label}
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 origin-left"
                />
              </Link>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
            className="flex items-center gap-3"
          >
            {/* Auth Section */}
            {!open && (
              <div className="hidden md:block relative ">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
                    >
                      <User className="w-4 h-4" />

                      <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="z-999 absolute right-0 mt-2 w-48 py-2 bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-xl shadow-xl z-50"
                        >
                          <div className="px-4 py-2 border-b border-slate-800 mb-2">
                            <p className="text-xs text-slate-500">Conectado como</p>
                            <p className="text-sm text-slate-300 truncate">{user.email}</p>
                          </div>

                          <Link
                            href="/profile"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <User className="w-4 h-4" />
                            Mi Perfil
                          </Link>

                          <button
                            onClick={() => {
                              logOut();
                              setUserMenuOpen(false);
                            }}
                            className="cursor-pointer w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Cerrar Sesión
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="px-5 py-2 text-sm font-medium text-white bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-full transition-all hover:scale-105 active:scale-95"
                  >
                    Iniciar Sesión
                  </Link>
                )}
              </div>
            )}

            {!open ? (

              <motion.a
                onClick={() => window.dispatchEvent(new Event('start-contact-flow'))}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="hidden border border-blue-500/30 sm:inline-flex relative items-center gap-2 px-5 py-2 text-xs font-semibold rounded-full text-white hover:bg-blue-500/10 hover:border-blue-400/50 transition-all duration-300 shadow-lg shadow-blue-900/20"
              >
                <span>Agendar Consultoría</span>
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="text-[0.65rem] opacity-80"
                >
                  ↗
                </motion.span>

              </motion.a>
            ) : null}

            <motion.button
              onClick={toggleMenu}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative flex h-10 w-10 items-center justify-center group md:hidden"
            >
              <motion.span
                animate={{
                  scale: open ? 1.2 : 1,
                  opacity: open ? 0.2 : 0.1,
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300"
              />

              {/* Línea superior */}
              <motion.span
                animate={{
                  rotate: open ? 45 : 0,
                  y: open ? 0 : -10,
                  scaleX: open ? 1 : 1,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="block absolute h-0.5 w-6 bg-slate-100 origin-center"
              />

              {/* Línea media */}
              <motion.span
                animate={{
                  width: open ? 0 : 16,
                  opacity: open ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="block absolute h-0.5 bg-slate-100"
              />

              {/* Línea inferior */}
              <motion.span
                animate={{
                  rotate: open ? -45 : 0,
                  y: open ? 0 : 10,
                  scaleX: open ? 1 : 1,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="block absolute h-0.5 w-6 bg-slate-100 origin-center"
              />
            </motion.button>
          </motion.div>
        </div>
      </motion.nav>

      {/* OVERLAY FULLSCREEN (DESKTOP + MOBILE) */}
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            key="nav-overlay"
            initial={{ clipPath: "circle(0% at 95% 5%)", opacity: 0 }}
            animate={{ clipPath: "circle(150% at 95% 5%)", opacity: 1 }}
            exit={{ clipPath: "circle(0% at 95% 5%)", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 20,
              opacity: { duration: 0.3 }
            }}
            className="fixed inset-0 z-900"
          >
            {/* Fondo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-3xl"
            >
              {/* Orbes animados */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute -top-32 -left-24 h-60 w-60 rounded-full bg-purple-600/30 blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  x: [0, -40, 0],
                  y: [0, 30, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 10,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="pointer-events-none absolute -bottom-40 -right-28 h-72 w-72 rounded-full bg-cyan-500/30 blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  x: [0, 20, 0],
                  y: [0, -30, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 7,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"
              />
            </motion.div>

            {/* Contenido menú */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-10 px-8">
              <motion.span
                initial={{ opacity: 0, letterSpacing: "0.1em" }}
                animate={{ opacity: 1, letterSpacing: "0.3em" }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xs tracking-[0.3em] uppercase text-slate-300/80"
              >
                Explora
              </motion.span>

              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: 0.1
                }}
                className="w-60"
              >
                <Image
                  src="/logo.png"
                  alt=""
                  width={200}
                  height={200}
                  className="drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
                />
              </motion.div>

              {/* Branding & subtítulo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 15,
                  delay: 0.15
                }}
                className="flex flex-col items-center gap-3"
              >
              </motion.div>

              {/* Links */}
              <motion.ul
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.25,
                      staggerDirection: 1
                    },
                  },
                }}
                className="flex flex-col items-center gap-6 text-center text-lg md:text-2xl font-medium"
              >
                {[
                  { href: "#", label: "Inicio" },
                  { href: "/services", label: "Servicios" },
                  { href: "/portfolio", label: "Portafolio" },
                ].map((item) => (
                  <motion.li
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, x: -30, scale: 0.8 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 15
                        }
                      },
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="relative inline-flex items-center justify-center px-5 py-1 group"
                    >
                      <motion.span
                        whileHover={{ scale: 1.1, letterSpacing: "0.35em" }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="tracking-[0.3em] uppercase text-slate-100 text-sm md:text-base transition-all duration-300 group-hover:text-cyan-300"
                      >
                        {item.label}
                      </motion.span>
                      <motion.span
                        initial={{ width: 0 }}
                        whileHover={{ width: 96 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="absolute -bottom-2 left-1/2 h-0.5 -translate-x-1/2 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]"
                      />
                    </Link>
                  </motion.li>
                ))}

                {/* Mobile Auth Links */}
                {user ? (
                  <>
                    <motion.li
                      variants={{
                        hidden: { opacity: 0, x: -30, scale: 0.8 },
                        visible: { opacity: 1, x: 0, scale: 1 }
                      }}
                    >
                      <Link href="/admin" onClick={closeMenu} className="text-slate-300 hover:text-white">
                        Admin de Usuario
                      </Link>
                    </motion.li>
                    <motion.li
                      variants={{
                        hidden: { opacity: 0, x: -30, scale: 0.8 },
                        visible: { opacity: 1, x: 0, scale: 1 }
                      }}
                    >
                      <button onClick={() => { logOut(); closeMenu(); }} className="text-red-400 hover:text-red-300">
                        Cerrar Sesión
                      </button>
                    </motion.li>
                  </>
                ) : (
                  <motion.li
                    variants={{
                      hidden: { opacity: 0, x: -30, scale: 0.8 },
                      visible: { opacity: 1, x: 0, scale: 1 }
                    }}
                  >
                    <Link href="/login" onClick={closeMenu} className="text-blue-400 hover:text-blue-300">
                      Iniciar Sesión
                    </Link>
                  </motion.li>
                )}
              </motion.ul>

              {/* CTA grande en el overlay */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 15,
                  delay: 0.4
                }}
                className="mt-4"
              >
                <motion.a
                  href="#cta"
                  onClick={closeMenu}
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="relative border border-blue-500/40 inline-flex items-center gap-2 px-7 py-2.5 text-sm md:text-base font-semibold rounded-full text-white shadow-lg shadow-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.9)] transition-shadow duration-300"
                >
                  <span>Agendar Consultoría</span>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
