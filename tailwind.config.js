/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "hsl(30 20% 97%)",
        foreground: "hsl(20 14% 10%)",
        primary: {
          DEFAULT: "hsl(0 74% 28%)",
          foreground: "hsl(0 0% 100%)",
        },
        secondary: {
          DEFAULT: "hsl(30 20% 94%)",
          foreground: "hsl(20 14% 10%)",
        },
        destructive: {
          DEFAULT: "hsl(0 84% 60%)",
          foreground: "hsl(0 0% 98%)",
        },
        muted: {
          DEFAULT: "hsl(30 15% 92%)",
          foreground: "hsl(20 6% 40%)",
        },
        accent: {
          DEFAULT: "hsl(43 74% 52%)",
          foreground: "hsl(0 74% 28%)",
        },
        popover: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(20 14% 10%)",
        },
        card: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(20 14% 10%)",
        },
        border: "hsl(30 15% 88%)",
        input: "hsl(30 15% 88%)",
        ring: "hsl(0 74% 28%)",
      },
      borderRadius: {
        xl: "14px",
        lg: "10px",
        md: "8px",
        sm: "6px",
        xs: "4px",
      },
    },
  },
  plugins: [],
}
