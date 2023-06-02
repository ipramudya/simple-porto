const defaultTheme = require("tailwindcss/defaultTheme")

const REM = (px) => `${round(px / 16)}rem`

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
                DEFAULT: {
                    css: {
                        h2: {
                            fontSize: theme("fontSize.[2xl][0]"),
                            lineHeight: theme("fontSize.[2xl][2].lineHeight"),
                        },
                        img: {
                            borderRadius: theme("borderRadius.lg"),
                            maxWidth: "80%",
                            margin: "0 auto",
                        },
                    },
                },
                dark: {
                    css: {
                        "--tw-prose-body": theme("colors.dark[5]"),
                        "--tw-prose-headings": theme("colors.dark[8]"),
                        "--tw-prose-invert-body": theme("colors.dark[2]"),
                        "--tw-prose-invert-headings": theme("colors.dark[1]"),
                    },
                },
            }),
        },
    },
    plugins: [require("@tailwindcss/typography")],
}
