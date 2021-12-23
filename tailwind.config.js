module.exports = {
  content: ["./pages/**/*.{html,liquid}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
