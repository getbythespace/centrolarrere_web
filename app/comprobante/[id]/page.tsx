"use client"

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function ComprobanteUploadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [file, setFile] = useState<File | null>(null);
  const [amount, setAmount] = useState("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !amount) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('bookingId', id);
      formData.append('file', file);
      formData.append('amount', amount);

      const response = await fetch('/api/payment-proof/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al subir el comprobante');
      }

      toast({
        title: "¡Comprobante enviado!",
        description: "Recibirás un email cuando tu reserva sea confirmada",
      });

      // Redirect to success page
      router.push(`/comprobante/${id}/success`);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "No se pudo subir el comprobante. Inténtalo nuevamente.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle>Subir Comprobante de Pago</CardTitle>
          <CardDescription>
            Sube tu comprobante de transferencia para confirmar tu reserva
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Monto Transferido (CLP)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Ej: 25000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Comprobante</Label>
              <Input
                id="file"
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Formatos aceptados: JPG, PNG, PDF (máx. 5MB)
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg space-y-2 text-sm">
              <p className="font-semibold">Datos para transferencia:</p>
              <p><strong>Banco:</strong> {process.env.NEXT_PUBLIC_BANK_NAME || 'Banco Estado'}</p>
              <p><strong>Cuenta:</strong> {process.env.NEXT_PUBLIC_ACCOUNT_NUMBER || 'XXXXXXXXXX'}</p>
              <p><strong>Titular:</strong> {process.env.NEXT_PUBLIC_ACCOUNT_HOLDER || 'Nombre Titular'}</p>
              <p><strong>RUT:</strong> {process.env.NEXT_PUBLIC_ACCOUNT_RUT || 'XX.XXX.XXX-X'}</p>
            </div>

            <Button type="submit" className="w-full" disabled={uploading}>
              {uploading ? "Subiendo..." : "Enviar Comprobante"}
            </Button>

            <div className="text-center">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                Volver al inicio
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
