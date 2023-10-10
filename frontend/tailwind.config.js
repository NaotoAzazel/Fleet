/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "hsl(var(--background))"
        },
        borderColor: {
          DEFAULT: "hsl(var(--border))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        input: {
          DEFAULT: "hsl(var(--input))"
        }
      },
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px"
        },
      },
    },
    fontFamily: {
      manrope: ['Manrope'],
      inter: ['Inter']
    },
  },
  plugins: [],
}

