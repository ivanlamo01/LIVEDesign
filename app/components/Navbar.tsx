import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/10 bg-gradient-to-br from-slate-950/90 via-purple-950/90 to-blue-950/90 backdrop-blur-md transition-all duration-300">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse group">
            <span className="self-center text-2xl font-bold whitespace-nowrap text-white">
              LIVE <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400">Design</span>
            </span>
        </Link>

        {/* Botón CTA con efecto Glow */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <a href="#cta" className="text-white bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-lg shadow-blue-500/30 transition-all hover:scale-105">
              Agendar Consultoría
            </a>
        </div>

        {/* Menú de Navegación */}
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <Link href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-400 md:p-0" aria-current="page">Inicio</Link>
            </li>
            <li>
              <Link href="#servicios" className="block py-2 px-3 text-gray-300 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-white md:p-0 transition-colors duration-200">Servicios</Link>
            </li>
            <li>
              <Link href="#proyectos" className="block py-2 px-3 text-gray-300 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-white md:p-0 transition-colors duration-200">Portafolio</Link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}