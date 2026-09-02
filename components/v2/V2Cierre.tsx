import Link from "next/link";
import HeroMedia from "@/components/HeroMedia";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { clinic } from "@/lib/clinic";
import { campaign } from "@/lib/campaign";

/**
 * Cierre común a todas las páginas de la v2: la evaluación del mes, el camino
 * para escribir y los datos de contacto.
 *
 * El precio y la leyenda salen de lib/campaign.ts. Decían «agosto» escrito a
 * mano: al apagar la campaña o cambiar de mes, este bloque habría seguido
 * ofreciendo algo vencido.
 *
 * Corre sobre superficie marrón con el velo del mismo tono; con el velo taupe
 * el video cortaba contra el fondo en vez de fundirse con él.
 */
export default function V2Cierre({ titulo }: { titulo?: React.ReactNode }) {
  return (
    <section className="v2-sup v2-sup--marron relative overflow-hidden py-[clamp(6rem,14vw,11rem)]">
      <HeroMedia
        video="preparacion"
        alt="Enfermera de la clínica preparándose antes de un procedimiento"
        veil="fuerte"
        tone="marron"
      />
      <div className="v2-shell relative z-10">
        <h2 className="v2-display max-w-[15ch]">
          {titulo ?? (
            <>
              Partamos por <span className="v2-serif">la evaluación</span>
            </>
          )}
        </h2>

        <div className="v2-rule mt-12" />

        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="v2-label v2-dim">Evaluación</p>
            {campaign.active ? (
              <>
                <p className="v2-display mt-3 text-[clamp(2.5rem,5.5vw,4.5rem)]">
                  Gratis
                  <span className="v2-serif v2-dim ml-4 text-[0.45em]">
                    {campaign.banner.text}
                  </span>
                </p>
                <p className="v2-body v2-dim mt-3">
                  Precio normal{" "}
                  <span className="line-through">
                    {clinic.evaluation.priceDisplay}
                  </span>
                </p>
              </>
            ) : (
              <p className="v2-display mt-3 text-[clamp(2.5rem,5.5vw,4.5rem)]">
                {clinic.evaluation.priceDisplay}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <WhatsAppCTA context={{ kind: "evaluation" }} size="lg" />
            <Link href="/v2/agendar" className="v2-btn">
              Coordinar por WhatsApp
            </Link>
          </div>
        </div>

        <div className="v2-rule mt-16" />
        <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
          <span className="v2-label v2-dim">
            {clinic.phone.display} · {clinic.address.city}
          </span>
          <span className="v2-label v2-dim">{clinic.hours.display}</span>
        </div>
      </div>
    </section>
  );
}
