import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./premium-effects.css";
import { Toaster } from "@/components/ui/toaster";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LARRÈRE - Servicios de Belleza y Bienestar",
  description: "Centro de belleza y bienestar profesional. Agenda tu cita online.",
  keywords: ["belleza", "bienestar", "spa", "tratamientos", "Chile"],
  authors: [{ name: "LARRÈRE" }],
  openGraph: {
    title: "LARRÈRE - Servicios de Belleza y Bienestar",
    description: "Centro de belleza y bienestar profesional. Agenda tu cita online.",
    type: "website",
    locale: "es_CL",
    siteName: "LARRÈRE",
  },
  twitter: {
    card: "summary_large_image",
    title: "LARRÈRE - Servicios de Belleza y Bienestar",
    description: "Centro de belleza y bienestar profesional. Agenda tu cita online.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <LocalBusinessSchema />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
