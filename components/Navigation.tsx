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

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Cierra el menú al navegar. Antes cada <Link> tenía su propio onClick para
  // esto; con el pathname es una sola regla y no se olvida en el siguiente link.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Con el menú abierto el fondo no debe scrollear.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape cierra.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-porcelain/90 backdrop-blur-md">
      <nav className="shell flex h-16 items-center justify-between" aria-label="Principal">
        <Link
          href="/"
          className="font-display text-[1.375rem] font-semibold tracking-tight text-drape-deep"
        >
          LARRÈRE
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-[0.9375rem] transition-colors ${
                  active
                    ? "font-semibold text-drape-deep"
                    : "text-slate-soft hover:bg-drape-wash hover:text-drape-deep"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <WhatsAppCTA context={{ kind: "evaluation" }} size="sm" className="ml-2">
            Escribir
          </WhatsAppCTA>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-md text-drape-deep transition-colors hover:bg-drape-wash md:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </nav>

      {/* El panel se desmonta al cerrar: nada enfocable queda escondido. */}
      {open && (
        <div id="menu-movil" className="border-t border-line-soft bg-porcelain md:hidden">
          <div className="shell flex flex-col gap-1 py-4">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className={`rounded-md px-3 py-3 text-base transition-colors ${
                  pathname === l.href
                    ? "bg-drape-wash font-semibold text-drape-deep"
                    : "text-slate hover:bg-drape-wash"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/agendar"
              className="rounded-md px-3 py-3 text-base text-slate transition-colors hover:bg-drape-wash"
            >
              Agendar online
            </Link>
            <WhatsAppCTA context={{ kind: "evaluation" }} block className="mt-2" />
          </div>
        </div>
      )}
    </header>
  );
}
