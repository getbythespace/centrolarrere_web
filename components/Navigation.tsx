'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b border-gold/20 sticky top-0 glass-effect z-50 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold text-brown hover:text-gold transition-colors tracking-tight">
          LARRÈRE
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/servicios" className="text-brown/80 hover:text-gold transition-colors font-medium">
            Tratamientos
          </Link>
          <Link href="/equipo" className="text-brown/80 hover:text-gold transition-colors font-medium">
            Equipo
          </Link>
          <Link href="/testimonios" className="text-brown/80 hover:text-gold transition-colors font-medium">
            Testimonios
          </Link>
          <Link href="/contacto" className="text-brown/80 hover:text-gold transition-colors font-medium">
            Contacto
          </Link>
          <Link href="/agendar">
            <Button className="bg-gradient-gold hover:shadow-lg hover:scale-105 transition-all duration-300 text-brown font-semibold rounded-full px-6">
              <Calendar className="mr-2 h-4 w-4" />
              Agendar
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-brown hover:text-gold transition-colors"
          aria-label="Menú"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gold/20 glass-effect">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link 
              href="/servicios" 
              className="text-brown/80 hover:text-gold transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Tratamientos
            </Link>
            <Link 
              href="/equipo" 
              className="text-brown/80 hover:text-gold transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Equipo
            </Link>
            <Link 
              href="/testimonios" 
              className="text-brown/80 hover:text-gold transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonios
            </Link>
            <Link 
              href="/contacto" 
              className="text-brown/80 hover:text-gold transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
            <Link href="/agendar" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-gradient-gold hover:shadow-lg transition-all duration-300 text-brown font-semibold rounded-full px-6">
                <Calendar className="mr-2 h-4 w-4" />
                Agendar
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
