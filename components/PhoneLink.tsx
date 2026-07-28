"use client";

import { trackPhoneClick } from "@/lib/analytics";
import { clinic } from "@/lib/clinic";

/**
 * Enlace de teléfono que reporta el clic.
 *
 * Existe como componente aparte para que la página de contacto pueda seguir
 * siendo un Server Component: sólo este botón necesita ser cliente.
 */
export default function PhoneLink({ label = "contacto" }: { label?: string }) {
  return (
    <a
      href={`tel:${clinic.phone.e164}`}
      onClick={() => trackPhoneClick(label)}
      className="tnum mt-1 block text-[1.0625rem] text-olive underline decoration-rule underline-offset-4 transition-colors hover:decoration-pine"
    >
      {clinic.phone.display}
    </a>
  );
}
