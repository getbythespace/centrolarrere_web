import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyContactBar, { StickyCTASentinel } from "@/components/StickyContactBar";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import PhoneLink from "@/components/PhoneLink";
import { clinic } from "@/lib/clinic";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "WhatsApp, teléfono, dirección y horario de LARRÈRE en Chillán. Atención de lunes a sábado, 11:00 a 19:00.",
  alternates: { canonical: "/contacto" },
};

/**
 * Esta página tenía su propio <nav> inline sin `hidden md:flex`: en mobile el
 * logo se solapaba con "Servicios" y los últimos items quedaban fuera de
 * pantalla, o sea que era imposible navegar desde acá en celular. Ahora usa el
 * <Navigation /> compartido, como el resto del sitio.
 */
export default function ContactoPage() {
  return (
    <>
      <Navigation />

      <main id="contenido">
        <section className="surface-ink grain pb-12 pt-12 md:pb-16 md:pt-16">
          <div className="shell">
            <div className="page-enter max-w-[46ch]">
              <p className="field">Contacto</p>
              <h1 className="mt-6 text-display-lg">
                <span className="text-sand">Escríbenos</span>
                <br />
                y coordinamos
              </h1>
              <p className="mt-6 text-lead text-sand">
                Lo más rápido es WhatsApp. Cuéntanos qué te preocupa y te
                orientamos antes de agendar.
              </p>
              <div className="mt-9">
                <WhatsAppCTA context={{ kind: "general" }} size="lg" />
              </div>
            </div>
          </div>
        </section>

        <StickyCTASentinel />

        <section className="bg-paper section">
          <div className="shell">
            <h2 className="sr-only">Datos de contacto</h2>

            <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
              <ul className="space-y-8">
                <li className="flex gap-4">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-olive" aria-hidden="true" strokeWidth={1.75} />
                  <div>
                    <h3 className="text-[0.9375rem] font-semibold text-pine">
                      Teléfono y WhatsApp
                    </h3>
                    <PhoneLink />
                    <p className="mt-1 text-[0.875rem] text-ink">
                      Mismo número para llamadas y mensajes.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-olive" aria-hidden="true" strokeWidth={1.75} />
                  <div>
                    <h3 className="text-[0.9375rem] font-semibold text-pine">Email</h3>
                    <a
                      href={`mailto:${clinic.email}`}
                      className="mt-1 block break-all text-[1.0625rem] text-olive underline decoration-rule underline-offset-4 transition-colors hover:decoration-pine"
                    >
                      {clinic.email}
                    </a>
                  </div>
                </li>

                <li className="flex gap-4">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-olive" aria-hidden="true" strokeWidth={1.75} />
                  <div>
                    <h3 className="text-[0.9375rem] font-semibold text-pine">Horario</h3>
                    <dl className="mt-2 space-y-1.5 text-[0.9375rem]">
                      <div className="flex justify-between gap-6 border-b border-rule/50 pb-1.5">
                        <dt className="text-ink">Lunes a sábado</dt>
                        <dd className="tnum font-medium text-pine">11:00 – 19:00</dd>
                      </div>
                      <div className="flex justify-between gap-6 border-b border-rule/50 pb-1.5">
                        <dt className="text-ink">Domingo</dt>
                        <dd className="font-medium text-pine">Cerrado</dd>
                      </div>
                      <div className="flex justify-between gap-6">
                        <dt className="text-ink">Atención médica</dt>
                        <dd className="tnum font-medium text-pine">Mié. desde 17:30</dd>
                      </div>
                    </dl>
                  </div>
                </li>

                <li className="flex gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-olive" aria-hidden="true" strokeWidth={1.75} />
                  <div>
                    <h3 className="text-[0.9375rem] font-semibold text-pine">Dirección</h3>
                    <p className="mt-1 text-[1.0625rem] text-pine">
                      {clinic.address.city}, {clinic.address.region}
                    </p>
                    <p className="todo-flag mt-2 px-2.5 py-1.5 text-[0.75rem] font-medium">
                      [REEMPLAZAR con la dirección exacta — calle, número y
                      oficina]
                    </p>
                  </div>
                </li>
              </ul>

              <div>
                {/* Mapa: se deja como espacio porque sin la dirección real un
                    embed apuntaría al lugar equivocado, que es peor que no
                    tener mapa. */}
                <div className="todo-flag flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 p-6 text-center">
                  <MapPin className="h-6 w-6" aria-hidden="true" strokeWidth={1.75} />
                  <p className="text-[0.875rem] font-semibold">Espacio para el mapa</p>
                  <p className="max-w-[38ch] text-[0.8125rem] leading-relaxed">
                    [REEMPLAZAR: pásame la dirección exacta o el enlace del
                    perfil de Google Business y monto el mapa con carga diferida
                    — no se carga hasta que el usuario baje, para no gastar el
                    presupuesto de LCP.]
                  </p>
                </div>

                <div className="rec mt-6 p-6">
                  <h3 className="text-[1.0625rem] font-semibold text-pine">
                    Evaluación médica
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink">
                    Primera consulta obligatoria para cualquier tratamiento.
                  </p>
                  <p className="mt-3">
                    <span className="tnum text-2xl font-semibold text-pine">
                      {clinic.evaluation.priceDisplay}
                    </span>
                    <span className="ml-2 text-[0.875rem] text-ink">
                      {clinic.evaluation.note}
                    </span>
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <WhatsAppCTA context={{ kind: "evaluation" }} block />
                    <Link
                      href="/agendar"
                      className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-md border border-rule px-5 py-3 text-[0.9375rem] font-semibold text-pine transition-colors hover:bg-sand"
                    >
                      Agendar online
                    </Link>
                  </div>
                </div>
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
