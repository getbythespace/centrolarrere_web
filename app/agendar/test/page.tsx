"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AgendarTestPage() {
  const [testUrl, setTestUrl] = useState("team/cal/30min");
  const [showCalendar, setShowCalendar] = useState(false);

  const handleTest = () => {
    setShowCalendar(true);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/agendar" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
          ← Volver a Agendar
        </Link>
        
        <h1 className="text-3xl font-bold mb-6">Probar Calendario Cal.com</h1>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm mb-6">
          <h2 className="font-semibold mb-4">Configuración de Prueba</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                URL de Cal.com (sin https://cal.com/)
              </label>
              <Input
                value={testUrl}
                onChange={(e) => setTestUrl(e.target.value)}
                placeholder="usuario/evento"
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Ejemplos válidos: team/cal/30min, usuario/consultoria
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleTest}>
                Probar Calendario
              </Button>
              <Button 
                variant="outline"
                onClick={() => setTestUrl("team/cal/30min")}
              >
                Restaurar Demo
              </Button>
            </div>
          </div>
        </div>

        {showCalendar && (
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Vista Previa del Calendario</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowCalendar(false)}
              >
                Cerrar
              </Button>
            </div>
            
            <div className="bg-slate-50 p-3 rounded mb-4">
              <p className="text-sm font-mono break-all">
                URL completa: https://cal.com/{testUrl}
              </p>
            </div>

            <iframe
              src={`https://cal.com/${testUrl}`}
              width="100%"
              height="700"
              frameBorder="0"
              className="rounded-lg border"
              title="Calendario de Prueba"
            />
          </div>
        )}

        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">📋 URLs de Prueba</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="font-mono bg-white px-2 py-1 rounded">team/cal/30min</span>
              <span className="text-muted-foreground">- Demo pública de Cal.com (siempre funciona)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono bg-white px-2 py-1 rounded">team/cal/15min</span>
              <span className="text-muted-foreground">- Demo de 15 minutos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono bg-white px-2 py-1 rounded">cal/quick-chat</span>
              <span className="text-muted-foreground">- Chat rápido</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 bg-amber-50 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">⚠️ Si el calendario no carga</h3>
          <ol className="space-y-2 text-sm list-decimal list-inside">
            <li>Verifica que la URL sea correcta (sin https:// ni cal.com/)</li>
            <li>Prueba con las URLs de demo arriba</li>
            <li>Revisa la consola del navegador (F12) para ver errores</li>
            <li>Asegúrate de tener conexión a internet</li>
            <li>Prueba en modo incógnito (algunos bloqueadores de ads bloquean Cal.com)</li>
          </ol>
        </div>

        <div className="mt-6 bg-green-50 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">✅ Configurar tu propio Cal.com</h3>
          <ol className="space-y-2 text-sm list-decimal list-inside">
            <li>Ve a <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">cal.com</a> y crea una cuenta</li>
            <li>Crea un "Event Type" con tu servicio</li>
            <li>En "Share", copia la URL (ejemplo: cal.com/maria/belleza)</li>
            <li>Extrae solo: maria/belleza</li>
            <li>Actualiza en .env.local: NEXT_PUBLIC_CALCOM_EMBED_URL=maria/belleza</li>
            <li>Reinicia el servidor: npm run dev</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
