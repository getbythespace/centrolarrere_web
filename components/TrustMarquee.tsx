import Link from "next/link";
import { campaign } from "@/lib/campaign";

/**
 * Cinta de promociones del mes.
 *
 * Antes decía cosas genéricas —«enfermería titulada», «fototipos I–VI»— que ya
 * están dichas en otras partes del sitio y no empujaban a nada. Ahora lleva los
 * dos focos del mes con su precio, y todo el bloque es un enlace al catálogo.
 *
 * Sobre el color: ámbar con tinta PINO SÓLIDA. Las opacidades de pino sobre
 * ámbar (75%, 65%, 60%) daban 2.68–3.47:1 y fallaban AA en texto de 10–11px;
 * el pino pleno da 5.03:1. En un fondo saturado no hay margen para atenuar
 * texto: la jerarquía se hace con peso y tamaño, no con opacidad.
 */

const PROMOS = [
  { titulo: "Onicomicosis plantar", precio: "$499.990", antes: "$750.000", nota: "Sin límite de sesiones" },
  { titulo: "Pack acné · 6 meses", precio: "$169.990", antes: null, nota: "Una limpieza por semana" },
  { titulo: "Evaluación médica", precio: "Gratis en agosto", antes: "$40.000", nota: null },
];

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="marquee__track" aria-hidden={hidden || undefined}>
      {PROMOS.map((p) => (
        <li
          key={p.titulo}
          className="flex shrink-0 items-baseline gap-2.5 whitespace-nowrap px-6 py-0.5 text-pine"
        >
          <span aria-hidden="true">／</span>
          <span className="mono text-[0.6875rem] font-semibold uppercase tracking-[0.12em]">
            {p.titulo}
          </span>
          {p.antes && (
            <span className="mono text-[0.6875rem] line-through">{p.antes}</span>
          )}
          <span className="mono text-[0.8125rem] font-bold">{p.precio}</span>
          {p.nota && <span className="mono text-[0.625rem] uppercase">{p.nota}</span>}
        </li>
      ))}
    </ul>
  );
}

export default function TrustMarquee() {
  if (!campaign.active) return null;

  return (
    <Link
      href="/servicios"
      className="block border-y-2 border-pine bg-ambar py-3 transition-opacity hover:opacity-90"
    >
      {/* Sin `aria-label`: el texto visible ya describe el enlace, y un rótulo
          que no contiene ese texto rompe la correspondencia entre lo que se ve
          y lo que se anuncia (label-content-name-mismatch). */}
      <span className="sr-only">Ver promociones del mes en el catálogo</span>
      <div className="marquee" aria-hidden="true">
        <Track />
        <Track hidden />
      </div>
    </Link>
  );
}
