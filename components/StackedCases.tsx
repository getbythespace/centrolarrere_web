import BeforeAfter from "./BeforeAfter";
import WhatsAppCTA from "./WhatsAppCTA";
import type { BeforeAfterCase } from "./BeforeAfter";

/**
 * Casos en tarjetas que se apilan como una baraja: cada una queda pegada arriba
 * mientras la siguiente sube por debajo, y la que va quedando atrás se encoge.
 *
 * Adaptado del patrón de «project cards» de los portafolios de motion, pero con
 * dos cambios que lo hacen apto acá:
 *
 * - El apilado lo hace `position: sticky`. La escala es un extra por
 *   scroll-timeline; si no corre, las tarjetas simplemente se apilan. El
 *   contenido nunca depende de la animación.
 * - En mobile se desactiva. Una tarjeta pegada de 78vh en un celular deja al
 *   usuario raspando la pantalla para avanzar, y el tráfico acá es casi todo
 *   móvil.
 *
 * La grilla interna es asimétrica —comparador grande a un lado, dos marcos
 * apilados al otro— para que la tarjeta tenga composición y no sea una foto
 * centrada.
 */

interface Props {
  cases: BeforeAfterCase[];
}

export default function StackedCases({ cases }: Props) {
  return (
    <div className="mt-12">
      {cases.map((c, i) => (
        <div key={c.id} className="stack__slot">
          <article
            className="stack__card border border-rule bg-paper p-5 md:p-7"
            // Cada tarjeta se posa unos píxeles más abajo que la anterior, así
            // se ve el canto de las de atrás.
            style={{ top: `calc(5.5rem + ${i * 14}px)` }}
          >
            {/* --- Cabecera de ficha --- */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-rule pb-5">
              <div className="flex items-start gap-5 md:gap-7">
                <span className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-none text-pine">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-1">
                  <p className="mono text-label uppercase text-ink">
                    {c.treatment}
                  </p>
                  <h3 className="mt-2 text-[clamp(1.125rem,2.4vw,1.75rem)] font-semibold leading-tight text-pine">
                    {c.label}
                  </h3>
                </div>
              </div>

              <WhatsAppCTA
                context={{ kind: "treatment", treatment: c.treatment }}
                variant="quiet"
                size="sm"
                className="shrink-0"
              >
                Consultar este caso
              </WhatsAppCTA>
            </div>

            {/* --- Grilla asimétrica --- */}
            <div className="mt-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)]">
              {/* El comparador manda: es el contenido real. */}
              <BeforeAfter data={c} ratio="16 / 11" />

              {/* Columna de apoyo: detalle clínico y espacios de registro. */}
              <div className="flex flex-col gap-4">
                <dl className="border border-rule">
                  {[
                    ["Tratamiento", c.treatment],
                    ["Sesiones", "[REEMPLAZAR]"],
                    ["Fototipo", "[REEMPLAZAR]"],
                  ].map(([k, val], idx) => (
                    <div
                      key={k}
                      className={`flex items-baseline justify-between gap-4 px-4 py-3 ${
                        idx > 0 ? "border-t border-rule/50" : ""
                      }`}
                    >
                      <dt className="mono text-[0.625rem] uppercase text-ink">{k}</dt>
                      <dd className="text-right text-[0.8125rem] font-medium text-pine">
                        {val}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* Marco de detalle: el segundo encuadre del caso. */}
                <div className="todo-flag flex flex-1 items-center justify-center p-4 text-center">
                  [REEMPLAZAR con foto de detalle del mismo caso — mismo eje y
                  misma luz que el par principal]
                </div>
              </div>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}
