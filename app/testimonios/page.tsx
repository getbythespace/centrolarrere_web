import type { Metadata } from "next";
import Link from "next/link";
import { Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyContactBar, { StickyCTASentinel } from "@/components/StickyContactBar";
import WhatsAppCTA from "@/components/WhatsAppCTA";

export const metadata: Metadata = {
  title: "Opiniones",
  description:
    "Opiniones de pacientes de LARRÈRE, Chillán. Reseñas verificables desde Google.",
  alternates: { canonical: "/testimonios" },
  // Sin reseñas reales todavía, esta página no aporta a la búsqueda. Se
  // desindexa hasta que tenga contenido; el sitemap tampoco la lista.
  robots: { index: false, follow: true },
};

/**
 * Esta página tenía tres testimonios inventados —nombres, edades, fechas y
 * resultados— más un promedio de 5,0 escrito a mano. Se eliminaron.
 *
 * La estructura queda armada para reseñas reales. La recomendación es traerlas
 * de Google Business Profile en vez de escribirlas acá: son verificables, el
 * paciente puede comprobarlas, y habilitan las estrellas en el buscador de
 * forma legítima.
 */
export default function TestimoniosPage() {
  return (
    <>
      <Navigation />

      <main id="contenido">
        <section className="section-tight bg-porcelain">
          <div className="shell">
            <div className="max-w-prose page-enter">
              <p className="eyebrow">Opiniones</p>
              <h1 className="mt-4 text-display-lg text-drape-deep">
                Lo que dicen las pacientes
              </h1>
              <p className="mt-5 text-lead text-slate-soft">
                Preferimos reseñas que puedas verificar por tu cuenta antes que
                testimonios escritos por nosotros.
              </p>
            </div>
          </div>
        </section>

        <StickyCTASentinel />

        <section className="section border-t border-line-soft">
          <div className="shell">
            <div className="placeholder-flag mx-auto max-w-prose p-6">
              <h2 className="text-[1.0625rem] font-semibold">
                Espacio para reseñas reales
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed">
                Acá había tres testimonios que no correspondían a pacientes
                reales, junto a una calificación de 5,0 sobre 5 escrita a mano.
                Los saqué: no publicamos opiniones inventadas de una clínica de
                verdad, y el marcado de reseñas falsas es motivo de sanción de
                Google.
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed">
                <strong>Lo que necesito de ti:</strong> el enlace del perfil de
                Google Business de la clínica. Con eso muestro las reseñas
                reales acá y activo las estrellas en el buscador de forma
                legítima. Si prefieres testimonios escritos, mándame los textos
                con la autorización de cada paciente.
              </p>
            </div>

            {/* Maqueta de cómo se verá una reseña real, para que se entienda el
                formato. Marcada como ejemplo, sin datos de nadie. */}
            <div className="mx-auto mt-10 max-w-prose">
              <p className="text-[0.8125rem] font-semibold uppercase tracking-wider text-slate-soft">
                Ejemplo del formato — no es una reseña real
              </p>
              {/* Se marca como ejemplo con borde punteado, no con `opacity`:
                  bajar la opacidad del contenedor arrastra el contraste del
                  texto por debajo de AA (era el único fallo de contraste que
                  quedaba en el sitio). */}
              <article className="mt-3 rounded-lg border border-dashed border-line bg-porcelain-lift p-6">
                <div className="flex gap-0.5" role="img" aria-label="5 de 5 estrellas">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-pulse text-pulse" aria-hidden="true" />
                  ))}
                </div>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate-soft">
                  Texto de la reseña tal como la escribió la paciente en Google.
                </p>
                <p className="mt-3 text-[0.875rem] font-medium text-slate">
                  Nombre · Tratamiento · Mes y año
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section-tight border-t border-line-soft bg-porcelain-lift">
          <div className="shell-narrow text-center">
            <h2 className="text-display-sm text-drape-deep">
              Mientras tanto, mira los casos
            </h2>
            <p className="mx-auto mt-3 max-w-prose text-[1.0625rem] leading-relaxed text-slate-soft">
              Los antes y después son de la clínica, con consentimiento y sin
              retoque.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/resultados"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-line px-6 py-3.5 text-base font-semibold text-drape-deep transition-colors hover:bg-drape-wash"
              >
                Ver resultados
              </Link>
              <WhatsAppCTA context={{ kind: "general" }} size="lg" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyContactBar />
    </>
  );
}
