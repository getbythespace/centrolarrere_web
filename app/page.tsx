import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Sparkles, Shield, Heart } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen page-enter">
      <Navigation />

      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center bg-gradient-to-br from-ivory via-sand-light to-sage-light py-20 md:py-32 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 right-10 w-96 h-96 bg-gold/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-sage/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-effect border border-gold/30 text-gold text-sm font-semibold shadow-lg badge-pulse">
              <Shield className="h-4 w-4 icon-bounce" />
              Enfoque Médico Profesional
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-tight gpu-accelerated">
              <span className="text-brown">Salud Primero,</span>
              <br />
              <span className="text-gradient-animated">
                Estética Como Consecuencia
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-brown/80 max-w-3xl mx-auto leading-relaxed">
              Tratamientos láser y médico-estéticos con evaluación profesional previa. 
              No invasivos, enfoque clínico y resultados reales basados en tu salud.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/agendar">
                <Button 
                  size="lg" 
                  className="button-ripple bg-gradient-gold hover:shadow-2xl hover:scale-105 transition-all duration-300 text-brown font-bold text-lg px-10 py-7 rounded-full border-2 border-gold-dark card-glow"
                >
                  <Calendar className="mr-2 h-5 w-5 icon-interactive" />
                  Agendar Evaluación Médica
                  <ArrowRight className="ml-2 h-5 w-5 icon-interactive" />
                </Button>
              </Link>
              <Link href="/servicios">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="button-ripple bg-white/60 hover:bg-white hover:scale-105 transition-all duration-300 text-brown border-2 border-brown/30 font-semibold text-lg px-10 py-7 rounded-full backdrop-premium"
                >
                  <Sparkles className="mr-2 h-5 w-5 icon-interactive" />
                  Ver Tratamientos
                </Button>
              </Link>
            </div>

            <div className="pt-8 flex items-center justify-center gap-8 text-brown/70">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold">+1200</div>
                <div className="text-sm">Pacientes Tratados</div>
              </div>
              <div className="h-12 w-px bg-brown/20" />
              <div className="text-center">
                <div className="text-3xl font-bold text-gold">100%</div>
                <div className="text-sm">Evaluación Previa</div>
              </div>
              <div className="h-12 w-px bg-brown/20" />
              <div className="text-center">
                <div className="text-3xl font-bold text-gold">No Invasivo</div>
                <div className="text-sm">Enfoque Clínico</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white parallax-section">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="text-center space-y-4 group premium-card cursor-pointer glass-effect p-8 rounded-3xl depth-effect">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-gold shadow-lg group-hover:shadow-2xl transition-shadow gpu-accelerated">
                <Shield className="h-10 w-10 text-brown icon-interactive" />
              </div>
              <h3 className="text-2xl font-bold text-brown">Evaluación Médica Obligatoria</h3>
              <p className="text-brown/70 leading-relaxed">
                Cada tratamiento comienza con evaluación profesional. Determinamos el procedimiento más adecuado según tu tipo de piel y salud.
              </p>
            </div>
            <div className="text-center space-y-4 group premium-card cursor-pointer glass-effect p-8 rounded-3xl depth-effect">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-gold shadow-lg group-hover:shadow-2xl transition-shadow gpu-accelerated">
                <Heart className="h-10 w-10 text-brown icon-interactive" />
              </div>
              <h3 className="text-2xl font-bold text-brown">Enfoque No Invasivo</h3>
              <p className="text-brown/70 leading-relaxed">
                Tecnología láser de última generación. Tratamientos seguros, efectivos y sin cirugía para resultados naturales y duraderos.
              </p>
            </div>
            <div className="text-center space-y-4 group premium-card cursor-pointer glass-effect p-8 rounded-3xl depth-effect">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-gold shadow-lg group-hover:shadow-2xl transition-shadow gpu-accelerated">
                <Sparkles className="h-10 w-10 text-brown icon-interactive" />
              </div>
              <h3 className="text-2xl font-bold text-brown">Soluciones Reales</h3>
              <p className="text-brown/70 leading-relaxed">
                Priorizamos tu salud sobre la estética. Tratamientos basados en diagnóstico clínico, no en tendencias temporales.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
