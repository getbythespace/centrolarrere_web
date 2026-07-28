/**
 * Escala de fototipos de Fitzpatrick (I–VI).
 *
 * Es el motivo estructural del sitio y la razón por la que la paleta es beige:
 * no es decoración, es el instrumento con el que un dermatólogo clasifica la
 * piel antes de calibrar un láser. Aparece en el hero, como divisor de sección
 * y en la página de tratamientos.
 *
 * Por qué está bien numerar acá: el brief vetaba los marcadores 01/02/03 salvo
 * que el contenido sea de verdad una secuencia. I–VI es una escala clínica
 * real, así que el numeral ES el dato.
 *
 * Accesibilidad: los chips 1–4 tienen 1.04–2.21:1 contra el papel, así que la
 * banda siempre lleva filete y separadores — sin eso, los tonos claros no se
 * perciben como elementos distintos. Y como es información, no adorno, va con
 * su propia descripción para lectores de pantalla.
 */

const PHOTOTYPES = [
  { roman: "I", bg: "bg-tone-1", desc: "muy clara, siempre se quema" },
  { roman: "II", bg: "bg-tone-2", desc: "clara, se quema con facilidad" },
  { roman: "III", bg: "bg-tone-3", desc: "intermedia, se quema moderadamente" },
  { roman: "IV", bg: "bg-tone-4", desc: "morena clara, se quema poco" },
  { roman: "V", bg: "bg-tone-5", desc: "morena oscura, rara vez se quema" },
  { roman: "VI", bg: "bg-tone-6", desc: "muy oscura, no se quema" },
];

interface Props {
  /** Muestra los numerales bajo la banda. */
  labelled?: boolean;
  /** Alto de la banda. */
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function ToneScale({ labelled = true, size = "md", className = "" }: Props) {
  const heights = {
    sm: "h-5",
    md: "h-10",
    lg: "h-14",
  };

  return (
    <div className={className}>
      <ul
        className={`flex w-full border border-rule ${heights[size]}`}
        // La escala es dato, no ornamento: se anuncia como lista con su rango.
        aria-label="Escala de fototipos de Fitzpatrick, del I al VI"
      >
        {PHOTOTYPES.map((p, i) => (
          <li
            key={p.roman}
            className={`relative flex-1 ${p.bg} ${i > 0 ? "border-l border-rule/60" : ""}`}
          >
            <span className="sr-only">
              Fototipo {p.roman}: piel {p.desc}
            </span>
          </li>
        ))}
      </ul>

      {/* Los numerales van FUERA de la banda, sobre el papel.
          Medido: encima del chip V (#A2714E) ni el pino (3.31:1) ni el papel
          (3.92:1) alcanzan AA para texto de 10px. Cualquier numeral dentro de
          la banda sería ilegible en ese tramo. Abajo, sobre papel, quedan todos
          a 13:1 — y además se lee como eje de gráfico, que es lo que es. */}
      {labelled && size !== "sm" && (
        <div className="mt-1.5 flex w-full" aria-hidden="true">
          {PHOTOTYPES.map((p) => (
            <span
              key={p.roman}
              className="mono roman flex-1 text-center text-[0.625rem] font-medium text-ink"
            >
              {p.roman}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Variante de línea fina, para cerrar secciones. Reemplaza al típico `<hr>`
 * con algo que pertenece al sistema.
 */
export function ToneRule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex h-1 w-full ${className}`} aria-hidden="true">
      {PHOTOTYPES.map((p) => (
        <span key={p.roman} className={`flex-1 ${p.bg}`} />
      ))}
    </div>
  );
}

export { PHOTOTYPES };
