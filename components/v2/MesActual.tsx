"use client";

import { useEffect, useState } from "react";
import { mesActual, frases } from "@/lib/campaign";

/**
 * Corrige el mes de la campaña en el navegador.
 *
 * El sitio es estático: el HTML se genera al compilar, así que el mes queda
 * congelado en el momento del despliegue. En octubre seguiría diciendo
 * septiembre hasta que alguien se acuerde de volver a publicar — y una promoción
 * vencida en publicidad sanitaria es exactamente lo que no puede pasar.
 *
 * Esto lo arregla sin servidor: se pinta el mes de la compilación, y después de
 * hidratar se reemplaza por el de verdad. Va en un efecto y no en el primer
 * render a propósito: calcular la fecha durante el render haría que el HTML del
 * servidor y el del cliente no coincidan, y React tira el árbol entero.
 *
 * Se pasa el NOMBRE de la frase y no la función que la arma: de un componente
 * servidor a uno cliente sólo viajan datos serializables, y una función no lo
 * es. El componente busca la frase en lib/campaign.ts, que es donde vive la
 * lógica de cuál corresponde según el mes —«Empieza en octubre, llega al verano
 * tratado» deja de ser cierto en diciembre—.
 */
export default function MesActual({
  inicial,
  frase,
}: {
  /** Lo que se pintó al compilar. Es lo que ven los buscadores. */
  inicial: string;
  /** Cuál de las frases de lib/campaign.ts hay que rearmar. */
  frase: keyof typeof frases;
}) {
  const [texto, setTexto] = useState(inicial);

  useEffect(() => {
    const ahora = frases[frase](mesActual().minuscula);
    if (ahora !== inicial) setTexto(ahora);
  }, [frase, inicial]);

  return <>{texto}</>;
}
