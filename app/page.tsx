import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, X } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import StickyContactBar, { StickyCTASentinel } from "@/components/StickyContactBar";
import BeforeAfter from "@/components/BeforeAfter";
import ToneScale, { ToneRule } from "@/components/ToneScale";
import HeroMedia from "@/components/HeroMedia";
import LazyVideo from "@/components/LazyVideo";
import TrustMarquee from "@/components/TrustMarquee";
import RevealText from "@/components/RevealText";
import CampaignPacks from "@/components/CampaignPacks";
import Autorizacion from "@/components/Autorizacion";
import { clinic } from "@/lib/clinic";
import { treatments } from "@/lib/treatments";
import { showcaseCases } from "@/lib/cases";

/**
 * La home está compuesta como una ficha clínica: campos con etiqueta mono,
 * filetes de 1px, radio cero y un salto de escala fuerte entre la etiqueta y el
 * titular. La escala de fototipos abre la página, porque es la que justifica la
 * paleta y anuncia de qué se trata la consulta.
 */

// IDs del catálogo con precios reales. Se filtra por si alguno se renombra:
// antes esta lista apuntaba a IDs viejos y la grilla se quedaba a medias sin
// avisar.
const DESTACADOS = [
  "laser-rosacea-4",
  "acne",
  "telangiectasia",
  "prp-capilar-1",
  "acrocordones",
  "rejuvenecimiento-manos",
];

export default function HomePage() {
  const featured = DESTACADOS.map((id) => treatments.find((t) => t.id === id)).filter(
    (t): t is NonNullable<typeof t> => Boolean(t)
  );

  return (
    <>
      <Navigation />

      <main id="contenido">
        {/* ================= HERO =================
            A sangre completa, con el video de preparación detrás y el titular
            encima. La versión anterior tenía la foto en un marco al costado del
            texto: correcta como composición editorial, y plana como landing.
            Esto es lo que la separa de una ficha impresa. */}
        <section className="relative flex min-h-[92svh] items-end overflow-hidden">
          <HeroMedia
            video="procedimiento"
            alt="Procedimiento con láser realizado en la clínica"
            veil="medio"
            priority
          />

          <div className="shell relative z-10 pb-12 pt-28 md:pb-16">
            <p className="field w-full max-w-xs text-sand">Chillán · Ñuble</p>

            <h1 className="mt-7 max-w-[16ch] text-display-2xl text-paper">
              <span className="line-mask">
                <span style={{ ["--i" as string]: 0 }}>Cada piel</span>
              </span>
              <span className="line-mask">
                <span style={{ ["--i" as string]: 1 }}>tiene un</span>
              </span>
              <span className="line-mask">
                <span className="text-ambar" style={{ ["--i" as string]: 2 }}>
                  protocolo.
                </span>
              </span>
            </h1>

            <p className="mt-8 max-w-[52ch] text-lead text-paper/90">
              Rosácea, acné, onicomicosis y alopecia.{" "}
              <strong className="font-semibold text-paper">
                Cada tratamiento parte con evaluación médica
              </strong>
              , con respaldo de enfermería titulada y bajo autorización
              sanitaria.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <WhatsAppCTA context={{ kind: "evaluation" }} size="lg" />
              <Link
                href="/servicios"
                className="btn-lift group inline-flex min-h-[48px] items-center justify-center gap-2.5 border border-paper/40 px-7 py-4 text-body font-semibold text-paper backdrop-blur-sm hover:bg-paper hover:text-pine"
              >
                Ver {treatments.length} tratamientos
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>

            {/* La escala de fototipos cierra el hero, sin pie: el texto que
                llevaba explicaba lo que la banda ya comunica. */}
            <div className="mt-12 max-w-sm">
              <ToneScale size="sm" labelled={false} />
            </div>
          </div>
        </section>

        {/* ================= FRANJA DE DATOS =================
            Reemplaza al hero-ficha que había acá: su titular, su escala y sus
            CTA ahora viven sobre el video, y tenerlos dos veces era ruido. Lo
            que queda es el dato duro, en una sola línea. */}
        <section className="border-b border-rule bg-paper">
          <div className="shell">
            <dl className="grid divide-y divide-rule/50 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              {/* Evaluación: el precio va tachado y la gratuidad en una banda
                  de rojo pastel con tinta pino (6.35:1). Se dice sólo
                  «Evaluación» — no es una evaluación médica propiamente tal. */}
              <div className="py-6 sm:pr-8">
                <dt className="mono text-label uppercase text-ink">Evaluación</dt>
                <dd className="mt-2.5 flex items-baseline gap-3">
                  <span className="mono text-[1.375rem] text-ink line-through decoration-2">
                    {clinic.evaluation.priceDisplay}
                  </span>
                </dd>
                <dd className="mt-2.5">
                  <span className="mono inline-block bg-oferta px-3 py-1.5 text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-pine">
                    Gratis durante agosto
                  </span>
                </dd>
              </div>

              <div className="py-6 sm:pl-8">
                <dt className="mono text-label uppercase text-ink">Autorización sanitaria</dt>
                <dd className="mt-3 flex items-center gap-3">
                  <Image
                    src="/clinica/SEREMISALUDMET.png"
                    alt="SEREMI de Salud · Ministerio de Salud"
                    width={52}
                    height={48}
                    className="h-11 w-auto border border-rule"
                    quality={85}
                  />
                  <span className="text-[0.9375rem] font-semibold leading-tight text-pine">
                    SEREMI de Salud
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <StickyCTASentinel />

        {/* Cinta de confianza: la única pieza que se mueve sola, acotada a una
            franja. Separa el hero del argumento y le da pulso a la página. */}
        <TrustMarquee />

        {/* Los dos focos comerciales del mes, arriba del argumento de marca:
            el tráfico de la pauta llega buscando eso. */}
        <CampaignPacks />

        {/* ================= DIFERENCIAL =================
            El video del procedimiento va de fondo: es la prueba visual de lo
            que el texto afirma. Carga diferida — está a mitad de página y la
            mayoría del tráfico de anuncios no llega hasta acá. */}
        {/* Conserva `surface-ink` aunque el video tape el fondo: esa clase es
            la que da color claro al `.field` y al resto de descendientes. */}
        <section className="surface-ink section relative overflow-hidden">
          <LazyVideo
            video="preparacion"
            alt="Enfermera de la clínica preparándose antes de un procedimiento"
            veilOpacity={0.82}
          />
          <div className="shell relative z-10">
            <div className="max-w-[54ch]">
              <p className="field">Lo que otros no tratan</p>
              <h2 className="mt-7 text-display-lg text-paper">
                Un centro de estética te dice que no.
              </h2>
              <p className="mt-7 text-lead text-sand">
                No por mala voluntad: son condiciones que necesitan diagnóstico
                médico antes de tocarlas. Acá se tratan, y por eso la consulta
                empieza con una evaluación y no con un presupuesto.
              </p>
            </div>

            {/* Tabla comparativa. Es el argumento concreto y verificable, no
                «nos preocupamos por tu salud» —que es lo que dice todo el
                rubro y por eso no diferencia nada—. Cada fila es una condición
                que un centro estético deriva o rechaza. */}
            <ul className="mt-12 border-t border-sand/25">
              {[
                {
                  cond: "Onicomicosis",
                  otros: "Derivan a dermatología",
                  aqui: "Láser, sin límite de sesiones",
                },
                {
                  cond: "Rosácea y lesiones vasculares",
                  otros: "No tienen láser vascular",
                  aqui: "Láser vascular con control médico",
                },
                {
                  cond: "Vitíligo",
                  otros: "No lo abordan",
                  aqui: "Micropigmentación de la zona",
                },
                {
                  cond: "Acrocordones y lesiones benignas",
                  otros: "Requiere procedimiento médico",
                  aqui: "Extracción en consulta",
                },
                {
                  cond: "Acné en tratamiento con medicación",
                  otros: "Evitan la piel medicada",
                  aqui: "Acompañamiento durante el brote",
                },
                {
                  cond: "Alergias cutáneas sin diagnóstico",
                  otros: "No las estudian",
                  aqui: "Test Prick en la misma consulta",
                },
              ].map((r) => (
                <li
                  key={r.cond}
                  className="grid gap-x-8 gap-y-3 border-b border-sand/25 py-6 md:grid-cols-[1.1fr_0.95fr_1.05fr] md:items-baseline"
                >
                  <h3 className="text-[1.125rem] font-semibold leading-snug text-paper">
                    {r.cond}
                  </h3>
                  <p className="flex items-baseline gap-2.5 text-[0.9375rem] leading-relaxed text-sand">
                    <X
                      className="mt-1 h-3.5 w-3.5 shrink-0 text-sand/80"
                      aria-hidden="true"
                      strokeWidth={3}
                    />
                    <span>
                      <span className="mono mr-1.5 text-label-sm uppercase text-sand/85">
                        Otros:
                      </span>
                      {r.otros}
                    </span>
                  </p>
                  <p className="flex items-baseline gap-2.5 text-[0.9375rem] font-medium leading-relaxed text-paper">
                    <Check
                      className="mt-1 h-3.5 w-3.5 shrink-0 text-alerta"
                      aria-hidden="true"
                      strokeWidth={3}
                    />
                    <span>
                      <span className="mono mr-1.5 text-label-sm uppercase text-alerta">
                        Acá:
                      </span>
                      {r.aqui}
                    </span>
                  </p>
                </li>
              ))}
            </ul>

            <p className="mono mt-7 max-w-prose text-label-sm uppercase leading-relaxed text-sand">
              Todo procedimiento parte con evaluación médica y se realiza con
              respaldo de enfermería titulada
            </p>
          </div>
        </section>

        <ToneRule />

        {/* ================= TRATAMIENTOS ================= */}
        <section className="section bg-paper">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="field w-56">Tratamientos</p>
                <h2 className="mt-6 text-display-md text-pine">
                  Lo que más nos consultan
                </h2>
              </div>
              <Link
                href="/servicios"
                className="mono link-grow group inline-flex items-center gap-2 pb-1 text-label uppercase text-pine"
              >
                Catálogo completo
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>

            {/* Grilla sin gap: las tarjetas comparten filete, como celdas de una
                tabla. Es lo que separa esto de cuatro cajas flotando. */}
            <ul className="rise-stagger mt-10 grid border-l border-t border-rule sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((t, i) => (
                <li key={t.id} className="border-b border-r border-rule">
                  <article className="rec rec-hover card-rise flex h-full flex-col border-0 p-6">
                    <p className="mono text-label uppercase text-ink">
                      {String(i + 1).padStart(2, "0")} · {t.category}
                    </p>

                    {/* Ilustración de la condición. Cuando no hay imagen para
                        ese tratamiento, la tarjeta simplemente no la dibuja en
                        vez de dejar un hueco. */}
                    {t.conditionImage && (
                      <div className="card-zoom relative mt-4 aspect-[16/10] w-full border border-rule bg-sand">
                        <Image
                          src={t.conditionImage.src}
                          alt={t.conditionImage.alt}
                          fill
                          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                          className="object-cover"
                          quality={70}
                        />
                      </div>
                    )}

                    <h3 className="mt-5 text-[1.25rem] font-semibold leading-tight text-pine">
                      {t.name}
                    </h3>
                    <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink">
                      {t.summary}
                    </p>
                    <WhatsAppCTA
                      context={{ kind: "treatment", treatment: t.name }}
                      variant="quiet"
                      size="sm"
                      block
                      className="mt-6"
                    >
                      Consultar
                    </WhatsAppCTA>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ================= RESULTADOS ================= */}
        <section className="surface-sand section">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-[46ch]">
                <p className="field w-40">Resultados</p>
                <h2 className="mt-6 text-display-md text-pine">
                  Casos tratados acá
                </h2>
                {/* Se entinta palabra por palabra al entrar en pantalla. */}
                <RevealText className="mt-5 text-[1.0625rem] leading-relaxed">
                  Sólo casos propios, con consentimiento firmado y sin retoque.
                  Cada uno indica tratamiento, fototipo y número de sesiones.
                </RevealText>
              </div>
              <Link
                href="/resultados"
                className="mono link-grow group inline-flex items-center gap-2 pb-1 text-label uppercase text-pine"
              >
                Todos los casos
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>

            {/* Por qué hay pocos casos, dicho de frente. Es un argumento a
                favor, no una excusa: la confidencialidad del paciente es
                exactamente lo que alguien quiere de una clínica. */}
            <div className="mt-10 grid gap-6 border border-rule md:grid-cols-3">
              {[
                {
                  t: "Consentimiento firmado",
                  d: "Sólo se publica lo que el paciente autorizó por escrito para uso publicitario.",
                },
                {
                  t: "Zonas no identificables",
                  d: "Uñas, manos y pies. No publicamos rostros ni cuero cabelludo, aunque haya autorización.",
                },
                {
                  t: "Sin retoque",
                  d: "Misma luz, mismo ángulo, misma distancia. Si el «después» está mejor iluminado, la comparación no vale.",
                },
              ].map((x, i) => (
                <div
                  key={x.t}
                  className={`p-6 ${i > 0 ? "border-rule md:border-l" : ""} ${
                    i > 0 ? "border-t md:border-t-0" : ""
                  }`}
                >
                  <h3 className="text-[1.0625rem] font-semibold text-pine">{x.t}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink">{x.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Respaldo verificable, antes del cierre: es lo último que decide a
            alguien que llegó desde un anuncio. */}
        <Autorizacion />

        {/* ================= CIERRE ================= */}
        <section className="surface-ink grain section">
          <div className="shell">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="field w-48">Siguiente paso</p>
                <h2 className="mt-6 text-display-xl text-paper">
                  Empecemos por
                  <br />
                  la evaluación.
                </h2>
                <p className="mt-6 max-w-prose text-lead text-sand">
                  Cuéntanos qué te preocupa por WhatsApp. Si prefieres reservar
                  tú, la agenda está abierta.
                </p>
              </div>

              <div className="flex flex-col gap-3 lg:min-w-[16rem]">
                <WhatsAppCTA context={{ kind: "evaluation" }} size="lg" block />
                <Link
                  href="/agendar"
                  className="btn-lift inline-flex min-h-[48px] items-center justify-center border border-sand/40 px-6 py-3.5 text-body font-semibold text-paper hover:bg-paper hover:text-pine"
                >
                  Agendar online
                </Link>
                <p className="mono mt-2 text-[0.6875rem] uppercase leading-relaxed text-sand">
                  {clinic.evaluation.priceDisplay} · {clinic.evaluation.note}
                </p>
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
