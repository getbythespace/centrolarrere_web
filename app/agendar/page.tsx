'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Calendar, Clock, Stethoscope, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AgendarPage() {
  const [isLoading, setIsLoading] = React.useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory via-sand-light to-sage-light">
      <Navigation />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-32 pb-12 px-6"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-gold mb-6"
          >
            <Calendar className="w-5 h-5 text-brown" />
            <span className="font-semibold text-brown">Agenda Online 24/7</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold text-brown mb-6">
            Agenda tu{' '}
            <span className="bg-gradient-gold bg-clip-text text-transparent">
              Evaluación Médica
            </span>
          </h1>
          <p className="text-xl text-brown/70 max-w-3xl mx-auto leading-relaxed">
            Selecciona el día y horario que mejor te acomode. Todos los tratamientos comienzan con
            una evaluación médica obligatoria.
          </p>
        </div>
      </motion.section>

      {/* Info Cards */}
      <section className="pb-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-effect border-gold/20 hover-lift">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-gold mb-4">
                  <Stethoscope className="w-8 h-8 text-brown" />
                </div>
                <h3 className="font-bold text-brown text-lg mb-2">Evaluación Médica</h3>
                <p className="text-brown/70 text-sm">
                  Primera consulta obligatoria para determinar el tratamiento adecuado
                </p>
                <p className="text-gold font-bold mt-3">$40.000</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-effect border-gold/20 hover-lift">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-sage mb-4">
                  <Clock className="w-8 h-8 text-brown" />
                </div>
                <h3 className="font-bold text-brown text-lg mb-2">Horarios Flexibles</h3>
                <p className="text-brown/70 text-sm">Lunes a Sábado 11:00 - 19:00 hrs</p>
                <p className="text-brown/60 text-xs mt-2">Atención Médica: Miércoles ≥17:30</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="glass-effect border-gold/20 hover-lift">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-gold mb-4">
                  <Phone className="w-8 h-8 text-brown" />
                </div>
                <h3 className="font-bold text-brown text-lg mb-2">¿Prefieres llamar?</h3>
                <a
                  href="tel:+56948446255"
                  className="text-gold hover:text-gold-dark transition-colors font-semibold"
                >
                  +56 9 4844 6255
                </a>
                <p className="text-brown/60 text-xs mt-2">También por WhatsApp</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Google Calendar Embed */}
      <section className="pb-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <Card className="glass-effect border-gold/30 shadow-2xl overflow-hidden">
            <CardContent className="p-0 relative">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-ivory/80 backdrop-blur-sm z-10">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent mb-4"></div>
                    <p className="text-brown/70 font-medium">Cargando calendario...</p>
                  </div>
                </div>
              )}

              {/* Google Calendar Embed */}
              <div className="min-h-[700px] bg-white">
                <iframe
                  src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ26JDj4ZLxIclPNcEfiHAeVvOOmRJyksFOmm2VI--uP3SQLKfLqaMMXPGy8QC4zLzvEAG3Tho7n?gv=true"
                  style={{ border: 0 }}
                  width="100%"
                  height="700"
                  frameBorder="0"
                  onLoad={handleIframeLoad}
                  title="Calendario de reservas LARRÈRE"
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Política de Reservas */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <Card className="border-2 border-red-300/60 bg-gradient-to-br from-red-50/90 to-rose-50/90 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-red-800 text-lg mb-4 flex items-center gap-2">
                  <span className="text-2xl">⚠️</span>
                  Política de Reservas
                </h3>
                <ul className="text-sm text-red-900/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-xl">⏰</span>
                    <span className="font-medium">Tiempo mínimo de aviso: 12 horas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-xl">✅</span>
                    <span>Cancelaciones con ≥12h de anticipación: sin cargo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-xl">❌</span>
                    <span className="font-medium">Cancelaciones con &lt;12h: se pierde la hora reservada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-xl">💰</span>
                    <span className="font-medium">Se requiere abono del 50% para confirmar tu cita</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* Alternative Contact Methods */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="glass-effect border-gold/30 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-brown mb-4">
                    ¿Prefieres agendar por WhatsApp?
                  </h2>
                  <p className="text-brown/70 mb-8 max-w-2xl mx-auto">
                    También puedes escribirnos directamente y te ayudaremos a agendar tu cita de
                    forma personalizada
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <motion.a
                      href="https://wa.me/56948446255?text=Hola,%20me%20gustaría%20agendar%20una%20evaluación%20médica"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 bg-gradient-gold text-brown px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Escribir por WhatsApp
                    </motion.a>

                    <motion.a
                      href="tel:+56948446255"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 bg-white/80 text-brown px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gold/30"
                    >
                      <Phone className="w-5 h-5" />
                      Llamar Ahora
                    </motion.a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
