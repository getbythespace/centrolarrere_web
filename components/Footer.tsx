import Link from "next/link";
import { clinic } from "@/lib/clinic";
import { waLink } from "@/lib/whatsapp";
import { ToneRule } from "./ToneScale";

/**
 * Pie en clave de colofón: la escala de tonos lo cierra por arriba, los datos
 * van en mono y el logo ocupa una escala grande para que el remate tenga peso.
 *
 * Todo dato de contacto sale de `lib/clinic.ts`.
 */
export default function Footer() {
  return (
    <footer className="surface-ink grain">
      <ToneRule />
      <div className="shell py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_0.9fr_0.9fr]">
          <div>
            <p className="font-display text-[2.25rem] leading-none tracking-tight text-paper">
              LARRÈRE
            </p>
            <p className="mono mt-4 max-w-[26ch] text-[0.6875rem] uppercase leading-relaxed text-sand">
              Estética con criterio clínico · Fototipos I–VI · Evaluación médica
              previa a todo tratamiento
            </p>
          </div>

          <nav aria-label="Navegación del sitio">
            <h2 className="mono text-label uppercase text-sand/70">Sitio</h2>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              {[
                ["/servicios", "Tratamientos"],
                ["/resultados", "Resultados"],
                ["/equipo", "Equipo"],
                ["/agendar", "Agendar online"],
                ["/contacto", "Contacto"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sand transition-colors hover:text-paper"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mono text-label uppercase text-sand/70">Contacto</h2>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              <li>
                <a
                  href={waLink({ kind: "general" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sand transition-colors hover:text-paper"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`tel:${clinic.phone.e164}`}
                  className="tnum text-sand transition-colors hover:text-paper"
                >
                  {clinic.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${clinic.email}`}
                  className="break-all text-sand transition-colors hover:text-paper"
                >
                  {clinic.email}
                </a>
              </li>
              <li className="mono pt-1 text-[0.6875rem] uppercase text-sand/70">
                {clinic.address.city}, {clinic.address.region}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mono text-label uppercase text-sand/70">Horario</h2>
            <p className="mt-4 text-[0.9375rem] text-sand">{clinic.hours.display}</p>
            <p className="mono mt-2 text-[0.6875rem] uppercase text-sand/70">
              {clinic.hours.medical}
            </p>
            <ul className="mt-5 space-y-2 text-[0.875rem]">
              <li>
                <Link
                  href="/privacidad"
                  className="text-sand/80 transition-colors hover:text-paper"
                >
                  Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos"
                  className="text-sand/80 transition-colors hover:text-paper"
                >
                  Términos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* El aviso legal sale de la mono: en caja alta y con tracking ancho
            costaba leerlo, y es justo el texto que tiene que entenderse. Queda
            en Inter, caja normal y a 14px. La mono se reserva al © y a los
            datos, que es donde aporta. */}
        <div className="mt-12 border-t border-sand/25 pt-6">
          <p className="mono text-[0.6875rem] uppercase tracking-wider text-sand/70">
            © {new Date().getFullYear()} {clinic.legalName}
          </p>
          <p className="mt-3 max-w-prose text-[0.875rem] leading-relaxed text-sand/80">
            La información de este sitio es referencial y no reemplaza una
            consulta médica. Los resultados de cada tratamiento varían según la
            persona.
          </p>
        </div>
      </div>
    </footer>
  );
}
