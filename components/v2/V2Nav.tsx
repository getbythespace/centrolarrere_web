import Link from "next/link";
import { mostrarResultados } from "@/lib/flags";
import { clinic } from "@/lib/clinic";

/**
 * Barra de navegación de la v2: fija arriba, centrada, opaca.
 *
 * Vive acá y no dentro de cada página porque son cuatro las que la usan y el
 * indicador que viaja depende de --n, el número de enlaces. Con una copia por
 * página, ocultar un enlace —como /resultados mientras no se publique— habría
 * dejado el indicador descuadrado en las que se olvidara actualizar.
 */
const ENLACES: Array<[string, string]> = [
  ["/v2/servicios", "Tratamientos"],
  ...(mostrarResultados
    ? ([["/v2/resultados", "Resultados"]] as Array<[string, string]>)
    : []),
  ["/v2/equipo", "Equipo"],
  ["/v2/agendar", "Agendar"],
];

export default function V2Nav() {
  return (
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

      {/* WhatsApp siempre a mano, sólo en pantalla chica. La v1 tenía una barra
          fija para esto; acá va dentro de la misma barra en vez de apilar dos,
          que en un teléfono se comerían media pantalla. En desktop se oculta:
          ahí cada sección ya trae su CTA. */}
      <a
        href={`https://wa.me/${clinic.phone.wa}?text=${encodeURIComponent(
          "Hola, quiero hacer una consulta.",
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="v2-pill__wa"
        aria-label="Escribir por WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          width="19"
          height="19"
          aria-hidden="true"
          fill="currentColor"
        >
          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.48.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
          <path d="M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.94L2.1 22l5.34-1.4a9.82 9.82 0 0 0 4.6 1.17h.01c5.43 0 9.85-4.42 9.86-9.86A9.79 9.79 0 0 0 12.04 2zm0 17.98h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.14 8.14 0 0 1-1.25-4.36c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.86 5.8 2.41a8.15 8.15 0 0 1 2.4 5.8c0 4.52-3.68 8.19-8.2 8.19z" />
        </svg>
      </a>
    </nav>
  );
}
