module.exports = {
    tabWidth: 4,
    printWidth: 100,
    semi: false,
    singleQuote: false,
    astroAllowShorthand: true,
    plugins: [require.resolve("prettier-plugin-astro"), require("prettier-plugin-tailwindcss")],
    overrides: [
        {
            files: "*.astro",
            options: {
                parser: "astro",
            },
        },
    ],
}
