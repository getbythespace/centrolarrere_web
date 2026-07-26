import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyContactBar, { StickyCTASentinel } from "@/components/StickyContactBar";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import PhoneLink from "@/components/PhoneLink";
import DeferredCalendar from "@/components/DeferredCalendar";
import { clinic } from "@/lib/clinic";

export const metadata: Metadata = {
  title: "Agendar",
  description:
    "Reserva tu evaluación médica en LARRÈRE, Chillán. Agenda online o escríbenos por WhatsApp.",
  alternates: { canonical: "/agendar" },
};

/**
 * La integración de reserva (Google Calendar Appointment Schedule) se mantiene
 * intacta: misma URL de embed, mismo flujo. Los cambios son de entorno —
 * el iframe ahora carga diferido y la página ofrece WhatsApp en paralelo, que
 * es por donde convierte el tráfico de anuncios.
 */
export default function AgendarPage() {
  return (
    <>
      <Navigation />

      <main id="contenido">
        <section className="section-tight bg-porcelain">
          <div className="shell">
            <div className="max-w-prose page-enter">
              <p className="eyebrow">Agendar</p>
              <h1 className="mt-4 text-display-lg text-drape-deep">
                Reserva tu evaluación médica
              </h1>
              <p className="mt-5 text-lead text-slate-soft">
                Elige día y hora en el calendario, o escríbenos por WhatsApp y lo
                coordinamos contigo.
              </p>
            </div>

            <div className="card-flat mt-8 flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[0.9375rem] text-slate-soft">
                  Evaluación médica
                </p>
                <p className="mt-1">
                  <span className="tnum text-2xl font-semibold text-slate">
                    {clinic.evaluation.priceDisplay}
                  </span>
                  <span className="ml-2 text-[0.875rem] text-slate-soft">
                    {clinic.evaluation.note}
                  </span>
                </p>
                <p className="mt-2 text-[0.875rem] text-slate-soft">
                  {clinic.hours.display} · {clinic.hours.medical}
                </p>
              </div>
              <WhatsAppCTA context={{ kind: "evaluation" }} size="lg" className="shrink-0" />
            </div>
          </div>
        </section>

        <StickyCTASentinel />

        <section className="section-tight border-t border-line-soft">
          <div className="shell">
            <h2 className="text-display-sm text-drape-deep">Calendario</h2>
            <div className="mt-6">
              <DeferredCalendar />
            </div>

            {/* Política de reservas. Antes iba en rojo de alerta con cuatro
                emoji, que leía como error del sistema; es información
                contractual y se presenta como tal. */}
            <div className="mt-8 max-w-prose rounded-lg border border-line bg-porcelain-lift p-6">
              <h3 className="flex items-center gap-2 text-[1.0625rem] font-semibold text-drape-deep">
                <AlertTriangle className="h-[1.125rem] w-[1.125rem] shrink-0 text-pulse-deep" aria-hidden="true" strokeWidth={2} />
                Política de reservas
              </h3>
              <dl className="mt-4 space-y-3 text-[0.9375rem] leading-relaxed">
                <div>
                  <dt className="font-semibold text-slate">Aviso mínimo</dt>
                  <dd className="text-slate-soft">
                    Las reservas se toman con al menos 12 horas de anticipación.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate">Cancelaciones</dt>
                  <dd className="text-slate-soft">
                    Con 12 horas o más de aviso, sin cargo. Con menos de 12
                    horas, se pierde la hora reservada.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate">Confirmación</dt>
                  <dd className="text-slate-soft">
                    Se requiere un abono del 50% para confirmar la cita.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="section-tight bg-drape-deep text-porcelain">
          <div className="shell-narrow text-center">
            <h2 className="text-display-sm">¿Prefieres coordinar por mensaje?</h2>
            <p className="mx-auto mt-3 max-w-prose text-[1.0625rem] leading-relaxed text-porcelain/80">
              Escríbenos y te damos las horas disponibles.
            </p>
            <div className="mt-7 flex flex-col items-center gap-4">
              <WhatsAppCTA context={{ kind: "evaluation" }} size="lg" />
              <div className="text-[0.9375rem] text-porcelain/80">
                <span className="mr-2">o llámanos:</span>
                <span className="inline-block [&_a]:text-porcelain [&_a]:decoration-porcelain/40">
                  <PhoneLink label="agendar" />
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyContactBar />
    </>
  );
}
