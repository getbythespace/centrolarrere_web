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
        // Superficies. Beige cálido.
        paper: "#FEF7E5",
        sand: {
          DEFAULT: "#F6EBCF",
          deep: "#EADCB8",
        },
        // Tinta verde. Ratios medidos sobre --paper.
        pine: {
          DEFAULT: "#0D3320", // 13.00:1 AAA — texto y superficie oscura
          deep: "#00311E", // 13.48:1 AAA
        },
        // `ink` es el cuerpo de texto: 8.13:1, un escalón claro por debajo del
        // titular en pino, que va a 13.00:1.
        ink: "#3A5139", //  8.13:1 AAA
        olive: "#4D694E", //  5.70:1 AA — terciario, no bajar de acá
        // Salvia: el acento SOBRE pino. El oliva ahí da 2.28:1 y no sirve.
        sage: "#A9C0A4", //  7.12:1 sobre pino (AAA)
        // Ciruela: sólo rótulos de contenido pendiente y de imagen
        // referencial. Se va cuando llegue el contenido real.
        plum: {
          DEFAULT: "#7A4A5C", // 6.63:1 AA
          deep: "#5E3547",
        },
        // --- Colores de campaña -------------------------------------------
        // Se replegaron hacia la paleta. La versión anterior usaba bloques
        // enteros de ámbar y ladrillo, que se despegaban del verde y beige del
        // resto del sitio. Ahora los fondos de campaña son pino, oliva y arena
        // —todos de la familia— y el ámbar queda como ACENTO de texto, no como
        // superficie.
        ambar: "#D98A15", // 5.03:1 sobre pino — sólo texto de acento
        // Rojo pastel para el sello de gratuidad. Lleva tinta pino (6.35:1);
        // con papel encima da 2.05 y falla.
        oferta: "#E0A090",
        // Amarillo de atención para la barra y la cinta de campaña. Sale de la
        // paleta a propósito: es lo único con fecha de vencimiento y tiene que
        // verse desde el otro lado de la pantalla. Tinta pino encima: 7.77:1.
        alerta: "#F2B92B",
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
          DEFAULT: "#6F8168", // 3.92:1 — perceptible, la grilla es diseño
          soft: "#C9BCA9", // decorativo
        },
        wa: {
          DEFAULT: "#25D366",
          // Texto papel sobre este verde da 1.86:1 y falla. Pino da 7.01:1.
          ink: "#0D3320",
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
      // Escala subida en todos los niveles. La versión anterior era correcta y
      // se leía distante: el cuerpo vivía en 15px y las etiquetas en 11px, así
      // que la página entera quedaba en un susurro. Acá el cuerpo parte en 17px
      // y las etiquetas en 12px.
      fontSize: {
        "display-2xl": ["clamp(3.5rem, 13.5vw, 9rem)", { lineHeight: "0.86", letterSpacing: "-0.048em" }],
        "display-xl": ["clamp(2.875rem, 9vw, 6rem)", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(2.375rem, 6.5vw, 4.25rem)", { lineHeight: "0.94", letterSpacing: "-0.032em" }],
        "display-md": ["clamp(1.875rem, 4.4vw, 2.875rem)", { lineHeight: "1.0", letterSpacing: "-0.024em" }],
        "display-sm": ["clamp(1.375rem, 2.8vw, 1.875rem)", { lineHeight: "1.1", letterSpacing: "-0.016em" }],
        lead: ["clamp(1.1875rem, 2.1vw, 1.5rem)", { lineHeight: "1.45", letterSpacing: "-0.008em" }],
        // Cuerpo de texto, un escalón sobre el default.
        body: ["clamp(1rem, 1.15vw, 1.0625rem)", { lineHeight: "1.6" }],
        // Etiquetas de ficha. Subidas de 12px a 14px: a tamaño anterior las
        // etiquetas de categoría y de campo se perdían en la página.
        label: ["0.875rem", { lineHeight: "1.35", letterSpacing: "0.1em" }],
        "label-lg": ["0.9375rem", { lineHeight: "1.35", letterSpacing: "0.09em" }],
        // Etiqueta chica, sólo para datos secundarios dentro de una tarjeta.
        "label-sm": ["0.8125rem", { lineHeight: "1.35", letterSpacing: "0.1em" }],
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
