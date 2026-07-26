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

        {/* Filtros. Es un grupo de botones que cambian una lista, así que van
            como tablist para que el lector de pantalla anuncie el estado. */}
        <div
          role="tablist"
          aria-label="Filtrar por categoría"
          className="-mx-1 flex flex-wrap gap-2 overflow-x-auto pb-1"
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
                className={`min-h-[40px] whitespace-nowrap rounded-md border px-4 py-2 text-[0.875rem] font-medium transition-colors ${
                  selected
                    ? "border-drape bg-drape text-porcelain"
                    : "border-line bg-porcelain-lift text-slate-soft hover:border-drape hover:text-drape-deep"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="mt-4 text-sm text-slate-soft">
          {shown.length} {shown.length === 1 ? "tratamiento" : "tratamientos"}
          {active !== "Todos" && ` en ${active}`}
        </p>

        <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((t) => (
            <li key={t.id}>
              <article className="card-flat lift flex h-full flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="eyebrow text-[0.6875rem]">{t.category}</p>
                  {t.doctorOnly && (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-sm bg-drape-wash px-2 py-1 text-[0.6875rem] font-semibold text-drape-deep">
                      <CalendarClock className="h-3 w-3" aria-hidden="true" />
                      Miércoles 17:30
                    </span>
                  )}
                </div>

                <h3 className="mt-2 text-[1.125rem] font-semibold text-drape-deep">
                  {t.name}
                </h3>
                {t.subtitle && (
                  <p className="mt-0.5 text-[0.8125rem] text-slate-soft">{t.subtitle}</p>
                )}

                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-slate-soft">
                  {t.description}
                </p>

                {/* --- Precio --- */}
                <div className="mt-4 border-t border-line-soft pt-4">
                  {t.price !== null ? (
                    <p className="flex items-baseline gap-2">
                      {t.listPrice !== null && (
                        <span className="tnum text-sm text-slate-soft line-through">
                          {clp(t.listPrice)}
                        </span>
                      )}
                      <span className="tnum text-xl font-semibold text-slate">
                        {clp(t.price)}
                      </span>
                    </p>
                  ) : (
                    <p className="text-[0.875rem] text-slate-soft">
                      Valor según evaluación
                    </p>
                  )}

                  {t.needsEvaluation && (
                    <p className="mt-2 flex items-start gap-1.5 text-[0.8125rem] text-slate-soft">
                      <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      Requiere evaluación médica previa
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
