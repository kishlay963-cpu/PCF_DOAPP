/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./FluentFormControl/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
        },
      },
      boxShadow: {
        elevated: "0 20px 45px -20px rgba(79, 70, 229, 0.45)",
      },
    },
  },
  plugins: [],
};