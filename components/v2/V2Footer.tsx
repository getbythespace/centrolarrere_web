import Link from "next/link";
import Image from "next/image";
import { clinic } from "@/lib/clinic";

/**
 * Pie de la v2.
 *
 * La v2 no tenía ninguno: los enlaces a privacidad y términos no aparecían en
 * ninguna de sus páginas, y para un negocio de salud que trata datos personales
 * eso no puede faltar. Trae también el aviso de que la información del sitio no
 * reemplaza una consulta, que es lo mismo que dice la v1.
 *
 * El logo va acá y no en la barra de navegación: arriba ya está el wordmark en
 * la portada y el botón de volver en las interiores, y meterlo una tercera vez
 * lo convertía en ruido.
 */

const REDES = [
  ["Instagram", clinic.social.instagram],
  ["Facebook", clinic.social.facebook],
].filter(([, url]) => Boolean(url)) as Array<[string, string]>;

const LEGALES: Array<[string, string]> = [
  ["/privacidad", "Privacidad"],
  ["/terminos", "Términos"],
];

export default function V2Footer() {
  return (
    <footer className="v2-sup v2-sup--void v2-pie">
      <div className="v2-shell">
        <div className="v2-pie__grid">
          <div className="v2-pie__marca">
            <Image
              src="/marca/logo.png"
              alt=""
              width={112}
              height={112}
              className="v2-pie__logo"
              sizes="112px"
            />
            <p className="v2-body v2-dim v2-pie__tagline">{clinic.tagline}</p>
          </div>

          <nav className="v2-pie__col" aria-label="Contacto">
            <p className="v2-label v2-dim">Contacto</p>
            <ul>
              <li>
                <a href={`tel:${clinic.phone.e164}`} className="v2-enlace">
                  {clinic.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${clinic.email}`} className="v2-enlace">
                  {clinic.email}
                </a>
              </li>
              <li className="v2-dim">
                {clinic.address.street}, {clinic.address.unit}
              </li>
              <li className="v2-dim">
                {clinic.address.city} · {clinic.address.region}
              </li>
              <li className="v2-dim">{clinic.hours.display}</li>
            </ul>
          </nav>

          <nav className="v2-pie__col" aria-label="Sitio">
            <p className="v2-label v2-dim">Sitio</p>
            <ul>
              {[
                ["/servicios", "Tratamientos"],
                ["/equipo", "Equipo"],
                ["/agendar", "Agendar"],
                ["/contacto", "Contacto"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="v2-enlace">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="v2-pie__col">
            <p className="v2-label v2-dim">Legal</p>
            <ul>
              {LEGALES.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="v2-enlace">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {REDES.length > 0 ? (
              <>
                <p className="v2-label v2-dim v2-pie__sub">Redes</p>
                <ul>
                  {REDES.map(([nombre, url]) => (
                    <li key={nombre}>
                      <a
                        href={url}
                        className="v2-enlace"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {nombre}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>

        <div className="v2-rule v2-pie__filete" />

        <div className="v2-pie__legal">
          <p className="v2-label v2-dim">
            © {new Date().getFullYear()} {clinic.legalName}
          </p>
          <p className="v2-body v2-dim v2-pie__aviso">
            La información de este sitio es referencial y no reemplaza una
            consulta médica. Los resultados de cada tratamiento varían según la
            persona.
          </p>
        </div>
      </div>
    </footer>
  );
}
