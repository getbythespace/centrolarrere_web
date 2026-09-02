/**
 * Fuente única de verdad de los datos de la clínica.
 *
 * Antes el teléfono vivía en cuatro archivos y dos de ellos tenían un número
 * inventado (+56 9 1234 5678) que un paciente real podía marcar. Todo dato de
 * contacto sale de acá.
 *
 * Los valores marcados REEMPLAZAR son placeholders: no inventamos datos de una
 * clínica real. Están escritos de forma que se noten en pantalla.
 */

export const clinic = {
  name: "LARRÈRE",
  legalName: "LARRÈRE Salud y Estética",
  tagline: "Estética con criterio clínico",

  /** Número real, verificado contra el README y la página de contacto. */
  phone: {
    /** E.164, para tel: y schema.org */
    e164: "+56948446255",
    /** Sólo dígitos, para wa.me */
    wa: "56948446255",
    /** Para mostrar */
    display: "+56 9 4844 6255",
  },

  email: "larreresaludyestetica@gmail.com",

  address: {
    street: "Dieciocho de Septiembre 246",
    /** Oficina dentro del edificio. Va aparte de la calle porque schema.org lo
     *  pide así y porque el mapa necesita la calle sola. */
    unit: "Oficina 905",
    city: "Chillán",
    region: "Región de Ñuble",
    country: "CL",
    /** PENDIENTE: coordenadas exactas de la puerta. Las de abajo son el centro
     *  de Chillán. Se sacan abriendo la dirección en Google Maps y copiando el
     *  par de números de la URL. */
    geo: { lat: "-36.6066", lng: "-72.1034" },
  },

  hours: {
    display: "Lunes a sábado, 11:00 – 19:00",
    /** El médico atiende sólo miércoles desde 17:30. */
    medical: "Atención médica: miércoles desde 17:30",
    spec: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "11:00", closes: "19:00" },
    ],
  },

  /** Único precio confirmado. El resto del catálogo va sin precio a propósito. */
  evaluation: {
    price: 40000,
    priceDisplay: "$40.000",
    note: "Todo medio de pago",
  },

  social: {
    instagram: "https://www.instagram.com/centrolarrere/" as string | null,
    facebook:
      "https://www.facebook.com/profile.php?id=61593659706762" as string | null,
  },
} as const;

/** Formatea CLP sin decimales: $40.000 */
export function clp(value: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}
