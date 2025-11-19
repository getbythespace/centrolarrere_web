import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">LARRERE</h3>
            <p className="text-sm text-muted-foreground">
              Centro de belleza y bienestar profesional
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/servicios" className="hover:text-primary transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/equipo" className="hover:text-primary transition-colors">
                  Equipo
                </Link>
              </li>
              <li>
                <Link href="/testimonios" className="hover:text-primary transition-colors">
                  Testimonios
                </Link>
              </li>
              <li>
                <Link href="/certificados" className="hover:text-primary transition-colors">
                  Certificados
                </Link>
              </li>
              <li>
                <Link href="/agendar" className="hover:text-primary transition-colors">
                  Agendar
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacidad" className="hover:text-primary transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-primary transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:larreresaludyestetica@gmail.com" className="hover:text-primary transition-colors">
                  larreresaludyestetica@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+56912345678" className="hover:text-primary transition-colors">
                  +56 9 1234 5678
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/56912345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LARRERE. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
