import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import "./premium-effects.css";
import { Toaster } from "@/components/ui/toaster";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import Analytics, { GTMNoScript } from "@/components/Analytics";
import { clinic } from "@/lib/clinic";

/**
 * Dos familias, dos requests.
 *
 * Fraunces es variable: un archivo cubre todo el rango de peso del display, así
 * que sale más barato que dos cortes estáticos. `display: "swap"` en las dos —
 * el texto se lee de inmediato con la fuente del sistema y luego cambia, que es
 * lo correcto cuando el LCP es un titular.
 *
 * Sólo subset latin. `latin-ext` agrega glifos que el español de Chile no usa.
 *
 * Sobre los ejes: la primera versión pedía SOFT, WONK y opsz. Se veía algo
 * mejor y costaba 118 KB — el archivo se llevaba solo el presupuesto de LCP y
 * bajó Performance de 96 a 87. Se quedan fuera.
 *
 * Sí se conserva el eje de peso completo (variable, un archivo): la jerarquía
 * del display depende de poder contrastar un 300 fino contra un 700 macizo, y
 * con un solo peso todo terminaba resolviéndose por tamaño.
 */
const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
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
  themeColor: "#0E5C63",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CL" className={`${display.variable} ${body.variable}`}>
      <head>
        <LocalBusinessSchema />
      </head>
      <body className="font-sans">
        <GTMNoScript />
        {/* Primer tabulador de la página: el sitio es largo en mobile. */}
        <a
          href="#contenido"
          className="sr-only-focusable absolute left-4 top-4 z-[60] rounded-md bg-drape px-4 py-2 text-sm font-semibold text-porcelain"
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
