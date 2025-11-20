'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Sparkles, Stethoscope, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const servicios = [
  {
    id: 'evaluacion-medica',
    nombre: 'Evaluación Médica',
    descripcion: 'Primera consulta obligatoria con nuestro médico para evaluar tu caso y determinar el tratamiento más adecuado según tu tipo de piel y necesidades específicas.',
    categoria: 'Médico',
    icono: '🩺',
    requiereEvaluacion: false,
    soloMedico: true,
    precio: '$40.000 (Todo medio de pago)',
  },
  {
    id: 'depilacion-laser',
    nombre: 'Depilación Láser',
    subtitulo: 'Dama y Varón',
    descripcion: 'Solución definitiva para el vello no deseado. Utilizamos tecnología láser de última generación que actúa sobre el folículo piloso, inhibiendo su crecimiento de forma progresiva y permanente. Resultados visibles desde las primeras sesiones.',
    categoria: 'Láser',
    icono: '✨',
    requiereEvaluacion: true,
  },
  {
    id: 'laser-rosacea',
    nombre: 'TTO Láser Control Rosácea',
    descripcion: 'Tratamiento especializado para reducir el enrojecimiento facial, controlar los brotes de rosácea y mejorar la apariencia de la piel afectada por esta condición crónica.',
    categoria: 'Láser',
    icono: '🌸',
    requiereEvaluacion: true,
  },
  {
    id: 'limpieza-facial',
    nombre: 'Limpieza Facial',
    subtitulo: 'Clínica Acné y Rosácea',
    descripcion: 'Limpieza profunda especializada para pieles con acné o rosácea. Procedimiento médico que combina extracción, desinfección y tratamiento específico según tu condición.',
    categoria: 'Facial',
    icono: '🧼',
    requiereEvaluacion: true,
  },
  {
    id: 'laser-co2',
    nombre: 'Láser CO₂ Fraccionado',
    descripcion: 'Tratamiento médico de rejuvenecimiento profundo para cicatrices de acné, arrugas pronunciadas, manchas y textura irregular. Estimula la producción de colágeno natural para renovar la piel desde las capas más profundas.',
    categoria: 'Láser',
    icono: '💎',
    requiereEvaluacion: true,
    soloMedico: true,
  },
  {
    id: 'telangiectasia',
    nombre: 'Eliminación Telangiectasia',
    subtitulo: 'Arañitas Vasculares',
    descripcion: 'Tratamiento láser para eliminar pequeños vasos sanguíneos visibles (arañitas rojas) en rostro y cuerpo. Procedimiento preciso que cierra estos capilares sin dañar la piel circundante.',
    categoria: 'Láser',
    icono: '🕸️',
    requiereEvaluacion: true,
  },
  {
    id: 'rejuvenecimiento',
    nombre: 'Rejuvenecimiento Facial y Manos',
    descripcion: 'Tratamiento integral que combina tecnologías láser para mejorar textura, tono, manchas y signos de envejecimiento. Estimula el colágeno natural para lograr un aspecto más juvenil y luminoso.',
    categoria: 'Rejuvenecimiento',
    icono: '✨',
    requiereEvaluacion: true,
  },
  {
    id: 'hirsutismo',
    nombre: 'Tratamiento Hirsutismo Facial',
    descripcion: 'Abordaje médico especializado para el crecimiento excesivo de vello facial en mujeres. Evaluamos las causas hormonales y aplicamos tratamiento láser específico para reducir el vello de forma permanente.',
    categoria: 'Médico',
    icono: '👩‍⚕️',
    requiereEvaluacion: true,
  },
  {
    id: 'prp',
    nombre: 'Plasma Rico en Plaquetas (PRP)',
    descripcion: 'Tratamiento regenerativo que utiliza los factores de crecimiento de tu propia sangre para estimular la producción de colágeno, mejorar la textura de la piel y promover la regeneración celular.',
    categoria: 'Regenerativo',
    icono: '💉',
    requiereEvaluacion: true,
  },
  {
    id: 'camuflaje-capilar',
    nombre: 'Camuflaje Capilar',
    descripcion: 'Técnica avanzada de micropigmentación para disimular áreas de alopecia o baja densidad capilar. Simulamos la apariencia de folículos pilosos naturales para recuperar la estética del cabello.',
    categoria: 'Capilar',
    icono: '👤',
    requiereEvaluacion: true,
  },
  {
    id: 'onicomicosis',
    nombre: 'TTO Onicomicosis',
    descripcion: 'Tratamiento médico láser para hongos en las uñas. La energía láser penetra la uña y elimina el hongo sin dañar el tejido sano, permitiendo el crecimiento de una uña sana.',
    categoria: 'Médico',
    icono: '🦶',
    requiereEvaluacion: true,
  },
  {
    id: 'eliminacion-tatuajes',
    nombre: 'Eliminación de Tatuajes',
    descripcion: 'Tecnología láser Q-Switched para eliminar tatuajes de forma segura. El láser fragmenta las partículas de tinta que tu cuerpo elimina naturalmente. Requiere múltiples sesiones según tamaño y colores.',
    categoria: 'Láser',
    icono: '🎨',
    requiereEvaluacion: true,
  },
  {
    id: 'laser-vascular',
    nombre: 'Tratamiento Láser Vascular',
    descripcion: 'Procedimiento médico especializado para tratar lesiones vasculares más complejas, incluyendo hemangiomas, manchas de vino oporto, rosácea severa y otras malformaciones vasculares. Requiere evaluación y seguimiento médico.',
    categoria: 'Médico',
    icono: '🩸',
    requiereEvaluacion: true,
    soloMedico: true,
  },
  {
    id: 'foliculitis',
    nombre: 'TTO Foliculitis Corporal y Facial',
    descripcion: 'Tratamiento médico para inflamación e infección de los folículos pilosos. Combinamos terapia láser con protocolo médico para eliminar la bacteria, reducir la inflamación y prevenir nuevos brotes.',
    categoria: 'Médico',
    icono: '🔬',
    requiereEvaluacion: true,
  },
  {
    id: 'control-peso',
    nombre: 'Control de Peso',
    subtitulo: 'con Médico',
    descripcion: 'Programa médico integral para el control del peso. Evaluación completa, plan nutricional personalizado y seguimiento médico continuo para lograr tus objetivos de forma saludable y sostenible.',
    categoria: 'Médico',
    icono: '⚖️',
    requiereEvaluacion: true,
    soloMedico: true,
  },
];

const categorias = ['Todos', 'Láser', 'Médico', 'Facial', 'Rejuvenecimiento', 'Regenerativo', 'Capilar'];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ServiciosPage() {
  const [categoriaActiva, setCategoriaActiva] = React.useState('Todos');

  const serviciosFiltrados =
    categoriaActiva === 'Todos'
      ? servicios
      : servicios.filter((s) => s.categoria === categoriaActiva);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory via-sand-light to-sage-light">
      <Navigation />
      
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative pt-24 md:pt-32 pb-12 md:pb-20 px-6 overflow-hidden"
      >
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-sage/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-brown mb-6">
              Nuestros{' '}
              <span className="bg-gradient-gold bg-clip-text text-transparent">
                Tratamientos
              </span>
            </h1>
            <p className="text-base md:text-xl text-brown-light max-w-3xl mx-auto leading-relaxed">
              Salud primero, estética como consecuencia. Cada tratamiento inicia con una evaluación
              médica para garantizar resultados seguros y efectivos.
            </p>
          </motion.div>

          {/* Aviso Importante */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <Card className="glass-effect border-gold/30 shadow-xl">
              <CardContent className="p-6 flex items-start gap-4">
                <Stethoscope className="w-8 h-8 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-brown mb-2 flex items-center gap-2">
                    Evaluación Médica Obligatoria
                    <span className="text-gold">$40.000</span>
                  </h3>
                  <p className="text-brown/80 leading-relaxed">
                    Todos nuestros tratamientos requieren una{' '}
                    <strong>evaluación médica previa</strong> donde determinamos el procedimiento más
                    adecuado según tu tipo de piel, condición específica y objetivos. Aceptamos todo
                    medio de pago.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Filtros por categoría */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaActiva(cat)}
                className={`w-full sm:w-auto px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  categoriaActiva === cat
                    ? 'bg-gradient-gold text-brown shadow-lg scale-105'
                    : 'bg-white/60 text-brown/70 hover:bg-white/80 hover:scale-105'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Grid de Servicios */}
      <section className="pb-12 md:pb-24 px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {serviciosFiltrados.map((servicio) => (
            <motion.div key={servicio.id} variants={item} className="h-full">
              <Card className="h-full glass-effect border-gold/20 hover-lift cursor-pointer group overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                      {servicio.icono}
                    </span>
                    <div className="flex flex-col gap-2 items-end">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gradient-gold text-brown">
                        {servicio.categoria}
                      </span>
                      {servicio.soloMedico && (
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-brown/90 text-ivory flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Miércoles ≥17:30
                        </span>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl md:text-2xl text-brown group-hover:text-gold transition-colors">
                    {servicio.nombre}
                  </CardTitle>
                  {servicio.subtitulo && (
                    <p className="text-sm text-brown/60 italic">{servicio.subtitulo}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-brown/80 leading-relaxed mb-4">
                    {servicio.descripcion}
                  </CardDescription>

                  {servicio.precio && (
                    <div className="mb-4 p-3 bg-gold/10 rounded-lg border border-gold/20">
                      <p className="text-sm font-semibold text-brown flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-gold" />
                        {servicio.precio}
                      </p>
                    </div>
                  )}

                  {servicio.requiereEvaluacion && (
                    <div className="flex items-start gap-2 text-xs text-brown/60 bg-sage/30 p-3 rounded-lg">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Requiere evaluación médica previa</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Final */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="pb-12 md:pb-24 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <Card className="glass-effect border-gold/30 shadow-2xl overflow-hidden">
            <div className="bg-gradient-gold p-6 md:p-12">
              <h2 className="text-2xl md:text-4xl font-bold text-brown mb-4">
                ¿Listo para comenzar tu tratamiento?
              </h2>
              <p className="text-brown/80 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
                Agenda tu evaluación médica y descubre cuál es el mejor tratamiento para ti
              </p>
              <motion.a
                href="/agendar"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brown text-ivory px-6 md:px-8 py-4 rounded-full font-semibold text-base md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Stethoscope className="w-5 h-5" />
                Agendar Evaluación Médica
              </motion.a>
            </div>
          </Card>
        </div>
      </motion.section>
    </div>
  );
}
