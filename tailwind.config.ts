// tailwind.config.js
const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      animation: { "pulse-slow": "pulse 6s infinite" },

      // 🔑 Use CSS variables so colors are ready on first paint (and theme-safe)
      colors: {
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
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        backgroundSunny: "hsl(39, 89%, 86%)",
        backgroundSunnyDark: "hsla(42, 97%, 63%, 0.6)",
        accent: {
          DEFAULT: "hsl(145, 63%, 42%)",
          foreground: "hsl(0, 0%, 97%)",
        },
      },
      spacing: { 80: "20rem" },
      borderRadius: { lg: "0.5rem", md: "0.375rem", sm: "0.25rem" },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    plugin(({ addComponents }: { addComponents: (components: Record<string, any>) => void }) => {
      addComponents({
        ".input-default": {
          backgroundColor: "hsl(var(--input))",
          borderWidth: "1px",
          borderColor: "hsl(var(--border))",
          borderRadius: "0.5rem",
        },
      });
    }),
  ],
};
