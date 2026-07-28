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

/** Cambiar a `true` cuando estén la foto y el número reales. */
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
              <div className="todo-flag flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 p-8 text-center">
                <ShieldCheck className="h-7 w-7" aria-hidden="true" strokeWidth={1.5} />
                <p className="text-[0.8125rem] font-semibold uppercase tracking-wider">
                  Espacio para la resolución SEREMI
                </p>
                <p className="max-w-[42ch] leading-relaxed">
                  [Sube la foto del documento como
                  public/clinica/resolucion-seremi.jpg y cambia TIENE_DOCUMENTO
                  a true en components/Autorizacion.tsx. Foto derecha, bien
                  iluminada, con el número de resolución legible.]
                </p>
              </div>
            )}
            <figcaption className="mono mt-3 text-[0.625rem] uppercase leading-relaxed text-sand/70">
              El documento se exhibe también en el local, como exige la
              normativa
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
