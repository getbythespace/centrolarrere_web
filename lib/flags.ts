/**
 * Páginas que existen en el proyecto pero todavía no salen al sitio.
 *
 * La idea es tener un solo lugar de verdad: si acá una página está apagada, no
 * aparece en el menú, ni en el pie, ni en el sitemap, y la ruta responde 404.
 * Cuando estaban repartidos, terminabas con un enlace en el pie apuntando a una
 * página que ya no debía verse.
 */

/**
 * /resultados sigue armada y se puede revisar en local, pero no se publica: hoy
 * hay un solo caso y es referencial, no de una paciente. Publicar una página
 * llamada «Resultados» con un caso ilustrativo promete algo que todavía no se
 * puede respaldar, y es justo lo que el SEREMI mira.
 *
 * Para prenderla cuando haya casos reales con consentimiento: poner
 * NEXT_PUBLIC_MOSTRAR_RESULTADOS=1 en el entorno, o borrar este interruptor.
 *
 * Va con prefijo NEXT_PUBLIC_ porque el menú es un componente cliente y una
 * variable sin ese prefijo llega como undefined al bundle del navegador: el
 * enlace habría reaparecido en el menú aunque la ruta diera 404.
 */
export const mostrarResultados =
  process.env.NEXT_PUBLIC_MOSTRAR_RESULTADOS === "1" ||
  process.env.NODE_ENV === "development";
