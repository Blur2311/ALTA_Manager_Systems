/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Bao gồm cả các file React và TypeScript
  ],
  theme: {
    extend: {
      colors: {
        orange50: "#FFF2E7",
        orange100: "#FFE3CD",
        orange300: "#FFAC6A",
        orange400: "#FF9138",
        orange500: "#FF7506",
        gray5: "#535261",
        gray50: "#EAEAEC",
        gray100: "#D4D4D7",
        bgGray: "#F6F6F6",
        textGray: "#37474F",
        textGray200: "#A9A9B0",
        textGray300: "#7E7D88",
        textGray400: "#535261",
        textGray500: "#282739",
        textRed: "#E73F3F",
        dotRed: "#EC3740",
        dotGreen: "#34CD26",
        dotBlue: "#5490EB",
        dotGray: "#6C7585",
      },
      boxShadow: {
        sideBarShadow: "0px 4px 6px 0px rgba(219, 219, 219, 0.50)",
        downShadow: "0px 0px 6px 0px #E7E9F2",
        shadowBox: "2px 2px 8px 0px rgba(232, 239, 244, 0.80)",
        infoShadow: "0px 2px 6px 0px rgba(219, 219, 219, 0.50)",
        progressShadow: "2px 2px 15px 0px rgba(70, 64, 67, 0.10)", // pink shadow
        whiteInShadow: "inset 0 0 0 2px white",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"], // thêm font Nunito
      },
    },
  },
  plugins: [],
};
