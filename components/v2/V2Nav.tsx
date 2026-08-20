import Link from "next/link";
import { mostrarResultados } from "@/lib/flags";

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
  ["/v2/contacto", "Contacto"],
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
    </nav>
  );
}
