/**
 * Texto que se «entinta» palabra por palabra a medida que entra en pantalla.
 *
 * Dos diferencias con la versión típica de este efecto:
 *
 * 1. Va por palabra, no por carácter. Partir por carácter mete un <span> por
 *    letra —cientos de nodos en un párrafo— y encarece el layout en el celular
 *    de gama media que trae la pauta. Por palabra el efecto se percibe igual.
 *
 * 2. Anima el COLOR, no la opacidad. La versión con `opacity: 0.2` deja el
 *    texto sin revelar por debajo de cualquier umbral de contraste. Acá el
 *    estado de partida es oliva (5.70:1, AA) y el de llegada pino (13.00:1):
 *    aunque la animación se congele a medio camino, todo se lee.
 *
 * Es un Server Component: la división en palabras ocurre al renderizar y no
 * llega JavaScript al cliente.
 */
export default function RevealText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const words = children.split(" ");

  return (
    <p className={`reveal-words ${className}`}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          // El índice desplaza el retardo para que las palabras no se
          // enciendan todas juntas.
          style={{ ["--w" as string]: i }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
