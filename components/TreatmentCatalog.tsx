"use client";

import { useMemo, useState } from "react";
import { AlertCircle, CalendarClock } from "lucide-react";
import WhatsAppCTA from "./WhatsAppCTA";
import { categories, treatments, type Category } from "@/lib/treatments";
import { clp } from "@/lib/clinic";

/**
 * Catálogo filtrable.
 *
 * Estructura de precio igual a la competencia (normal tachado + oferta), pero
 * sólo se dibuja cuando el precio existe de verdad. Con `price: null` la
 * tarjeta muestra "Valor según evaluación" y empuja a WhatsApp, que es honesto
 * y además convierte: la consulta por precio abre la conversación.
 */
export default function TreatmentCatalog() {
  const [active, setActive] = useState<Category | "Todos">("Todos");

  const shown = useMemo(
    () => (active === "Todos" ? treatments : treatments.filter((t) => t.category === active)),
    [active]
  );

  return (
    <section className="section" aria-labelledby="catalogo-titulo">
      <div className="shell">
        <h2 id="catalogo-titulo" className="sr-only">
          Catálogo de tratamientos
        </h2>

        {/* Filtros como banda contigua de pestañas, no como píldoras flotando:
            comparten filete igual que las celdas de una tabla. */}
        <div
          role="tablist"
          aria-label="Filtrar por categoría"
          className="flex flex-wrap border-l border-t border-rule"
        >
          {categories.map((cat) => {
            const selected = active === cat;
            return (
              <button
                key={cat}
                role="tab"
                type="button"
                aria-selected={selected}
                onClick={() => setActive(cat)}
                className={`mono min-h-[44px] flex-1 whitespace-nowrap border-b border-r border-rule px-4 py-2.5 text-label uppercase transition-colors ${
                  selected
                    ? "bg-espresso text-paper"
                    : "bg-paper text-ink hover:bg-sand hover:text-espresso"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="mono mt-4 text-label uppercase text-ink">
          {shown.length} {shown.length === 1 ? "tratamiento" : "tratamientos"}
          {active !== "Todos" && ` · ${active}`}
        </p>

        {/* Grilla sin gap: filete compartido. */}
        <ul className="mt-6 grid border-l border-t border-rule md:grid-cols-2 lg:grid-cols-3">
          {shown.map((t, i) => (
            <li key={t.id} className="border-b border-r border-rule">
              <article className="rec rec-hover flex h-full flex-col border-0 p-6">
                <div className="flex items-start justify-between gap-3">
                  <p className="mono text-label uppercase text-ink">
                    {String(i + 1).padStart(2, "0")} · {t.category}
                  </p>
                  {t.doctorOnly && (
                    <span className="mono inline-flex shrink-0 items-center gap-1 border border-rule px-1.5 py-1 text-[0.625rem] uppercase text-espresso">
                      <CalendarClock className="h-3 w-3" aria-hidden="true" />
                      Mié 17:30
                    </span>
                  )}
                </div>

                <h3 className="mt-5 text-[1.25rem] font-semibold leading-tight text-espresso">
                  {t.name}
                </h3>
                {t.subtitle && (
                  <p className="mono mt-1.5 text-[0.6875rem] uppercase text-ink">
                    {t.subtitle}
                  </p>
                )}

                <p className="mt-3.5 flex-1 text-[0.9375rem] leading-relaxed text-ink">
                  {t.description}
                </p>

                {/* --- Precio --- */}
                <div className="mt-5 border-t border-rule pt-4">
                  {t.price !== null ? (
                    <p className="flex items-baseline gap-2.5">
                      {t.listPrice !== null && (
                        <span className="mono text-sm text-ink line-through">
                          {clp(t.listPrice)}
                        </span>
                      )}
                      <span className="mono text-[1.375rem] font-semibold text-espresso">
                        {clp(t.price)}
                      </span>
                    </p>
                  ) : (
                    <p className="mono text-label uppercase text-ink">
                      Valor según evaluación
                    </p>
                  )}

                  {t.needsEvaluation && (
                    <p className="mono mt-2.5 flex items-start gap-1.5 text-[0.625rem] uppercase leading-relaxed text-ink">
                      <AlertCircle className="mt-px h-3 w-3 shrink-0" aria-hidden="true" />
                      Requiere evaluación previa
                    </p>
                  )}

                  <WhatsAppCTA
                    context={
                      t.price !== null
                        ? { kind: "treatment", treatment: t.name }
                        : { kind: "prices", treatment: t.name }
                    }
                    variant="quiet"
                    size="sm"
                    block
                    className="mt-3"
                  >
                    {t.price !== null ? "Consultar" : "Consultar valor"}
                  </WhatsAppCTA>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
