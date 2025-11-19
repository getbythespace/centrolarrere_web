import Link from "next/link";

export default function TerminosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="text-2xl font-bold">
            LARRERE
          </Link>
        </div>
      </nav>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Términos y Condiciones</h1>
          
          <div className="prose prose-slate max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Aceptación de términos</h2>
              <p>
                Al utilizar nuestro servicio de reservas online, aceptas estos términos y condiciones 
                en su totalidad.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Reservas y pagos</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Se requiere un abono del 50% del valor del servicio para confirmar la reserva</li>
                <li>El abono debe ser pagado dentro de 60 minutos después de hacer la reserva</li>
                <li>Las reservas se confirman solo después de verificar el pago</li>
                <li>El saldo restante se paga en el momento del servicio</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Política de cancelación</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Con 12 horas o más de anticipación:</strong> Cancelación sin cargo, reembolso completo del abono</li>
                <li><strong>Con menos de 12 horas:</strong> Se pierde el abono pagado</li>
                <li><strong>No-show (no presentarse):</strong> Se pierde el abono pagado</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Reprogramación</h2>
              <p>
                Puedes reprogramar tu cita sin costo adicional siempre que lo hagas con al menos 
                12 horas de anticipación. Para reprogramar, contáctanos por email o WhatsApp.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Tiempo de espera</h2>
              <p>
                Te pedimos llegar 5-10 minutos antes de tu hora agendada. Si llegas más de 15 minutos 
                tarde, podríamos necesitar reprogramar tu cita y se aplicarán las políticas de cancelación.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Contraindicaciones</h2>
              <p>
                Es tu responsabilidad informarnos sobre cualquier condición médica, alergia o 
                medicamento que pueda afectar el servicio. LARRÈRE se reserva el derecho de 
                negarse a realizar un servicio si existe riesgo para tu salud.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Modificaciones</h2>
              <p>
                LARRÈRE se reserva el derecho de modificar estos términos en cualquier momento. 
                Los cambios entrarán en vigencia inmediatamente después de su publicación.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Contacto</h2>
              <p>
                Para cualquier consulta sobre estos términos, contáctanos en:
                <br />
                <a href="mailto:larreresaludyestetica@gmail.com" className="text-primary hover:underline">
                  larreresaludyestetica@gmail.com
                </a>
              </p>
            </section>

            <p className="text-sm text-muted-foreground mt-8">
              Última actualización: Octubre 2025
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t bg-slate-50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LARRÈRE. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
