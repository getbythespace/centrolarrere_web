import Link from "next/link";
import { clinic } from "@/lib/clinic";
import { waLink } from "@/lib/whatsapp";

/**
 * Todo dato de contacto sale de `lib/clinic.ts`.
 *
 * El footer anterior publicaba el teléfono inventado +56 9 1234 5678 y un
 * wa.me al mismo número falso, además de describir la clínica como "centro de
 * belleza y bienestar" — el posicionamiento contrario al real.
 */
export default function Footer() {
  return (
    <footer className="border-t border-line-soft bg-drape-deep text-porcelain">
      <div className="shell py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-display text-xl font-semibold">LARRÈRE</p>
            <p className="mt-2 max-w-[28ch] text-sm leading-relaxed text-porcelain/80">
              Estética con criterio clínico. Evaluación médica previa a todo
              tratamiento.
            </p>
          </div>

          <nav aria-label="Navegación del sitio">
            <h2 className="text-[0.8125rem] font-semibold uppercase tracking-wider text-porcelain/60">
              Sitio
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                ["/servicios", "Tratamientos"],
                ["/resultados", "Resultados"],
                ["/equipo", "Equipo"],
                ["/agendar", "Agendar online"],
                ["/contacto", "Contacto"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-porcelain/85 transition-colors hover:text-porcelain">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.8125rem] font-semibold uppercase tracking-wider text-porcelain/60">
              Contacto
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href={waLink({ kind: "general" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-porcelain/85 transition-colors hover:text-porcelain"
                >
                  WhatsApp {clinic.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${clinic.phone.e164}`}
                  className="tnum text-porcelain/85 transition-colors hover:text-porcelain"
                >
                  {clinic.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${clinic.email}`}
                  className="break-all text-porcelain/85 transition-colors hover:text-porcelain"
                >
                  {clinic.email}
                </a>
              </li>
              <li className="pt-1 text-porcelain/70">{clinic.address.city}, {clinic.address.region}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[0.8125rem] font-semibold uppercase tracking-wider text-porcelain/60">
              Horario
            </h2>
            <p className="mt-3 text-sm text-porcelain/85">{clinic.hours.display}</p>
            <p className="mt-1 text-sm text-porcelain/70">{clinic.hours.medical}</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/privacidad" className="text-porcelain/70 transition-colors hover:text-porcelain">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-porcelain/70 transition-colors hover:text-porcelain">
                  Términos y condiciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-porcelain/15 pt-6 text-[0.8125rem] text-porcelain/60">
          <p>
            © {new Date().getFullYear()} {clinic.legalName}. Todos los derechos
            reservados.
          </p>
          <p className="mt-1.5 max-w-prose">
            La información de este sitio es referencial y no reemplaza una
            consulta médica. Los resultados de cada tratamiento varían según la
            persona.
          </p>
        </div>
      </div>
    </footer>
  );
}
