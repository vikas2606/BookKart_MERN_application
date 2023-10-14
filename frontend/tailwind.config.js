/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
            "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors:{
      
      "blu":"#0e1e3d",
      "dark-blu":"#07142d",
      "graye":"#4b5563",
      "orng":"#fb7a43",
      "turquoise":"#3dbca1"
    },
    extend: {
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

