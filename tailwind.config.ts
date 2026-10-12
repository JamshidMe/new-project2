import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFBF6",
          100: "#FBF6EC",
          200: "#F5EBD8",
          300: "#EAD9BC",
        },
        maroon: {
          500: "#8E2F3C",
          600: "#7A2433",
          700: "#651D2A",
          800: "#4B1520",
        },
        gold: {
          300: "#E3C27A",
          400: "#D4A94F",
          500: "#C19239",
          600: "#A97A2A",
        },
        ink: "#2E2119",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        body: ["'Manrope'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 60px -30px rgba(75, 21, 32, 0.35)",
        card: "0 18px 50px -28px rgba(75, 21, 32, 0.45)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        shimmer: "shimmer 3.5s linear infinite",
        float: "float 4s ease-in-out infinite",
        sway: "sway 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
