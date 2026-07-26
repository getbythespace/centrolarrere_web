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
      fontSize: {
        "display-xl": ["clamp(2.5rem, 9.5vw, 5.25rem)", { lineHeight: "1.02", letterSpacing: "-0.028em" }],
        "display-lg": ["clamp(2.125rem, 7vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.024em" }],
        "display-md": ["clamp(1.75rem, 5vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.018em" }],
        "display-sm": ["clamp(1.375rem, 3.4vw, 1.875rem)", { lineHeight: "1.18", letterSpacing: "-0.014em" }],
        lead: ["clamp(1.0625rem, 2.1vw, 1.3125rem)", { lineHeight: "1.55" }],
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
