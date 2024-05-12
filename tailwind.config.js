/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primarycolor01: "#69e3fc",
      primarycolor02: "#ffea80",
      primarycolor: "#69e3fc",
      blue: "#1fb6ff",
      primarycolorvariant01: "#b4f1fd",
      primarycolorvariant02: "#e6fafe",
      primarycolorvariant03: "#e5c000",
      secondarycolor: "#ff7733",
      primarytextcolor: "#000",
      inputfieldcolor: "#ccc",
      tabbordercolor: "#666",
      bgcolor: "#f7f6e8",
      tabbgcolor: "#F9F9FA",
      tabtopnotactive: "#D9D9D9",
      aColor: "#6ED669",
      bColor: "#FFD166",
      cColor: "#FF6B6B",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        gridContent:
          "[full-start] var(--full) [feature-start] var(--feature) [content-start] var(--content) [content-end] var(--feature) [feature-end] var(--full) [full-end]",
      },
      ringOffsetWidth: {
        2: "2px",
      },
      ringWidth: {
        2: "2px",
      },
    },
  },
  variants: {
    extend: {
      ringWidth: ["focus"],
      ringOffsetWidth: ["focus"],
      ringColor: ["focus"],
    },
  },
  plugins: [],
};
