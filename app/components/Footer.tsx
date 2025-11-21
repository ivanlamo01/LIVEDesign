import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10 bg-gradient-to-br from-slate-950 via-purple-950 to-blue-950">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-12 lg:py-16">
        <div className="md:flex md:justify-between">
          
          {/* Columna Marca */}
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <span className="self-center text-2xl font-bold whitespace-nowrap text-white">
                LIVE <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Design</span>
              </span>
            </a>
            <p className="mt-4 text-gray-400 max-w-xs text-sm">
                Transformamos ideas complejas en productos digitales simples y escalables.
            </p>
          </div>

          {/* Columna Links Rápidos */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase tracking-wider">Recursos</h2>
              <ul className="text-gray-400 font-medium text-sm space-y-3">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Tecnologías</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Metodología</a></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase tracking-wider">Legal</h2>
              <ul className="text-gray-400 font-medium text-sm space-y-3">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Términos</a></li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-8 border-white/10 sm:mx-auto lg:my-8" />

        {/* Parte inferior: Copyright + Redes */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
             © 2024 <a href="/" className="hover:underline text-gray-300">LIVE Design™</a>. All Rights Reserved.
          </span>
          
          <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-5">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub account</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn account</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
                <span className="sr-only">Contact</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}