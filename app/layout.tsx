import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import "./premium-effects.css";
import { Toaster } from "@/components/ui/toaster";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import Analytics, { GTMNoScript } from "@/components/Analytics";
import { clinic } from "@/lib/clinic";

/**
 * Tres familias con roles que no se solapan.
 *
 * - Bricolage Grotesque para el display. Es una grotesca con irregularidades
 *   intencionales, así que a 8rem tiene carácter propio. Se descartó una serif
 *   de alto contraste a propósito: serif elegante sobre fondo crema es el
 *   cliché exacto que había que evitar.
 * - IBM Plex Mono para etiquetas, códigos y cifras. Es la pieza que hace que
 *   el conjunto lea como instrumento clínico y no como folleto de spa.
 * - Inter para el cuerpo, porque la legibilidad a 15–17px en celular es lo que
 *   decide si se entiende el tratamiento.
 *
 * Un solo peso en display y mono: se usan en pocas palabras, y el rango
 * variable completo costaba KB que el LCP no tiene para gastar.
 */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["700"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["500"],
});

const body = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://larrere.cl";

const description =
  "Clínica de estética con enfoque clínico en Chillán. Láser para rosácea y lesiones vasculares, acné, PRP facial y capilar. Evaluación médica previa a todo tratamiento.";

export const metadata: Metadata = {
  // Sin metadataBase, las URLs relativas de Open Graph quedan sin resolver.
  metadataBase: new URL(siteUrl),
  title: {
    default: "LARRÈRE — Clínica de estética con enfoque clínico en Chillán",
    template: "%s · LARRÈRE",
  },
  description,
  // La metadata anterior vendía "belleza, bienestar, spa": posicionamiento
  // opuesto al real y SEO apuntado a la competencia equivocada.
  keywords: [
    "clínica estética Chillán",
    "láser rosácea Chillán",
    "tratamiento acné Chillán",
    "PRP capilar Chillán",
    "láser vascular",
    "arañitas vasculares",
    "onicomicosis láser",
    "estética médica Ñuble",
  ],
  authors: [{ name: clinic.legalName }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "LARRÈRE — Clínica de estética con enfoque clínico",
    description,
    type: "website",
    locale: "es_CL",
    siteName: clinic.name,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "LARRÈRE — Clínica de estética con enfoque clínico",
    description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#0D3320",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-CL"
      className={`${display.variable} ${mono.variable} ${body.variable}`}
    >
      <head>
        <LocalBusinessSchema />
      </head>
      <body className="font-sans">
        <GTMNoScript />
        {/* Primer tabulador de la página: el sitio es largo en mobile. */}
        <a
          href="#contenido"
          className="sr-only-focusable absolute left-4 top-4 z-[60] bg-pine px-4 py-2 text-sm font-semibold text-paper"
        >
          Saltar al contenido
        </a>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
