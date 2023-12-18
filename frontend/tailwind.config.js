/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", "./node_modules/tw-elements/dist/js/**/*.js"
    ],
    theme: {
        fontFamily: {
            display: ["Varela Round", "sans-serif"]
        },
        extend: {
            colors: {
                'prim-orange': '#FF5F1F',
                'prim-gray': '#5A5A5A',
                'prim-black': '#0C0C0C'
            }
        }
    },
    plugins: [
        require('tw-elements/dist/plugin')
    ],
}