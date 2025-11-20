"use client";

import { motion } from "framer-motion";
import { Award, Shield, CheckCircle, Sparkles, Heart, Stethoscope } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const certifications = [
  {
    title: "Cosmetología Profesional",
    institution: "Instituto Profesional",
    description: "Especialización en tratamientos láser y cuidado de la piel",
    year: "2017",
    icon: "👩‍⚕️",
    color: "gradient-gold"
  },
  {
    title: "Enfermería",
    institution: "Universidad Católica",
    description: "Procedimientos de salud estética y seguimiento de tratamientos",
    year: "2019",
    icon: "💉",
    color: "gradient-sage"
  },
  {
    title: "Operación Equipos Láser",
    institution: "Autorización Sanitaria",
    description: "Certificación para operación de equipos láser médico-estéticos",
    year: "2024",
    icon: "✨",
    color: "gradient-gold"
  },
  {
    title: "Primeros Auxilios",
    institution: "Cruz Roja Chilena",
    description: "Atención de emergencias y RCP",
    year: "2024",
    icon: "🚑",
    color: "gradient-sage"
  },
];

const standards = [
  {
    title: "Evaluación Médica",
    description: "Evaluación previa antes de cualquier tratamiento",
    icon: Stethoscope
  },
  {
    title: "Equipos Certificados",
    description: "Equipamiento láser de última generación",
    icon: Sparkles
  },
  {
    title: "Higiene y Bioseguridad",
    description: "Protocolos de esterilización y material desechable",
    icon: Shield
  },
  {
    title: "Seguimiento",
    description: "Control post-tratamiento",
    icon: Heart
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function CertificadosPage() {
  return (
    <div className="min-h-screen flex flex-col page-enter">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-ivory via-sand-light to-sage-light py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-10 w-96 h-96 bg-gold/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-sage/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-effect border border-gold/30 text-gold text-sm font-semibold shadow-lg badge-pulse">
              <Award className="h-4 w-4" />
              Profesionalismo Certificado
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-brown leading-tight">
              Certificaciones{" "}
              <span className="text-gradient-animated">Profesionales</span>
            </h1>

            <p className="text-xl text-brown/80 max-w-2xl mx-auto leading-relaxed">
              Nuestro equipo cuenta con las certificaciones necesarias para brindarte un servicio profesional y seguro.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={item}
                className={`premium-card glass-effect p-8 rounded-3xl depth-effect relative overflow-hidden group`}
              >
                <div className={`absolute inset-0 bg-${cert.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                
                <div className="relative z-10 space-y-4">
                  <div className={`w-20 h-20 rounded-2xl bg-${cert.color} flex items-center justify-center text-4xl shadow-lg gpu-accelerated group-hover:scale-110 transition-transform`}>
                    {cert.icon}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-brown">{cert.title}</h3>
                    <p className="text-sm font-semibold text-gold">{cert.institution}</p>
                    <p className="text-brown/70 leading-relaxed text-sm">{cert.description}</p>
                  </div>

                  <div className="pt-4 border-t border-gold/20">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-gold icon-interactive" />
                      <span className="text-sm font-semibold text-brown">Certificado {cert.year}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Standards Section */}
      <section className="py-20 bg-gradient-to-br from-ivory to-sand-light">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-8 mb-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-gold shadow-xl">
              <Shield className="h-10 w-10 text-brown icon-bounce" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-brown leading-tight">
              Nuestros{" "}
              <span className="text-gradient-animated">Estándares de Calidad</span>
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {standards.map((standard, index) => (
              <motion.div
                key={index}
                variants={item}
                className="premium-card glass-effect p-8 rounded-3xl depth-effect"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-lg gpu-accelerated flex-shrink-0">
                    <standard.icon className="h-8 w-8 text-brown icon-interactive" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-brown">{standard.title}</h3>
                    <p className="text-brown/70 leading-relaxed">{standard.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/30 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8 glass-effect p-12 rounded-3xl shadow-2xl">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-gold shadow-xl gpu-accelerated">
              <Stethoscope className="h-10 w-10 text-brown icon-bounce" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-brown leading-tight">
              Confianza respaldada por{" "}
              <span className="text-gradient-animated">profesionalismo</span>
            </h2>

            <p className="text-xl text-brown/80 leading-relaxed">
              Cada certificación representa nuestro compromiso con tu seguridad y bienestar. Agenda tu evaluación médica con total confianza.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/agendar">
                <Button
                  size="lg"
                  className="button-ripple bg-gradient-gold hover:shadow-2xl hover:scale-105 transition-all duration-300 text-brown font-bold text-lg px-10 py-7 rounded-full border-2 border-gold-dark card-glow"
                >
                  <Sparkles className="mr-2 h-5 w-5 icon-interactive" />
                  Agendar Evaluación Médica
                </Button>
              </Link>
              <Link href="/equipo">
                <Button
                  size="lg"
                  variant="outline"
                  className="button-ripple bg-white/60 hover:bg-white hover:scale-105 transition-all duration-300 text-brown border-2 border-brown/30 font-semibold text-lg px-10 py-7 rounded-full"
                >
                  Conocer al Equipo
                </Button>
              </Link>
            </div>

            <p className="text-sm text-brown/60 pt-4">
              💚 Evaluación Médica: $40,000 • Todo medio de pago • Lun-Sáb 11-19h
            </p>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
