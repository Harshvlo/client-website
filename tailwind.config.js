/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy:    { DEFAULT: "#1A3A8F", dark: "#0F2566", light: "#2855C8", 50: "#EEF2FF", 100: "#D4DCFF" },
        orange:  { DEFAULT: "#E06000", dark: "#B84D00", light: "#FF8C2A", 50: "#FFF4ED", 100: "#FFE0C2" },
        cream:   "#FAFBFF",
        "light-blue": "#F0F4FF",
        "soft-border": "#DDE3F0",
        graphite: "#4A5568",
        charcoal: "#0F172A",
      },
      fontFamily: {
        heading: ["'Plus Jakarta Sans'", "sans-serif"],
        body:    ["'Inter'",   "sans-serif"],
      },
      boxShadow: {
        navy:       "0 4px 20px rgba(26,58,143,0.25)",
        "navy-sm":  "0 2px 10px rgba(26,58,143,0.15)",
        orange:     "0 4px 20px rgba(224,96,0,0.30)",
        "orange-sm":"0 2px 10px rgba(224,96,0,0.20)",
        card:       "0 2px 16px rgba(26,58,143,0.08)",
        "card-hover":"0 12px 40px rgba(26,58,143,0.15)",
        soft:       "0 4px 24px rgba(0,0,0,0.05)",
      },
      borderRadius: { card:"10px", btn:"6px" },
      backgroundImage: {
        "gradient-navy":   "linear-gradient(135deg, #1A3A8F 0%, #2855C8 100%)",
        "gradient-orange": "linear-gradient(135deg, #E06000 0%, #FF8C2A 100%)",
        "gradient-duo":    "linear-gradient(135deg, #1A3A8F 0%, #E06000 100%)",
        "gradient-hero":   "linear-gradient(150deg, #FAFBFF 0%, #EEF2FF 50%, #F0F4FF 100%)",
      },
    },
  },
  plugins: [],
};
