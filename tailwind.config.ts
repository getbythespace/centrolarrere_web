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
        // Superficies. Papel y yeso cálido, no crema amarilla.
        paper: "#F2EEE7",
        sand: {
          DEFAULT: "#E7DFD2",
          deep: "#D8CCBA",
        },
        // Tinta. Ratios medidos sobre --paper.
        espresso: "#241B15", // 14.61:1 AAA
        umber: "#3A2C22", // 11.62:1 AAA
        ink: "#5C4A3D", //  7.26:1 AAA — secundario
        // Señal. Ciruela apagada: lo único que no sale de la piel, y
        // deliberadamente no terracota.
        plum: {
          DEFAULT: "#7A4A5C", // 6.13:1 AA
          deep: "#5E3547", // 8.75:1 AAA
        },
        // Escala de fototipos Fitzpatrick I–VI. Es el sistema de color del
        // sitio, usado como dato. Los tonos 1–4 llevan texto espresso encima;
        // los 5–6, texto papel.
        tone: {
          1: "#F7E7DC",
          2: "#F0D5C2",
          3: "#E3BC9F",
          4: "#C99873",
          5: "#A2714E",
          6: "#6B4630",
        },
        rule: {
          DEFAULT: "#8A7860", // ~3.2:1 — perceptible, la grilla es diseño
          soft: "#C9BCA9", // decorativo
        },
        wa: {
          DEFAULT: "#25D366",
          ink: "#241B15", // 8.52:1 sobre el verde
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
        display: ["var(--font-display)", "Helvetica Neue", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },

      // Salto de escala deliberadamente extremo: la mono de etiqueta vive en
      // 11–12px y el display llega a 8rem. Lo que mata a un diseño beige es
      // que todo quede en el rango medio.
      fontSize: {
        "display-2xl": ["clamp(3.25rem, 13vw, 8rem)", { lineHeight: "0.88", letterSpacing: "-0.045em" }],
        "display-xl": ["clamp(2.625rem, 8.5vw, 5.5rem)", { lineHeight: "0.9", letterSpacing: "-0.038em" }],
        "display-lg": ["clamp(2.125rem, 6vw, 3.75rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(1.625rem, 4vw, 2.5rem)", { lineHeight: "1.02", letterSpacing: "-0.022em" }],
        "display-sm": ["clamp(1.25rem, 2.6vw, 1.625rem)", { lineHeight: "1.12", letterSpacing: "-0.014em" }],
        lead: ["clamp(1.0625rem, 1.9vw, 1.3125rem)", { lineHeight: "1.5" }],
        // Etiquetas de ficha.
        label: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.14em" }],
        "label-lg": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.12em" }],
      },

      // Radio cero en todo el sistema. Es la decisión que más separa este
      // diseño del beige de plantilla.
      borderRadius: {
        none: "0",
        sm: "0",
        DEFAULT: "0",
        md: "0",
        lg: "0",
        xl: "0",
        full: "9999px", // sólo para el punto de estado y avatares
      },

      maxWidth: {
        prose: "58ch",
      },

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
