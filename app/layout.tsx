import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "LIVE Design | Agencia de Desarrollo & IA",
  description: "Transformamos negocios mediante desarrollo web, automatización e inteligencia artificial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased bg-slate-950 text-slate-50">
        <Navbar />
        <main className="min-h-screen pt-20"> {/* pt-20 para compensar el navbar fijo */}
            {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}