import { Archivo, Instrument_Serif } from "next/font/google";
import "./v2.css";

/**
 * Envoltorio del sitio.
 *
 * Va en un grupo de rutas —los paréntesis no entran en la URL— para que las
 * páginas legales queden fuera: usan la hoja anterior y meterlas dentro de
 * `.v2` les cambiaría el fondo y la tinta.
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

export default function SitioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`v2 ${display.variable} ${serif.variable}`}>{children}</div>
  );
}
