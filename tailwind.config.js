/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

const Myclass = plugin(function ({ addUtilities }) {
  addUtilities({
    ".my-rotate-y-180": {
      transform: "rotateY(180deg)",
    },
    ".preserve-3d": {
      transformStyle: "preserve-3d",
    },
    ".perspective": {
      perspective: "1000px",
    },
    ".backface-hidden": {
      backfaceVisibility: "hidden",
    },
  });
});

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slide: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-200%)" },
        },
        blurtext: {
          "0%": { filter: "blur(0px)" },
          "100%": { filter: "blur(4px)" },
        },
      },
      animation: {
        slide: " slide 25s linear infinite",
        "blur-text-0": "blur-text 1.5s 0s infinite linear alternate",
      },
      backgroundImage:{
        v: "url('https://ibighit.com/bts/images/bts/discography/v/layover/discography-cover.png')"
      }
    },
  },
  plugins: [Myclass],
};
