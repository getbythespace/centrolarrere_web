"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import WhatsAppCTA from "./WhatsAppCTA";

const LINKS = [
  { href: "/servicios", label: "Tratamientos" },
  { href: "/resultados", label: "Resultados" },
  { href: "/equipo", label: "Equipo" },
  { href: "/contacto", label: "Contacto" },
];

/**
 * Barra de encabezado en clave de ficha: papel, filete inferior de 1px, y los
 * enlaces en mono con caja alta. Sin sombra ni radio — la separación la da el
 * filete, no la elevación.
 */
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/95 backdrop-blur-sm">
      <nav className="shell flex h-16 items-center justify-between" aria-label="Principal">
        <Link
          href="/"
          className="font-display text-[1.5rem] leading-none tracking-tight text-espresso"
        >
          LARRÈRE
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`mono border-b pb-0.5 text-label uppercase transition-colors ${
                  active
                    ? "border-espresso text-espresso"
                    : "border-transparent text-ink hover:border-rule hover:text-espresso"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <WhatsAppCTA context={{ kind: "evaluation" }} size="sm" className="ml-1">
            Escribir
          </WhatsAppCTA>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 flex h-11 w-11 items-center justify-center text-espresso transition-colors hover:bg-sand md:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div id="menu-movil" className="border-t border-rule bg-paper md:hidden">
          <div className="shell flex flex-col py-2">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className={`mono border-b border-rule/40 py-4 text-label uppercase transition-colors ${
                  pathname === l.href ? "font-semibold text-espresso" : "text-ink"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/agendar"
              className="mono border-b border-rule/40 py-4 text-label uppercase text-ink"
            >
              Agendar online
            </Link>
            <WhatsAppCTA context={{ kind: "evaluation" }} block className="mt-4 mb-2" />
          </div>
        </div>
      )}
    </header>
  );
}
