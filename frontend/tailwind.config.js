/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/tw-elements/dist/js/**/*.js",], theme: {
        fontFamily: {
            display: ["Varela Round", "sans-serif"],
        }, extend: {
            colors: {
                primary: {
                    50: "#fffbeb",
                    100: "#fef3c7",
                    200: "#fde68a",
                    300: "#fcd34d",
                    400: "#fbbf24",
                    500: "#f59e0b",
                    600: "#d97706",
                    700: "#b45309",
                    800: "#92400e",
                    900: "#78350f",
                    950: "#451a03",
                },
                "questify-purple": "#8906E6",
                "prim-orange": "#FF5F1F",
                "prim-gray": "#5A5A5A",
                "prim-black": "#0C0C0C",
            },
        },
    }, plugins: [require("tw-elements/dist/plugin")],
};
