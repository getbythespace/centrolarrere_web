import type { Metadata } from "next";
import { Archivo, Instrument_Serif } from "next/font/google";
import "./v2.css";

/**
 * Layout propio para la v2.
 *
 * Vive en su propia ruta con sus propias fuentes y su propio CSS para poder
 * comparar las dos estéticas lado a lado sin que una contamine a la otra.
 *
 * Dos familias, como las referencias premiadas —House of Honey usa una grotesca
 * gorda contra una serif de alto contraste, y Neue Montreal usa una sola en
 * todos los tamaños—. Acá:
 * - Archivo variable: cubre el wordmark en 900 y el cuerpo en 400 con un solo
 *   archivo.
 * - Instrument Serif en cursiva: sólo para el corte delicado dentro del
 *   wordmark y los acentos. Es el gesto que evita que sea "otra grotesca más".
 */
const display = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-v2-display",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: "italic",
  variable: "--font-v2-serif",
});

export const metadata: Metadata = {
  title: "LARRÈRE — Escala viva",
  description:
    "Propuesta visual alternativa. Clínica de estética con enfoque clínico en Chillán.",
  robots: { index: false, follow: false },
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`v2 ${display.variable} ${serif.variable}`}
      style={{ ["--font-v2-sans" as string]: "var(--font-v2-display)" }}
    >
      {children}
    </div>
  );
}
