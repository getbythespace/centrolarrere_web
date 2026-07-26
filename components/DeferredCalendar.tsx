"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays } from "lucide-react";

/**
 * Iframe de Google Calendar con carga diferida.
 *
 * El embed pesaba 1.8 MB y arrastraba el LCP de /agendar a 3.4 s, porque se
 * montaba de entrada aunque el usuario no hubiera llegado a esa parte de la
 * página. Ahora:
 *
 *  - No se monta hasta que el contenedor se acerca al viewport (200px antes),
 *    o hasta que el usuario lo pide.
 *  - El contenedor reserva su altura desde el inicio ⇒ no hay salto (CLS 0).
 *  - Con `save-data` activo no se carga solo: el usuario decide, porque son
 *    ~1.8 MB de datos móviles.
 *
 * La integración en sí no se toca: misma URL, mismo calendario.
 */

const CALENDAR_SRC =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ26JDj4ZLxIclPNcEfiHAeVvOOmRJyksFOmm2VI--uP3SQLKfLqaMMXPGy8QC4zLzvEAG3Tho7n?gv=true";

export default function DeferredCalendar() {
  const [mount, setMount] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) {
      setSaveData(true);
      return; // con ahorro de datos, sólo bajo demanda
    }

    const el = boxRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMount(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={boxRef}
      // Altura reservada de entrada: el iframe entra sin mover nada.
      className="relative min-h-[42rem] overflow-hidden rounded-lg border border-rule bg-paper"
    >
      {mount ? (
        <>
          {!loaded && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-paper">
              <p className="text-[0.9375rem] text-ink">Cargando calendario…</p>
            </div>
          )}
          <iframe
            src={CALENDAR_SRC}
            title="Calendario de reservas LARRÈRE"
            className="h-[42rem] w-full border-0"
            onLoad={() => setLoaded(true)}
            loading="lazy"
          />
        </>
      ) : (
        <div className="flex min-h-[42rem] flex-col items-center justify-center gap-4 p-8 text-center">
          <CalendarDays className="h-8 w-8 text-plum" aria-hidden="true" strokeWidth={1.5} />
          <p className="text-[1.0625rem] font-semibold text-espresso">
            Calendario de reservas
          </p>
          <p className="max-w-[40ch] text-[0.9375rem] leading-relaxed text-ink">
            {saveData
              ? "Tienes activo el ahorro de datos. El calendario pesa cerca de 2 MB, así que no se carga solo."
              : "Cargando al llegar a esta sección…"}
          </p>
          <button
            type="button"
            onClick={() => setMount(true)}
            className="inline-flex min-h-[44px] items-center rounded-md bg-espresso px-5 py-3 text-[0.9375rem] font-semibold text-paper transition-colors hover:bg-espresso"
          >
            Cargar calendario
          </button>
        </div>
      )}
    </div>
  );
}
