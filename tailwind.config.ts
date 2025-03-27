import type { Config } from "tailwindcss";

const colors = {
  button: "#F6F6F6",
  background: "#ECECEC",
  guide: "#D9D9D9",
  font2: "#636363",
  font1: "#222222",
  font3: "#FF003C",
  font5: "#FF86A2",
  font4: "#FFE9EE",
};
const colors2 = {
  gray: {
    "10": "#F6F6F6", //button
    "30": "#ECECEC", //background
    "50": "#D9D9D9", //guide
    "70": "#636363", //font2
    "100": "#222", //font1
  },
  red: {
    "20": "#FFE9EE",
    "50": "#FF86A2",
    "100": "#FF003C",
  },
  blue: {
    "20": "#E9F4FF",
    "50": "#86C3FF",
  },
};

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: { ...colors, ...colors2 },
      borderRadius: {
        lg: "8px",
        md: "4px",
      },
      borderColor: { ...colors, ...colors2 },
      width: {
        mobile: "var(--mobile-width)",
      },
      maxWidth: {
        mobile: "var(--mobile-width)",
      },
      minWidth: {
        mobile: "var(--mobile-width)",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      fontSize: {
        "title-sm": ["14px", { fontWeight: "600" }],
        "title-md": ["16px", { fontWeight: "700" }],
        "title-lg": ["18px", { lineHeight: "28px", fontWeight: "700" }],
        "title-xl": ["20px", { fontWeight: "600" }],

        "subtitle-sm": ["12px", { lineHeight: "16px", fontWeight: "400" }],
        "subtitle-md": ["14px", { fontWeight: "500" }],

        body: ["14px", { fontWeight: "400" }],

        "button-xs": ["12px", { fontWeight: "500" }],
        "button-sm": ["14px", { fontWeight: "500" }],
        "button-md": ["16px", { fontWeight: "600" }],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
