"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { clinic } from "@/lib/clinic";
import { trackWhatsAppClick } from "@/lib/analytics";

/**
 * Arma el mensaje de WhatsApp a partir de tres toques.
 *
 * Reemplaza al calendario embebido y al sistema de reservas con transferencia:
 * la vía es WhatsApp y nada más. Lo que hace esto es que el primer mensaje
 * llegue con la información que igual habría que preguntar, en vez de un «hola»
 * que arranca con tres preguntas de vuelta.
 *
 * Reglas para que no genere fricción:
 * - Nada es obligatorio. El botón funciona sin tocar nada.
 * - No se escribe: todo son botones.
 * - Todo cabe en una pantalla, sin pasos ni siguiente.
 * - Nada se envía a ninguna parte hasta que la persona abre WhatsApp; acá no
 *   se guarda ni se transmite ningún dato de salud.
 */

const MOTIVOS = [
  "Rosácea o rojeces",
  "Acné",
  "Hongos en las uñas",
  "Caída del pelo",
  "Manchas o pigmentación",
  "Lunares o verrugas",
  "Alergias en la piel",
  "Otra cosa",
] as const;

const TIEMPOS = ["Hace poco", "Hace meses", "Hace años"] as const;

const MEDICACION = [
  "No estoy en tratamiento",
  "Sí, con medicación",
  "No estoy segura",
] as const;

type Opcion = string | null;

function Grupo({
  titulo,
  opciones,
  valor,
  onChange,
}: {
  titulo: string;
  opciones: readonly string[];
  valor: Opcion;
  onChange: (v: Opcion) => void;
}) {
  return (
    <fieldset className="v2-fs">
      <legend className="v2-label v2-dim">{titulo}</legend>
      <div className="v2-chips">
        {opciones.map((o) => (
          <button
            key={o}
            type="button"
            /* Se puede desmarcar volviendo a tocar: si alguien se equivoca no
               queda obligado a mandar un dato que no quería dar. */
            onClick={() => onChange(valor === o ? null : o)}
            aria-pressed={valor === o}
            className="v2-chip"
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function V2Consulta() {
  const [motivo, setMotivo] = useState<Opcion>(null);
  const [tiempo, setTiempo] = useState<Opcion>(null);
  const [medic, setMedic] = useState<Opcion>(null);

  const partes = [
    motivo ? `Me preocupa: ${motivo.toLowerCase()}.` : null,
    tiempo ? `${tiempo}.` : null,
    medic ? `${medic}.` : null,
  ].filter(Boolean);

  const mensaje = partes.length
    ? `Hola, quiero consultar por una evaluación. ${partes.join(" ")}`
    : "Hola, quiero consultar por una evaluación.";

  const href = `https://wa.me/${clinic.phone.wa}?text=${encodeURIComponent(mensaje)}`;

  // La etiqueta del evento dice qué respondió, sin datos personales: sirve para
  // ver en Meta qué motivo trae más mensajes.
  const etiqueta = `consulta:${motivo ? motivo.toLowerCase().replace(/\s+/g, "-") : "sin-motivo"}`;

  return (
    <div className="v2-consulta">
      <Grupo
        titulo="¿Qué te preocupa?"
        opciones={MOTIVOS}
        valor={motivo}
        onChange={setMotivo}
      />
      <Grupo
        titulo="¿Hace cuánto?"
        opciones={TIEMPOS}
        valor={tiempo}
        onChange={setTiempo}
      />
      <Grupo
        titulo="¿Estás en tratamiento?"
        opciones={MEDICACION}
        valor={medic}
        onChange={setMedic}
      />

      <div className="v2-consulta__pie">
        {/* La vista previa del mensaje: se ve exactamente lo que se va a enviar
            antes de enviarlo. Nadie manda a ciegas un dato de salud. */}
        <div className="v2-preview">
          <p className="v2-label v2-dim">Tu mensaje</p>
          <p className="v2-preview__txt">{mensaje}</p>
        </div>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick(etiqueta)}
          className="v2-consulta__cta"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          Escribir por WhatsApp
        </a>
      </div>

      <p className="v2-body v2-dim v2-consulta__nota">
        Nada de esto se guarda ni se envía hasta que abras WhatsApp. Puedes
        escribir sin responder nada.
      </p>
    </div>
  );
}
