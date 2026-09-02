import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { clinic } from "@/lib/clinic";

/**
 * Autorización sanitaria y respaldo.
 *
 * Es el sello de confianza que la competencia usa y que a este sitio le
 * faltaba. Pero un sello sólo sirve si es verificable: por eso el bloque está
 * armado para mostrar el NÚMERO de resolución y la foto del documento, no un
 * ícono genérico que diga «certificados».
 *
 * Mientras no lleguen los datos reales, el número y la imagen quedan rotulados
 * como pendientes. Afirmar una autorización sanitaria que no se puede exhibir
 * es un problema legal, no un detalle de copy.
 */

/**
 * Cambiar a `true` cuando llegue la foto del documento real de Ñuble, con su
 * número legible, en `public/clinica/resolucion-seremi.jpg`.
 *
 * Mientras tanto se muestra el logotipo institucional que la clínica facilitó.
 * El emblema es el de la SEREMI de Ñuble, que es la autoridad sanitaria que
 * corresponde. Antes había uno de Región Metropolitana, que nombraba otra
 * región en letras grandes junto a una clínica de Chillán.
 *
 * El emblema dice bajo qué autoridad opera la clínica; el respaldo que alguien
 * puede ir a verificar es la resolución con su número, y eso es lo que va acá
 * cuando llegue la foto del documento.
 */
const TIENE_DOCUMENTO = false;

export default function Autorizacion() {
  return (
    <section className="surface-ink grain section" aria-labelledby="autorizacion-titulo">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <p className="field">Respaldo</p>
            <h2 id="autorizacion-titulo" className="mt-6 text-display-md text-paper">
              Autorización sanitaria a la vista
            </h2>
            <p className="mt-5 max-w-prose text-[1.0625rem] leading-relaxed text-sand">
              En estética, cualquiera puede decir que está certificado. Por eso
              publicamos el documento y su número: para que puedas verificarlo
              tú, y no tengas que creernos.
            </p>

            <dl className="mt-8 border-t border-sand/25">
              {[
                ["Resolución SEREMI de Salud", "[REEMPLAZAR con nº y fecha]"],
                ["Región", clinic.address.region],
                ["Equipos láser", "[REEMPLAZAR con registro de los equipos]"],
                ["Dirección técnica", "[REEMPLAZAR con nombre y nº de registro]"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-sand/25 py-3.5"
                >
                  <dt className="mono text-[0.6875rem] uppercase tracking-wider text-sand/70">
                    {k}
                  </dt>
                  <dd
                    className={
                      v.startsWith("[")
                        ? "mono text-[0.6875rem] text-[#e2b9c6]"
                        : "text-[0.9375rem] font-medium text-paper"
                    }
                  >
                    {v}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 flex items-start gap-2.5 text-[0.875rem] leading-relaxed text-sand">
              <ShieldCheck
                className="mt-0.5 h-4 w-4 shrink-0 text-sage"
                aria-hidden="true"
                strokeWidth={2}
              />
              Todo procedimiento se realiza bajo evaluación médica y con
              respaldo de enfermería titulada.
            </p>
          </div>

          {/* Espacio del documento. */}
          <figure className="m-0">
            {TIENE_DOCUMENTO ? (
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-sand/30 bg-sand">
                <Image
                  src="/clinica/resolucion-seremi.jpg"
                  alt="Resolución de autorización sanitaria emitida por la SEREMI de Salud"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                  quality={78}
                />
              </div>
            ) : (
              /* Logotipo institucional mientras no esté la resolución. Va
                 centrado sobre papel y en tamaño contenido: es una referencia
                 visual, no un sello de respaldo, y agrandarlo sugeriría lo
                 segundo. */
              <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-6 border border-sand/30 bg-paper p-8 text-center">
                <Image
                  src="/clinica/seremi-nuble.webp"
                  alt="SEREMI de Salud Región de Ñuble · Ministerio de Salud"
                  width={220}
                  height={204}
                  sizes="(min-width: 1024px) 220px, 40vw"
                  className="h-auto w-[clamp(9rem,18vw,13.75rem)]"
                  quality={88}
                />
                <div className="max-w-[34ch]">
                  <p className="text-[0.9375rem] font-semibold leading-snug text-pine">
                    Establecimiento con autorización sanitaria
                  </p>
                  <p className="mono mt-2.5 text-label-sm uppercase leading-relaxed text-olive-deep">
                    Resolución exhibida en el local
                  </p>
                </div>
              </div>
            )}
            <figcaption className="mt-3 text-[0.8125rem] leading-relaxed text-sand">
              [PENDIENTE: foto de la resolución de Ñuble con su número legible,
              como public/clinica/resolucion-seremi.jpg]
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
