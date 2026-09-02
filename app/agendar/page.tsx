import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyContactBar, { StickyCTASentinel } from "@/components/StickyContactBar";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import PhoneLink from "@/components/PhoneLink";
import DeferredCalendar from "@/components/DeferredCalendar";
import { clinic } from "@/lib/clinic";
import { campaign } from "@/lib/campaign";

/**
 * El mes de la campaña se calcula en cada render. Sin esto la página quedaría
 * congelada con el mes en que se compiló y en octubre seguiría diciendo
 * septiembre. 12 horas es de sobra para un cambio mensual.
 */
export const revalidate = 43200;

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
        <section className="surface-ink grain pb-12 pt-12 md:pb-16 md:pt-16">
          <div className="shell">
            <div className="page-enter max-w-[46ch]">
              <p className="field">Agendar</p>
              <h1 className="mt-6 text-display-lg">
                <span className="text-sand">Reserva tu</span>
                <br />
                evaluación médica
              </h1>
              <p className="mt-6 text-lead text-sand">
                Elige día y hora en el calendario, o escríbenos por WhatsApp y lo
                coordinamos contigo.
              </p>
            </div>

            <div className="rec mt-11 flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
              <div>
                <p className="text-[0.875rem] uppercase tracking-wider text-sand">
                  Evaluación médica
                </p>
                {/* Mientras la campaña esté activa, acá manda «Gratis». Antes
                    mostraba el precio completo mientras el resto del sitio
                    ofrecía la evaluación gratis: el visitante llegaba al punto
                    de reservar y se encontraba con lo contrario de lo que
                    acababa de leer. */}
                {campaign.active ? (
                  <p className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-[1.75rem] font-semibold leading-none text-paper">
                      Gratis
                    </span>
                    <span className="text-[1.0625rem] text-sand line-through">
                      {clinic.evaluation.priceDisplay}
                    </span>
                    <span className="text-[0.875rem] text-sand">
                      por tiempo limitado · {clinic.evaluation.note}
                    </span>
                  </p>
                ) : (
                  <p className="mt-2 flex items-baseline gap-2">
                    <span className="text-[1.75rem] font-semibold leading-none text-paper">
                      {clinic.evaluation.priceDisplay}
                    </span>
                    <span className="text-[0.875rem] text-sand">
                      {clinic.evaluation.note}
                    </span>
                  </p>
                )}
                <p className="mt-3 text-[0.875rem] text-sand">
                  {clinic.hours.display} · {clinic.hours.medical}
                </p>
              </div>
              <WhatsAppCTA context={{ kind: "evaluation" }} size="lg" className="shrink-0" />
            </div>
          </div>
        </section>

        <StickyCTASentinel />

        <section className="bg-paper section-tight">
          <div className="shell">
            <h2 className="text-display-sm text-pine">Calendario</h2>
            <div className="mt-6">
              <DeferredCalendar />
            </div>

            {/* Política de reservas. Antes iba en rojo de alerta con cuatro
                emoji, que leía como error del sistema; es información
                contractual y se presenta como tal. */}
            <div className="mt-8 max-w-prose rounded-lg border border-rule bg-paper p-6">
              <h3 className="flex items-center gap-2 text-[1.0625rem] font-semibold text-pine">
                <AlertTriangle className="h-[1.125rem] w-[1.125rem] shrink-0 text-plum-deep" aria-hidden="true" strokeWidth={2} />
                Política de reservas
              </h3>
              <dl className="mt-4 space-y-3 text-[0.9375rem] leading-relaxed">
                <div>
                  <dt className="font-semibold text-pine">Aviso mínimo</dt>
                  <dd className="text-ink">
                    Las reservas se toman con al menos 12 horas de anticipación.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-pine">Cancelaciones</dt>
                  <dd className="text-ink">
                    Con 12 horas o más de aviso, sin cargo. Con menos de 12
                    horas, se pierde la hora reservada.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-pine">Confirmación</dt>
                  <dd className="text-ink">
                    Se requiere un abono del 50% para confirmar la cita.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="surface-ink grain section-tight">
          <div className="shell-narrow text-center">
            <h2 className="text-display-md">
              <span className="text-sand">¿Prefieres coordinar</span>
              <br />
              por mensaje?
            </h2>
            <p className="mx-auto mt-5 max-w-prose text-[1.0625rem] leading-relaxed text-sand">
              Escríbenos y te damos las horas disponibles.
            </p>
            <div className="mt-7 flex flex-col items-center gap-4">
              <WhatsAppCTA context={{ kind: "evaluation" }} size="lg" />
              <div className="text-[0.9375rem] text-sand">
                <span className="mr-2">o llámanos:</span>
                <span className="inline-block [&_a]:text-paper [&_a]:decoration-porcelain/40">
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
