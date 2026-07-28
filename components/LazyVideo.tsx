"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Video de fondo que no se descarga hasta que se acerca a pantalla.
 *
 * A diferencia del hero, este vive a mitad de página: si se montara de entrada
 * competiría por ancho de banda con lo que el usuario está viendo, y la mayoría
 * de las visitas desde un anuncio no llegan tan abajo. Con el observador, el
 * archivo sólo se pide cuando de verdad va a verse.
 *
 * Igual que en el hero, con `prefers-reduced-motion` o `save-data` no se monta
 * y queda el póster, que es un fotograma real del mismo video.
 */

interface Props {
  /** Nombre base en /clinica, sin extensión. */
  video: string;
  alt: string;
  className?: string;
  /** Densidad del velo verde sobre el video. */
  veilOpacity?: number;
}

export default function LazyVideo({ video, alt, className = "", veilOpacity = 0.72 }: Props) {
  const [mount, setMount] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reduce || conn?.saveData) return;

    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setMount(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} className={`absolute inset-0 overflow-hidden bg-pine ${className}`}>
      <Image
        src={`/clinica/${video}-poster.jpg`}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover object-center"
        quality={66}
      />

      {mount && (
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
          poster={`/clinica/${video}-poster.jpg`}
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

      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(13, 51, 32, ${veilOpacity})` }}
      />
      <div className="grain absolute inset-0" />
    </div>
  );
}
