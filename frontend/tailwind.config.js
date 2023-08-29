/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#212121",
        cardBackground: "#454545",
        borderColor: "rgb(90, 90, 90)",
        modalBackground: "rgb(39, 39, 42)",
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
    },
  },
  plugins: [],
}

