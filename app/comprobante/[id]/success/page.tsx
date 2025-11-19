import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function ComprobanteSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold">¡Comprobante Recibido!</h1>
        
        <p className="text-muted-foreground">
          Gracias por enviar tu comprobante de pago. Revisaremos tu transferencia y 
          te confirmaremos tu reserva por email en breve.
        </p>

        <div className="bg-slate-100 p-4 rounded-lg text-sm text-left">
          <p className="font-semibold mb-2">Próximos pasos:</p>
          <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
            <li>Recibirás un email de confirmación una vez aprobado tu pago</li>
            <li>Te enviaremos recordatorios 24h y 4h antes de tu cita</li>
            <li>Llega 5-10 minutos antes de tu hora agendada</li>
          </ol>
        </div>

        <Link href="/">
          <Button className="w-full">Volver al inicio</Button>
        </Link>
      </div>
    </div>
  );
}
