'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Award, Heart, Stethoscope, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const teamMembers = [
  {
    name: 'Cosmetólogas Especialistas',
    role: 'Fundadoras y Expertas en Estética',
    description:
      'Especialistas en tratamientos estéticos y de salud de la piel con más de 7 años de experiencia. Comprometidas con entregar soluciones reales basadas en la salud antes que la estética.',
    icon: '👩‍⚕️',
    color: 'gold',
  },
  {
    name: 'Belén Muñoz',
    role: 'Enfermera Profesional',
    description:
      'Enfermera titulada especializada en procedimientos de salud estética. Encargada de tratamientos invasivos menores y seguimiento post-tratamiento para garantizar resultados seguros.',
    icon: '💉',
    color: 'sage',
  },
  {
    name: 'Dr. Jhon Pablo Mero',
    role: 'Atención Médica Miércoles',
    description:
      'Médico cirujano especializado en tratamientos láser avanzados (CO₂ Fraccionado, Láser Vascular). Realiza evaluaciones médicas obligatorias y procedimientos de alta complejidad.',
    icon: '🩺',
    color: 'brown',
    badge: 'Miércoles ≥17:30',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function EquipoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory via-sand-light to-sage-light">
      <Navigation />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative pt-32 pb-20 px-6 overflow-hidden"
      >
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-10 w-72 h-72 bg-gold/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-sage/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-brown mb-6">
              Nuestro{' '}
              <span className="bg-gradient-gold bg-clip-text text-transparent">Equipo</span>
            </h1>
            <p className="text-xl text-brown-light max-w-3xl mx-auto leading-relaxed">
              Profesionales certificados comprometidos con tu salud y bienestar. Cada tratamiento es
              realizado por especialistas con años de experiencia.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Team Members */}
      <section className="pb-24 px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {teamMembers.map((member) => (
            <motion.div key={member.name} variants={item} className="h-full">
              <Card className="h-full glass-effect border-gold/20 hover-lift cursor-pointer group overflow-hidden">
                <CardHeader>
                  <div className="flex flex-col items-center text-center mb-4">
                    <div
                      className={`w-24 h-24 rounded-full bg-gradient-${member.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span className="text-5xl">{member.icon}</span>
                    </div>
                    {member.badge && (
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-brown/90 text-ivory mb-2">
                        {member.badge}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-2xl text-brown text-center group-hover:text-gold transition-colors">
                    {member.name}
                  </CardTitle>
                  <CardDescription className="text-center font-semibold text-gold">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-brown/80 leading-relaxed text-center">{member.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-brown mb-4">¿Por qué elegirnos?</h2>
            <p className="text-brown/70 text-lg max-w-2xl mx-auto">
              Nuestro compromiso es tu salud y bienestar, con profesionalismo y atención
              personalizada
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-effect border-gold/20 hover-lift text-center h-full">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-gold mb-4">
                    <Award className="w-8 h-8 text-brown" />
                  </div>
                  <h3 className="font-bold text-brown text-lg mb-2">Certificación Profesional</h3>
                  <p className="text-brown/70 text-sm">
                    Equipo completamente certificado con capacitación continua
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-effect border-gold/20 hover-lift text-center h-full">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-sage mb-4">
                    <Stethoscope className="w-8 h-8 text-brown" />
                  </div>
                  <h3 className="font-bold text-brown text-lg mb-2">Evaluación Médica</h3>
                  <p className="text-brown/70 text-sm">
                    Diagnóstico profesional antes de cada tratamiento
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-effect border-gold/20 hover-lift text-center h-full">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-gold mb-4">
                    <Heart className="w-8 h-8 text-brown" />
                  </div>
                  <h3 className="font-bold text-brown text-lg mb-2">Atención Personalizada</h3>
                  <p className="text-brown/70 text-sm">
                    Cada tratamiento adaptado a tus necesidades específicas
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass-effect border-gold/20 hover-lift text-center h-full">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-sage mb-4">
                    <Sparkles className="w-8 h-8 text-brown" />
                  </div>
                  <h3 className="font-bold text-brown text-lg mb-2">Resultados Comprobados</h3>
                  <p className="text-brown/70 text-sm">
                    Más de 7 años de experiencia con resultados reales
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="pb-24 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <Card className="glass-effect border-gold/30 shadow-2xl overflow-hidden">
            <div className="bg-gradient-gold p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-brown mb-4">
                ¿Listo para conocernos?
              </h2>
              <p className="text-brown/80 text-lg mb-8 max-w-2xl mx-auto">
                Agenda tu evaluación médica y conoce a nuestro equipo de profesionales
              </p>
              <motion.a
                href="/agendar"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-brown text-ivory px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Stethoscope className="w-5 h-5" />
                Agendar Evaluación
              </motion.a>
            </div>
          </Card>
        </div>
      </motion.section>
    </div>
  );
}
