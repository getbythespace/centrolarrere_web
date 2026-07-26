import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta LARRÈRE. Ratios medidos contra --porcelain (#F2F5F6).
        slate: {
          DEFAULT: "#17202A", // 15.02:1 AAA
          soft: "#3D4A56", //  8.05:1 AAA
        },
        porcelain: {
          DEFAULT: "#F2F5F6",
          lift: "#FAFBFB",
        },
        drape: {
          DEFAULT: "#0E5C63", //  7.02:1 AAA
          deep: "#083F45", // 10.61:1 AAA
          wash: "#E6EEEF",
        },
        // 3.60:1 — válido para ≥24px bold y elementos no textuales.
        // Para texto de tamaño normal usar `pulse-deep`.
        pulse: {
          DEFAULT: "#C8615E",
          deep: "#A6413F", //  5.56:1 AA
          wash: "#F7ECEC",
        },
        line: {
          DEFAULT: "#A8BEC1",
          soft: "#D4DFE0",
        },
        // Verde de marca de WhatsApp. Texto blanco encima falla (1.98:1):
        // usar `wa-ink` (8.29:1).
        wa: {
          DEFAULT: "#25D366",
          ink: "#17202A",
        },

        // Shadcn
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },

      // Escala fluida. El mínimo es lo que ve el tráfico de Instagram, así
      // que se eligió primero el mobile y después el techo de desktop.
      //
      // La escala anterior era correcta y anodina: el hero topaba en 5.25rem y
      // los saltos entre niveles eran chicos, así que nada dominaba. Ahora el
      // display arranca más alto en mobile y llega a 7.5rem, con el interlineado
      // por debajo de 1 en el nivel mayor — a ese tamaño el texto se compone
      // como bloque, no como párrafo.
      fontSize: {
        // Topado en 6rem: a 7.5rem la línea "se trata con" se rompía y dejaba
        // "con" solo en un renglón.
        "display-xl": ["clamp(2.875rem, 9vw, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.038em" }],
        "display-lg": ["clamp(2.375rem, 8vw, 4.75rem)", { lineHeight: "0.98", letterSpacing: "-0.032em" }],
        "display-md": ["clamp(1.875rem, 5.4vw, 3.25rem)", { lineHeight: "1.04", letterSpacing: "-0.024em" }],
        "display-sm": ["clamp(1.4375rem, 3.6vw, 2rem)", { lineHeight: "1.14", letterSpacing: "-0.016em" }],
        lead: ["clamp(1.125rem, 2.3vw, 1.4375rem)", { lineHeight: "1.5", letterSpacing: "-0.011em" }],
        // Cifra grande de dato, para un bloque suelto (precio destacado).
        figure: ["clamp(2rem, 5vw, 3rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        // Cifra dentro de una tira de 3 columnas. Más contenida a propósito:
        // con `figure` un "$40.000" se partía en dos líneas.
        stat: ["clamp(1.375rem, 2.6vw, 1.875rem)", { lineHeight: "1.05", letterSpacing: "-0.022em" }],
      },

      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius)",
        sm: "calc(var(--radius) - 3px)",
      },

      boxShadow: {
        card: "var(--shadow-card)",
        lift: "var(--shadow-lift)",
      },

      maxWidth: {
        prose: "62ch",
      },

      // Sólo transiciones finitas y disparadas por interacción.
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
