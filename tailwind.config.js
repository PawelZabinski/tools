/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "base-100": "#ffedd8",
        "base-200": "#f3d5b5",
        "base-300": "#e7bc91",
        "base-400": "#d4a276",
        "base-500": "#bc8a5f",
        "base-600": "#a47148",
        "base-700": "#8b5e34",
        "base-800": "#6f4518",
        "base-900": "#603808",

        "dark-base-100": "#171717",
        "dark-base-150": "#1e1e1e",
        "dark-base-200": "#262626",
        "dark-base-300": "#2f1f18",
        "dark-base-400": "#bd5710"
      },
    },
  },
  plugins: [],
}

