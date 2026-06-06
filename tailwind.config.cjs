/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#05070d",
        graphite: "#0c111d",
        cobalt: "#008cff",
        ice: "#f5f9ff",
        chrome: "#c9d4e4"
      },
      boxShadow: {
        glow: "0 0 48px rgba(0, 140, 255, 0.32)",
        chrome: "inset 0 1px 0 rgba(255,255,255,0.18), 0 18px 60px rgba(0,0,0,0.42)"
      },
      backgroundImage: {
        "lux-gradient": "linear-gradient(135deg, rgba(0,140,255,0.24), rgba(201,212,228,0.08) 45%, rgba(255,255,255,0.12))",
        "panel-gradient": "linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.035))"
      }
    }
  },
  plugins: []
};
