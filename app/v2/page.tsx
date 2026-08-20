import Link from "next/link";
import Image from "next/image";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import BeforeAfter from "@/components/BeforeAfter";
import HeroMedia from "@/components/HeroMedia";
import { clinic, clp } from "@/lib/clinic";
import { treatments } from "@/lib/treatments";
import { showcaseCases } from "@/lib/cases";
import { mostrarResultados } from "@/lib/flags";
import { campaign } from "@/lib/campaign";

/**
 * v2 — «Cámara oscura».
 *
 * Corrección de rumbo tras el segundo intento. Lo que fallaba no era la
 * cantidad de secciones —esas ya estaban reducidas— sino que la página no tenía
 * ningún momento diseñado: bajaba como un documento.
 *
 * Lo que se agrega, tomado de lo replicable de las referencias premiadas:
 * - Video a sangre desde el primer pixel, con el wordmark encima.
 * - Una PISTA HORIZONTAL: la sección se fija y los tratamientos corren de lado
 *   mientras scrolleas. Es el gesto que más cambia la percepción y el único de
 *   ese grupo que cabe en el presupuesto.
 * - La escala de fototipos a pantalla completa, seis columnas de color: el
 *   único momento en que la página se llena, y por eso pesa.
 * - Cinta de tipo enorme, no de etiquetas chicas.
 */

/**
 * Las ventajas de atenderse acá. Cada una corresponde a algo que ya está
 * publicado en el sitio o guardado en lib/clinic.ts — ninguna es nueva.
 *
 * Quedaron fuera «ubicación central» y «equipos modernos»: la dirección y el
 * registro de los equipos siguen siendo placeholders, así que hoy no hay con
 * qué respaldarlas.
 */
const VENTAJAS: Array<{ titulo: string; detalle: string; color: string }> = [
  {
    titulo: "Autorización sanitaria",
    detalle: "Resolución SEREMI a la vista",
    color: "var(--lume)",
  },
  {
    titulo: "Enfermería titulada",
    detalle: "En cada procedimiento",
    color: "var(--sage)",
  },
  {
    titulo: "Evaluación antes de tratar",
    detalle: "Ningún tratamiento parte sin ella",
    color: "var(--tan)",
  },
  {
    titulo: "Más de 7 años en láser",
    detalle: "A cargo de los tratamientos",
    color: "var(--clay)",
  },
  {
    titulo: "Seguimiento posterior",
    detalle: "Control a cargo de enfermería",
    color: "var(--sage)",
  },
  {
    titulo: clinic.hours.display,
    detalle: `${clinic.address.city} · ${clinic.address.region}`,
    color: "var(--lume)",
  },
];

/**
 * Lo que la cinta anuncia. Todo dato sale de lib/campaign.ts o del catálogo:
 * nada de precios escritos a mano acá.
 *
 * Los colores rotan sobre la paleta y todos están medidos contra --void:
 * lume 11.09:1 · sage 7.10:1 · tan 6.44:1 · clay 4.96:1. El plazo o el precio
 * va aparte en --verde (9.77:1) porque es lo que se lee primero.
 */
const packAcne = campaign.packs.find((p) => p.id === "pack-acne-higiene")!;

const PROMOS: Array<{ texto: string; dato?: string; color: string }> = [
  {
    texto: `${campaign.banner.highlight} `,
    dato: campaign.banner.text,
    color: "var(--lume)",
  },
  {
    texto: "Promo acné · pack completo ",
    dato: clp(packAcne.packPrice),
    color: "var(--tan)",
  },
  {
    texto: "Onicomicosis · ",
    dato: "sin límite de sesiones",
    color: "var(--sage)",
  },
  {
    texto: `${campaign.banner.detail} `,
    dato: `${campaign.month.toLowerCase()} ${campaign.year}`,
    color: "var(--clay)",
  },
];

const ENLACES: Array<[string, string]> = [
  ["/servicios", "Tratamientos"],
  ...(mostrarResultados
    ? ([["/resultados", "Resultados"]] as Array<[string, string]>)
    : []),
  ["/equipo", "Equipo"],
  ["/contacto", "Contacto"],
];

const LETRAS = ["L", "A", "R", "R", "È", "R", "E"];

const PISTA = [
  "onicomicosis-plantar",
  "laser-rosacea-4",
  "acne",
  "telangiectasia",
  "prp-capilar-1",
  "acrocordones",
  "vitiligo-4",
  "test-prick-completo",
];

export default function V2Page() {
  const foco = treatments.find((t) => t.id === "onicomicosis-plantar")!;
  const caso = showcaseCases[0];
  const pista = PISTA.map((id) => treatments.find((t) => t.id === id)).filter(
    (t): t is NonNullable<typeof t> => Boolean(t)
  );

  return (
    <main>
      {/* ══════════ 1 · HERO ══════════
          Video a sangre desde el primer pixel. El wordmark encima, del ancho
          del viewport. Sin vacío decorativo: la imagen ocupa lo que antes
          estaba en blanco. */}
      <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-8 pt-7">
        <HeroMedia
          video="procedimiento"
          alt="Procedimiento con láser realizado en la clínica"
          veil="medio"
          tone="neutro"
          priority
        />

        <div className="v2-shell v2-scrim v2-scrim--fila relative z-10 flex items-center justify-between">
          <span className="v2-label v2-loc">Chillán · Ñuble</span>
          {/* Píldora con indicador que se desliza al pasar el cursor. --n le
              dice al CSS cuántos enlaces hay para que el indicador mida bien. */}
          <nav
            className="v2-pill"
            aria-label="Principal"
            style={{ ["--n" as string]: ENLACES.length }}
          >
            {ENLACES.map(([href, label]) => (
              <Link key={href} href={href} className="v2-label">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="v2-shell v2-scrim v2-scrim--marca relative z-10">
          <h1 className="v2-wordmark" aria-label="LARRÈRE · Centro de salud y estética">
            {LETRAS.map((l, i) => (
              <span key={i} className="v2-mask" aria-hidden="true">
                <span style={{ ["--i" as string]: i }}>{l}</span>
              </span>
            ))}
          </h1>
          <p
            className="v2-label v2-bajada mt-4"
            aria-hidden="true"
          >
            Centro de salud y estética
          </p>
        </div>

        <div className="v2-shell v2-scrim v2-scrim--fila relative z-10">
          <div className="v2-rule" />
          <div className="mt-6 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <p className="v2-lead max-w-[26ch]">
              La piel se trata <span className="v2-serif">con criterio clínico</span>
            </p>
            <div className="flex flex-col items-start gap-5 md:items-end">
              {/* El sello reemplaza a «evaluación médica previa · enfermería
                  titulada»: eso ya se dice en el resto del sitio, y este es el
                  único lugar donde algo tiene fecha de vencimiento. */}
              <p className="v2-oferta">Evaluación gratuita por tiempo limitado</p>
              <WhatsAppCTA context={{ kind: "evaluation" }} size="lg" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 2 · CINTA DE PROMOCIONES ══════════
          Antes eran los nombres de las condiciones en tipo enorme: bonito y
          mudo. Ahora lleva lo que tiene plazo, que es lo que hace que alguien
          escriba hoy y no en dos semanas.

          Los valores salen de lib/campaign.ts, no escritos acá: si cambia el
          precio del pack o termina agosto, la cinta cambia con el resto del
          sitio en vez de quedar mintiendo. */}
      <div className="v2-marquee py-3.5">
        {[0, 1].map((k) => (
          <div key={k} className="v2-marquee__track" aria-hidden={k === 1 || undefined}>
            {PROMOS.map((promo, i) => (
              <span key={`${k}-${i}`} className="v2-promo" style={{ color: promo.color }}>
                {promo.texto}
                {promo.dato ? <b>{promo.dato}</b> : null}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* ══════════ 3 · POR QUÉ ACÁ ══════════
          Misma estructura que tenía «lo que otros derivan» —fila con el término
          a la izquierda y la aclaración a la derecha, entradas que alternan de
          lado— pero ahora dice las ventajas en vez de hablar de la competencia.

          Cada fila es un dato que ya está en el sitio o en lib/clinic.ts. No hay
          ninguna afirmación nueva: «ubicación central» y «equipos modernos» se
          quedaron fuera a propósito porque la dirección todavía es un
          placeholder y el registro de los equipos también, así que no se pueden
          respaldar.

          El color rota sobre la paleta; los cuatro tonos están medidos contra
          --void y ninguno baja de 4.96:1. */}
      <section className="v2-overlap v2-grain relative py-[clamp(4rem,10vw,8rem)]">
        <div className="v2-shell relative z-[2]">
          <h2 className="v2-display max-w-[17ch]">
            Por qué acá y <span className="v2-serif">no en otra parte</span>.
          </h2>

          <div className="v2-rule mt-12" />

          <ul>
            {VENTAJAS.map(({ titulo, detalle, color }, i) => (
              <li key={titulo}>
                <div
                  className={`flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-5 ${
                    i % 2 === 0 ? "v2-from-l" : "v2-from-r"
                  }`}
                >
                  <span
                    className="text-[clamp(1.25rem,2.4vw,2rem)] font-bold leading-tight"
                    style={{ color }}
                  >
                    {titulo}
                  </span>
                  <span className="v2-label opacity-55">{detalle}</span>
                </div>
                <div className="v2-rule" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══════════ 5 · PISTA HORIZONTAL ══════════
          La sección se fija y los tratamientos corren de lado. En móvil se
          arrastra con el dedo. */}
      <section className="v2-track-outer v2-plano" aria-labelledby="pista-t">
        {/* `items-start` + padding: antes el pin centraba el bloque completo y
            el título quedaba muy abajo respecto de las tarjetas. */}
        <div className="v2-track-pin" style={{ alignItems: "flex-start" }}>
          <div className="w-full pt-[clamp(4rem,9vh,7rem)]">
            <div className="v2-shell mb-8 flex flex-wrap items-baseline justify-between gap-4">
              <h2 id="pista-t" className="v2-display text-[clamp(2rem,4.5vw,3.5rem)]">
                Lo que tratamos
              </h2>
              <p className="v2-label opacity-60">
                {treatments.length} tratamientos · desliza
              </p>
            </div>

            <ul className="v2-track">
              {pista.map((t, i) => (
                <li
                  key={t.id}
                  className="w-[clamp(16rem,26vw,23rem)] border border-lume/20 p-6"
                  style={{ borderColor: "rgba(247,242,236,0.2)" }}
                >
                  <div className="flex items-baseline justify-between">
                    <span className="v2-label opacity-50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="v2-label opacity-50">{t.category}</span>
                  </div>

                  {t.conditionImage && (
                    <div className="relative mt-5 aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={t.conditionImage.src}
                        alt={t.conditionImage.alt}
                        fill
                        sizes="(min-width: 768px) 26vw, 80vw"
                        className="object-cover"
                        quality={68}
                      />
                    </div>
                  )}

                  <h3 className="mt-5 text-[1.375rem] font-bold leading-tight">
                    {t.name}
                  </h3>
                  <p className="v2-body mt-3 opacity-70">{t.summary}</p>

                  <p className="mt-6 text-[1.125rem] font-bold">
                    {t.price !== null ? clp(t.price) : "Según evaluación"}
                  </p>
                </li>
              ))}

              <li className="flex w-[clamp(14rem,20vw,18rem)] items-center">
                <Link href="/servicios" className="v2-btn w-full">
                  Ver todos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ══════════ 6 · FOCO DEL MES ══════════ */}
      <section className="v2-overlap v2-grain relative py-[clamp(5rem,12vw,9rem)]">
        <div className="v2-shell relative z-[2]">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="v2-label opacity-60">Agosto · Foco del mes</p>
            <p className="v2-label opacity-60">01 / 01</p>
          </div>

          <h2 className="v2-display mt-8 max-w-[18ch]">
            Empieza ahora,
            <br />
            llega al verano <span className="v2-serif">tratado</span>
          </h2>

          <div className="v2-rule mt-12" />

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <p className="v2-lead max-w-[30ch]">
                La uña sana no se recupera: crece.
              </p>
              <p className="v2-body mt-6 max-w-[46ch] opacity-70">
                Una uña del pie tarda entre nueve y doce meses en renovarse por
                completo. El mes en que empiezas define en qué estado llegas al
                verano — y agosto es el último en que todavía alcanza.
              </p>

              <div className="v2-rule mt-10" />
              <div className="flex items-baseline justify-between gap-6 py-6">
                <span className="v2-label opacity-60">Precio normal</span>
                <span className="v2-body opacity-60 line-through">
                  {clp(foco.listPrice!)}
                </span>
              </div>
              <div className="v2-rule" />
              <div className="flex flex-wrap items-baseline justify-between gap-4 py-7">
                <span className="v2-label">Lanzamiento</span>
                <span className="v2-zoom v2-display text-[clamp(2.5rem,6vw,5rem)]">
                  {clp(foco.price!)}
                </span>
              </div>
              <div className="v2-rule" />

              <div className="mt-9">
                <WhatsAppCTA
                  context={{ kind: "treatment", treatment: foco.name }}
                  size="lg"
                />
              </div>
              <p className="v2-body mt-6 max-w-[48ch] text-[0.9375rem] opacity-55">
                Sin límite de sesiones hasta completar el ciclo. El tiempo de
                renovación varía según la persona y su adherencia al tratamiento.
              </p>
            </div>

            <div className="lg:pt-2">
              <BeforeAfter data={caso} ratio="4 / 3" onDark />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 7 · CIERRE ══════════ */}
      <section className="relative overflow-hidden py-[clamp(6rem,14vw,11rem)]">
        <HeroMedia
          video="preparacion"
          alt="Enfermera de la clínica preparándose antes de un procedimiento"
          veil="fuerte"
          tone="neutro"
        />
        <div className="v2-shell relative z-10">
          <h2 className="v2-display max-w-[15ch]">
            Partamos por <span className="v2-serif">la evaluación</span>
          </h2>

          <div className="v2-rule mt-12" />

          <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="v2-label opacity-60">Evaluación</p>
              <p className="v2-display mt-3 text-[clamp(2.5rem,5.5vw,4.5rem)]">
                Gratis
                <span className="v2-serif ml-4 text-[0.45em] opacity-60">
                  durante agosto
                </span>
              </p>
              <p className="v2-body mt-3 opacity-60">
                Precio normal {clinic.evaluation.priceDisplay}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <WhatsAppCTA context={{ kind: "evaluation" }} size="lg" />
              <Link href="/agendar" className="v2-btn">
                Agendar online
              </Link>
            </div>
          </div>

          <div className="v2-rule mt-16" />
          <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
            <span className="v2-label opacity-60">
              {clinic.phone.display} · {clinic.address.city}
            </span>
            <span className="v2-label opacity-60">{clinic.hours.display}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
