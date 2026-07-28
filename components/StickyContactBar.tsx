"use client";

import { useEffect, useState } from "react";
import { trackPhoneClick } from "@/lib/analytics";
import { clinic } from "@/lib/clinic";
import { WhatsAppGlyph } from "./WhatsAppCTA";
import WhatsAppCTA from "./WhatsAppCTA";
import { Phone } from "lucide-react";

/**
 * Barra de contacto fija en mobile.
 *
 * El tráfico llega desde Instagram en celular y decide rápido: el camino a
 * WhatsApp no puede depender de que el usuario scrollee hasta encontrarlo.
 *
 * Aparece recién pasado el hero para no tapar el mensaje principal en el
 * primer pantallazo. Sólo mobile: en desktop el CTA del nav ya está visible
 * todo el tiempo.
 */
export default function StickyContactBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Se usa un sentinel + IntersectionObserver en vez de escuchar `scroll`:
    // no corre JS en cada frame de scroll, que es justo lo que degrada el INP
    // en gama media.
    const sentinel = document.getElementById("sticky-cta-sentinel");
    if (!sentinel) {
      setVisible(true);
      return;
    }

    // `!isIntersecting` por sí solo no distingue "todavía no llegué al
    // sentinel" de "ya pasé el sentinel": en el tope de la página el sentinel
    // está fuera de vista hacia abajo, así que la barra aparecía encima del
    // hero. Hay que mirar de qué lado quedó.
    const update = (entry: IntersectionObserverEntry) => {
      setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    };

    const io = new IntersectionObserver(([entry]) => update(entry), { rootMargin: "0px" });
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 md:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      // Fuera de pantalla no debe ser alcanzable por teclado.
      aria-hidden={!visible}
    >
      <div
        className="flex items-stretch gap-px border-t border-pine bg-paper px-0 pt-0"
        // Respeta la barra de gestos del iPhone.
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <a
          href={`tel:${clinic.phone.e164}`}
          onClick={() => trackPhoneClick("sticky-bar")}
          tabIndex={visible ? undefined : -1}
          className="flex min-h-[52px] min-w-[56px] items-center justify-center bg-pine px-4 text-paper transition-colors hover:bg-pine-deep"
          aria-label={`Llamar al ${clinic.phone.display}`}
        >
          <Phone className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
        </a>
        <a
          href={`https://wa.me/${clinic.phone.wa}?text=${encodeURIComponent("Hola, quiero hacer una consulta.")}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            import("@/lib/analytics").then((m) => m.trackWhatsAppClick("sticky-bar"));
          }}
          tabIndex={visible ? undefined : -1}
          className="flex min-h-[52px] flex-1 items-center justify-center gap-2.5 bg-wa text-[0.9375rem] font-semibold text-wa-ink transition-colors hover:bg-[#1fbb5a]"
        >
          <WhatsAppGlyph className="h-[1.125rem] w-[1.125rem] shrink-0" />
          Escribir por WhatsApp
        </a>
      </div>
    </div>
  );
}

/**
 * Marca dónde termina el hero. La barra aparece cuando este punto sale de
 * pantalla. Va justo después del hero en cada página.
 */
export function StickyCTASentinel() {
  return <div id="sticky-cta-sentinel" aria-hidden="true" className="h-px w-full" />;
}

export { WhatsAppCTA };
