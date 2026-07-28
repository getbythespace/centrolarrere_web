/**
 * Cinta de puntos de confianza.
 *
 * Es lo único que se mueve solo en todo el sitio, y está acotado a una franja
 * de 3rem entre dos secciones. Cero JS: la lista se duplica en el marcado y el
 * CSS desplaza el track.
 *
 * Sobre el contenido: son afirmaciones verificables sobre cómo trabaja la
 * clínica, no claims de resultado. Nada acá promete curar nada.
 */

const POINTS = [
  "Evaluación médica previa",
  "Enfermería titulada",
  "Fototipos I–VI",
  "Derivación cuando corresponde",
  "Protocolos de bioseguridad",
  "Seguimiento post-tratamiento",
];

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="marquee__track" aria-hidden={hidden || undefined}>
      {POINTS.map((p) => (
        <li
          key={p}
          className="mono flex shrink-0 items-center gap-3 whitespace-nowrap px-6 text-label uppercase text-sand"
        >
          {/* Separador. Decorativo, así que no se anuncia. */}
          <span aria-hidden="true" className="text-sage">
            ／
          </span>
          {p}
        </li>
      ))}
    </ul>
  );
}

export default function TrustMarquee() {
  return (
    <div className="surface-ink border-y border-rule/40 py-3.5">
      <div className="marquee">
        <Track />
        {/* Segunda copia para que el bucle no tenga costura. Va oculta a
            lectores de pantalla: es la misma lista repetida. */}
        <Track hidden />
      </div>
    </div>
  );
}
