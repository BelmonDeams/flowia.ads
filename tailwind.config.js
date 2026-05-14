/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg:           "#070B14",
        sidebar:      "#080D18",
        card:         "#0C1220",
        accent:       "#0066FF",
        accentBright: "#00C3FF",
        textPrimary:  "#D8E8F8",
        textMuted:    "#4F7090",
        green:        "#00D68F",
        amber:        "#FFB800",
        red:          "#FF4D6A",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
}
