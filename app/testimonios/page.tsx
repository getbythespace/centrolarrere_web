"use client";

import { motion } from "framer-motion";
import { Star, Quote, Heart, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "María José S.",
    age: 35,
    service: "Láser CO₂ Fraccionado",
    rating: 5,
    comment: "Quedé muy contenta con el tratamiento. La doctora me explicó todo súper bien y el resultado fue justo lo que esperaba.",
    date: "Febrero 2024",
    result: "Manchas más claras",
    avatar: "👩",
  },
  {
    name: "Carla P.",
    age: 28,
    service: "Depilación Láser",
    rating: 5,
    comment: "Llevo 5 sesiones y se nota harto la diferencia. Me gusta que sean serias con los tratamientos.",
    date: "Enero 2024",
    result: "Menos vello",
    avatar: "👱‍♀️",
  },
  {
    name: "Belén R.",
    age: 23,
    service: "Tratamiento de Acné",
    rating: 5,
    comment: "Tenía acné hace años y nada me funcionaba. Aquí me hicieron un plan con láser y productos específicos. Mi piel cambió harto.",
    date: "Marzo 2024",
    result: "Menos brotes",
    avatar: "👧",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

export default function TestimoniosPage() {
  const averageRating = 5;

  return (
    <div className="min-h-screen flex flex-col page-enter">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-ivory via-sand-light to-sage-light py-20 overflow-hidden">
        {/* Decorative Elements */}
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
              <Heart className="h-4 w-4" />
              Testimonios Reales
            </div>

            <h1 className="text-4xl md:text-7xl font-bold text-brown leading-tight">
              Testimonios de{" "}
              <span className="text-gradient-animated">nuestras clientas</span>
            </h1>

            <p className="text-xl text-brown/80 max-w-2xl mx-auto leading-relaxed">
              Lo que dicen quienes ya probaron nuestros tratamientos.
            </p>

            {/* Rating Summary */}
            <div className="flex items-center justify-center gap-2 pt-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-8 w-8 fill-gold text-gold icon-bounce"
                    style={{ animationDelay: `${star * 0.1}s` }}
                  />
                ))}
              </div>
              <span className="text-3xl font-bold text-gold ml-2">{averageRating.toFixed(1)}</span>
              <span className="text-brown/60 text-lg">/ 5.0</span>
            </div>
            <p className="text-brown/60 text-sm">
              {testimonials.length} opiniones
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={item}
                className="premium-card glass-effect p-8 rounded-3xl depth-effect relative overflow-hidden group"
              >
                {/* Quote Icon */}
                <Quote className="absolute top-4 right-4 h-16 w-16 text-gold/10 group-hover:text-gold/20 transition-colors" />

                {/* Header */}
                <div className="flex items-start gap-4 mb-6 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center text-3xl shadow-lg gpu-accelerated group-hover:scale-110 transition-transform">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-brown">{testimonial.name}</h3>
                    <p className="text-brown/60 text-sm">{testimonial.age} años • {testimonial.date}</p>
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= testimonial.rating ? 'fill-gold text-gold' : 'text-gold/20'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Service Badge */}
                <div className="inline-block px-4 py-1.5 bg-sage/20 text-brown rounded-full text-sm font-semibold mb-4">
                  {testimonial.service}
                </div>

                {/* Comment */}
                <p className="text-brown/80 leading-relaxed mb-4 relative z-10">
                  "{testimonial.comment}"
                </p>

                {/* Result */}
                <div className="mt-6 pt-6 border-t border-gold/20">
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-5 w-5 text-gold flex-shrink-0 mt-0.5 icon-interactive" />
                    <div>
                      <p className="text-xs font-semibold text-gold uppercase tracking-wide mb-1">Resultado</p>
                      <p className="text-sm text-brown/70">{testimonial.result}</p>
                    </div>
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
        className="py-20 bg-gradient-to-br from-ivory to-sand-light relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/30 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8 glass-effect p-12 rounded-3xl shadow-2xl">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-gold shadow-xl gpu-accelerated">
              <Heart className="h-10 w-10 text-brown icon-bounce" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-brown leading-tight">
              ¿Lista para agendar tu{" "}
              <span className="text-gradient-animated">primera cita?</span>
            </h2>

            <p className="text-xl text-brown/80 leading-relaxed">
              Agenda tu evaluación médica y conoce las opciones que tenemos para ti.
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
              <Link href="/servicios">
                <Button
                  size="lg"
                  variant="outline"
                  className="button-ripple bg-white/60 hover:bg-white hover:scale-105 transition-all duration-300 text-brown border-2 border-brown/30 font-semibold text-lg px-10 py-7 rounded-full"
                >
                  Ver Tratamientos
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
