const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ["Source Sans Pro", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                brand: {
                    1: "#dfcebc",
                    2: "#9e764c",
                },
                dark: {
                    1: "#EDEDED",
                    2: "#A0A0A0",
                    3: "#7E7E7E",
                    4: "#707070",
                    5: "#505050",
                    6: "#3E3E3E",
                    7: "#343434",
                    8: "#2E2E2E",
                    9: "#282828",
                    10: "#232323",
                    11: "#1C1C1C",
                    12: "#161616",
                },
            },
            boxShadow: {
                minimal: "0 8px 30px rgba(0,0,0,.12);",
                "minimal-dark": "0 8px 30px rgba(255,255,255,.12);",
            },
            typography: ({ theme }) => ({
                dark: {
                    css: {
                        "--tw-prose-body": theme("colors.dark[12]"),
                        "--tw-prose-headings": theme("colors.dark[12]"),
                    },
                },
            }),
        },
    },
    plugins: [require("@tailwindcss/typography")],
}
