import Link from "next/link";

/**
 * Vuelta al inicio desde las páginas interiores.
 *
 * Va fija arriba a la izquierda, a la misma altura que el menú y con el mismo
 * fondo opaco: los dos se leen como un set y flotan sobre cualquier superficie.
 *
 * Se muestra en todos los anchos, no sólo en desktop. El menú se oculta bajo
 * 900px, así que en celular este es el único camino de vuelta que queda — y el
 * grueso del tráfico llega por ahí.
 */
export default function V2Volver() {
  return (
    <Link href="/" className="v2-volver v2-label">
      <span aria-hidden="true">←</span>
      <span>LARRÈRE</span>
      <span className="sr-only">Volver al inicio</span>
    </Link>
  );
}
