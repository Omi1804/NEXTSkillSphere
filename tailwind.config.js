/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      heading: ["Roboto"],
      body: ["Poppins"],
    },
    extend: {
      animation: {
        "slide-in-from-left": "slideInFromLeft 0.5s forwards",
        "slide-in-from-right": "slideInFromRight 0.5s forwards",
        "slide-in-from-top": "slideInFromTop 0.5s forwards",
        "slide-in-from-bottom": "slideInFromBottom 0.5s forwards",
        "fade-in": "fadeIn 1s forwards",
        "fade-out": "fadeOut 0.5s forwards",
      },
      keyframes: {
        slideInFromLeft: {
          "0%": {
            transform: "translateX(-100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0)",
            opacity: 1,
          },
        },
        slideInFromRight: {
          "0%": {
            transform: "translateX(100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0)",
            opacity: 1,
          },
        },
        slideInFromTop: {
          "0%": {
            transform: "translateY(-100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
        slideInFromBottom: {
          "0%": {
            transform: "translateY(100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
        fadeIn: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        fadeOut: {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
      },
      animationDelay: {
        "delay-250": "250ms",
        "delay-500": "500ms",
        "delay-750": "750ms",
        "delay-1000": "1000ms",
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        ".animate-delay-250": {
          animationDelay: "250ms",
        },
        ".animate-delay-500": {
          animationDelay: "500ms",
        },
        ".animate-delay-750": {
          animationDelay: "750ms",
        },
        ".animate-delay-1000": {
          animationDelay: "1000ms",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
