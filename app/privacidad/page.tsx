import Link from "next/link";

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="text-2xl font-bold">
            LARRÈRE
          </Link>
        </div>
      </nav>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Política de Privacidad</h1>
          
          <div className="prose prose-slate max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Información que recopilamos</h2>
              <p>
                En LARRÈRE recopilamos información personal cuando agendas una cita, incluyendo:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nombre completo</li>
                <li>Correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Información de pago (comprobantes de transferencia)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Uso de la información</h2>
              <p>
                Utilizamos tu información personal para:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Procesar y confirmar tu reserva</li>
                <li>Enviarte recordatorios de tu cita</li>
                <li>Comunicarnos contigo sobre tu servicio</li>
                <li>Mejorar nuestros servicios</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Protección de datos</h2>
              <p>
                Implementamos medidas de seguridad apropiadas para proteger tu información personal 
                contra acceso no autorizado, alteración, divulgación o destrucción.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Compartir información</h2>
              <p>
                No vendemos, intercambiamos ni transferimos tu información personal a terceros, 
                excepto cuando sea necesario para procesar tu reserva (ej: procesadores de pago).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Tus derechos</h2>
              <p>
                Tienes derecho a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Acceder a tu información personal</li>
                <li>Solicitar correcciones</li>
                <li>Solicitar la eliminación de tus datos</li>
                <li>Oponerte al procesamiento de tus datos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Contacto</h2>
              <p>
                Para cualquier consulta sobre esta política de privacidad, contáctanos en:
                <br />
                <a href="mailto:privacidad@larrere.cl" className="text-primary hover:underline">
                  privacidad@larrere.cl
                </a>
              </p>
            </section>

            <p className="text-sm text-muted-foreground mt-8">
              Última actualización: Octubre 2025
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t bg-espresso-50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LARRÈRE. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
