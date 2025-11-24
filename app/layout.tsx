import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import GoogleAnalytics from "./components/GoogleAnalytics";
import JsonLd from "./components/JsonLd";

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "LIVE Design | Agencia de Desarrollo & IA",
  description: "Transformamos negocios mediante desarrollo web, automatización e inteligencia artificial. Expertos en Next.js, n8n y soluciones a medida.",
  keywords: ["Desarrollo Web", "Inteligencia Artificial", "Automatización", "n8n", "Next.js", "Agencia Software", "Argentina","ia","programacion","Paginas Web","chatbot"],
  openGraph: {
    title: "LIVE Design | Agencia de Desarrollo & IA",
    description: "Transformamos negocios mediante desarrollo web, automatización e inteligencia artificial.",
    url: "https://livedesign.app",
    siteName: "LIVE Design",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "LIVE Design - Agencia de Desarrollo & IA",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LIVE Design | Agencia de Desarrollo & IA",
    description: "Transformamos negocios mediante desarrollo web, automatización e inteligencia artificial.",
    images: ["https://livedesign.app/og-image.jpg"], // Placeholder
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${spaceMono.className} antialiased bg-slate-950 text-slate-50`}>
        <GoogleAnalytics />
        <JsonLd />
        <Navbar />
        {children}
        <Chatbot />
        <Footer />
      </body>
    </html>
  );
}