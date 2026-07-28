"use client";

import { useId, useRef, useState } from "react";
import { trackBeforeAfter } from "@/lib/analytics";

/**
 * Comparador antes/después. Es EL elemento del sitio.
 *
 * Decisiones que importan:
 *
 * 1. El control es un `<input type="range">` real, transparente y estirado
 *    sobre toda la imagen. Así el arrastre, el touch, las flechas del teclado,
 *    Home/End y el anuncio como slider en lectores de pantalla los da el
 *    navegador. Reescribir eso a mano sale peor y pesa más.
 *
 * 2. La posición vive en una custom property (`--pos`) y se aplica con
 *    `clip-path`. Se compone en GPU: arrastrar no dispara layout.
 *
 * 3. Sin JS la imagen queda partida al 50% — un estado legítimo y legible, no
 *    una caja vacía.
 *
 * 4. `aspect-ratio` + dimensiones explícitas ⇒ CLS 0, sin importar cuándo
 *    lleguen las fotos.
 *
 * 5. No hay autoplay ni animación de entrada: lo mueve la persona. Por eso no
 *    necesita apagarse con `prefers-reduced-motion`.
 */

export interface BeforeAfterCase {
  id: string;
  /** Qué se trató. Nunca una promesa de resultado. */
  label: string;
  treatment: string;
  /** Nota clínica honesta: nº de sesiones, tiempo transcurrido. */
  note?: string;
  beforeSrc?: string;
  afterSrc?: string;
  /** Descripción para lectores de pantalla. */
  alt?: string;
}

interface Props {
  data: BeforeAfterCase;
  /** Proporción del marco. Retrato para rostro, que es el caso normal. */
  ratio?: string;
  /** Invierte el color del pie para fondos oscuros. */
  onDark?: boolean;
}

export default function BeforeAfter({ data, ratio = "4 / 5", onDark = false }: Props) {
  // Colores del pie según el fondo. Medidos: porcelain sobre drape-deep da
  // 10.61:1, y porcelain/70 sigue sobre 6:1.
  const cap = onDark
    ? { title: "text-paper", body: "text-sand", hint: "text-sand/80" }
    : { title: "text-pine", body: "text-ink", hint: "text-ink" };
  const [pos, setPos] = useState(50);
  const reported = useRef(false);
  const labelId = useId();

  const hasImages = Boolean(data.beforeSrc && data.afterSrc);

  function handleChange(value: number) {
    setPos(value);
    // Un solo evento por caso: interesa saber que interactuó, no cada píxel.
    if (!reported.current) {
      reported.current = true;
      trackBeforeAfter(data.id);
    }
  }

  return (
    <figure className="m-0">
      <div
        className="group relative w-full select-none overflow-hidden border border-rule bg-sand"
        style={{ aspectRatio: ratio, ["--pos" as string]: `${pos}%` }}
      >
        {/* ---- ANTES (capa de fondo) ---- */}
        <div className="absolute inset-0">
          {hasImages ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.beforeSrc}
              alt={data.alt ? `Antes: ${data.alt}` : `Antes del tratamiento de ${data.treatment}`}
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : (
            <PlaceholderPane side="antes" />
          )}
        </div>

        {/* ---- DESPUÉS (recortada según --pos) ---- */}
        <div
          className="absolute inset-0"
          style={{ clipPath: "inset(0 calc(100% - var(--pos)) 0 0)" }}
        >
          {hasImages ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.afterSrc}
              alt={data.alt ? `Después: ${data.alt}` : `Después del tratamiento de ${data.treatment}`}
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : (
            <PlaceholderPane side="después" />
          )}
        </div>

        {/* ---- Etiquetas ---- */}
        <span className="mono pointer-events-none absolute left-0 top-0 bg-pine px-2 py-1 text-[0.625rem] uppercase tracking-widest text-paper">
          Antes
        </span>
        <span className="mono pointer-events-none absolute right-0 top-0 bg-pine px-2 py-1 text-[0.625rem] uppercase tracking-widest text-paper">
          Después
        </span>

        {/* ---- Input real: transparente, cubre todo, aporta el teclado ---- */}
        <input
          type="range"
          min={0}
          max={100}
          step={0.1}
          value={pos}
          onChange={(e) => handleChange(Number(e.target.value))}
          aria-labelledby={labelId}
          aria-valuetext={`${Math.round(pos)}% del después visible`}
          className="ba-range peer absolute inset-0 z-20 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
        />

        {/* ---- Divisor + manija (sólo visual) ---- */}
        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-px -translate-x-1/2 bg-pine"
          style={{ left: "var(--pos)" }}
        />
        <div
          className="pointer-events-none absolute top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-pine bg-paper transition-transform duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-plum peer-focus-visible:ring-offset-2 peer-active:scale-95"
          style={{ left: "var(--pos)" }}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-pine" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M9 6 4 12l5 6M15 6l5 6-5 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <figcaption className="mt-3">
        <p id={labelId} className={`text-[0.9375rem] font-semibold ${cap.title}`}>
          {data.label}
        </p>
        <p className={`mt-0.5 text-sm ${cap.body}`}>{data.treatment}</p>
        {data.note && <p className={`mt-1.5 text-[0.8125rem] ${cap.body}`}>{data.note}</p>}
        {!hasImages && (
          <p className="todo-flag mt-2.5 px-2.5 py-1.5">
            [REEMPLAZAR con fotos reales — requiere consentimiento firmado]
          </p>
        )}
        <p className={`mono mt-2.5 text-[0.625rem] uppercase leading-relaxed ${cap.hint}`}>
          Arrastra o usa las flechas · Los resultados varían según cada persona
        </p>
      </figcaption>
    </figure>
  );
}

/**
 * Marco de reemplazo mientras no hay fotos. Se dibuja en SVG para no depender
 * de ningún archivo y para que se lea inequívocamente como pendiente.
 */
function PlaceholderPane({ side }: { side: "antes" | "después" }) {
  const isAfter = side === "después";
  return (
    <div
      className={`flex h-full w-full items-center justify-center ${
        isAfter ? "bg-tone-2" : "bg-sand-deep"
      }`}
    >
      {/* Retícula de encuadre, en clave de plantilla fotográfica clínica: las
          fotos de un caso tienen que estar tomadas en el mismo eje. */}
      <svg
        viewBox="0 0 200 250"
        className="h-full w-full opacity-40"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id={`g-${side}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0v20" fill="none" stroke="#8A7860" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="200" height="250" fill={`url(#g-${side})`} />
        {/* Ejes de encuadre. */}
        <line x1="100" y1="0" x2="100" y2="250" stroke="#8A7860" strokeWidth="0.75" strokeDasharray="4 4" />
        <line x1="0" y1="115" x2="200" y2="115" stroke="#8A7860" strokeWidth="0.75" strokeDasharray="4 4" />
        <ellipse cx="100" cy="115" rx="50" ry="64" fill="none" stroke="#5C4A3D" strokeWidth="1.25" />
      </svg>
    </div>
  );
}
