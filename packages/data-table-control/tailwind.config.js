/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./DataTableControl/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#e6ebff",
          100: "#ccd6ff",
          200: "#99adff",
          300: "#6685ff",
          400: "#335cff",
          500: "#001EFF",
          600: "#001ad9",
          700: "#0015b3",
          800: "#00108d",
          900: "#000c66"
        }
      },
      boxShadow: {
        card: "0 24px 60px -24px rgba(0, 30, 255, 0.35)",
      },
      fontFamily: {
        sans: ["'Segoe UI'", "system-ui", "-apple-system", "BlinkMacSystemFont", "'Helvetica Neue'", "sans-serif"],
      }
    },
  },
  plugins: [],
};
