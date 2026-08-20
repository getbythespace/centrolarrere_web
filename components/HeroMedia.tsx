"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Fondo a sangre completa: póster primero, video después.
 *
 * Los sitios de referencia no ponen la foto en un marco al lado del texto — la
 * ponen DETRÁS, ocupando todo, con el titular encima. Ese es el cambio que
 * separa una landing cinematográfica de una ficha impresa.
 *
 * EL PUNTO CRÍTICO ES CUÁNDO ENTRA EL VIDEO.
 *
 * Con el `<video autoPlay>` en el HTML inicial, el navegador descarga el
 * archivo en paralelo con todo lo demás: el LCP de la home subió a 4,1s y la
 * página pesó 1,5 MB. Montándolo recién después de la hidratación, el póster
 * —que ya va optimizado y con `priority`— es el elemento LCP, y el video entra
 * cuando la página ya es usable. Se ve igual y cuesta la mitad.
 *
 * Además no se monta nunca si el usuario pidió menos movimiento o tiene ahorro
 * de datos activo: un fondo en bucle es justo lo que estorba en ese caso, y en
 * el otro es 1 MB de datos móviles que nadie autorizó.
 */

interface Props {
  /** Nombre base en /clinica, sin extensión. Busca .webm, .mp4 y -poster.jpg */
  video?: string;
  /** Imagen de respaldo si no hay video. */
  posterSrc?: string;
  alt: string;
  priority?: boolean;
  veil?: "medio" | "fuerte";
  /** Familia de velo: verde de marca (v1) o neutro oscuro (v2). */
  tone?: "pino" | "neutro" | "marron";
}

/* Dos familias de velo: el verde pino de la v1 y el neutro casi-negro de la
   v2. El velo tiñe toda la imagen, así que usar el verde en una página negra
   dejaba el hero de otro color que el resto del sitio. */
const VEILS = {
  pino: {
    medio:
      "linear-gradient(180deg, rgba(13,51,32,0.55) 0%, rgba(13,51,32,0.38) 40%, rgba(13,51,32,0.72) 100%)",
    fuerte:
      "linear-gradient(180deg, rgba(13,51,32,0.78) 0%, rgba(13,51,32,0.62) 38%, rgba(13,51,32,0.92) 100%)",
  },
  // El velo "neutro" es el de /v2 y usa el mismo taupe que la superficie
  // (--void #2E2822). Antes era negro puro, que era justo lo que había que
  // dejar atrás: el video quedaba apagado y el corte contra la sección de
  // abajo se notaba.
  neutro: {
    medio:
      "linear-gradient(180deg, rgba(46,40,34,0.58) 0%, rgba(46,40,34,0.40) 42%, rgba(46,40,34,0.78) 100%)",
    fuerte:
      "linear-gradient(180deg, rgba(46,40,34,0.80) 0%, rgba(46,40,34,0.66) 38%, rgba(46,40,34,0.93) 100%)",
  },
  // Para la sección de cierre, que corre sobre superficie marrón: con el velo
  // taupe el video cortaba contra el fondo en vez de fundirse con él.
  marron: {
    medio:
      "linear-gradient(180deg, rgba(87,64,44,0.58) 0%, rgba(87,64,44,0.40) 42%, rgba(87,64,44,0.78) 100%)",
    fuerte:
      "linear-gradient(180deg, rgba(87,64,44,0.82) 0%, rgba(87,64,44,0.68) 38%, rgba(87,64,44,0.94) 100%)",
  },
} as const;

export default function HeroMedia({
  video,
  posterSrc,
  alt,
  priority = false,
  veil = "fuerte",
  tone = "pino",
}: Props) {
  const [showVideo, setShowVideo] = useState(false);
  const poster = video ? `/clinica/${video}-poster.jpg` : posterSrc!;

  useEffect(() => {
    if (!video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reduce || conn?.saveData) return;

    // En el primer hueco libre después de pintar. `requestIdleCallback` no
    // existe en Safari, de ahí el respaldo por timeout.
    //
    // Se probó atarlo al evento `load` para sacar el video por completo de la
    // ventana del LCP: midió peor (81 contra 85) y la diferencia cae dentro de
    // la varianza de ±4 puntos entre corridas, así que no había señal. Queda la
    // versión simple.
    const idle =
      (window as Window & { requestIdleCallback?: (cb: () => void) => number })
        .requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 700));
    const id = idle(() => setShowVideo(true));
    return () => clearTimeout(id as number);
  }, [video]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${tone === "neutro" ? "bg-[#0F0D0C]" : "bg-pine"}`}>
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority={priority}
        quality={68}
      />

      {video && showVideo && (
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={`/clinica/${video}.webm`} type="video/webm" />
          <source src={`/clinica/${video}.mp4`} type="video/mp4" />
        </video>
      )}

      {/* El velo no es decorativo: sin él, el contraste del titular dependería
          del fotograma que esté pasando, que es lo único que no se puede
          garantizar en un video. */}
      <div className="absolute inset-0" style={{ background: VEILS[tone][veil] }} />
      <div className="grain absolute inset-0" />
    </div>
  );
}
