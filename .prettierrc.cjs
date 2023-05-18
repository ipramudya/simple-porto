module.exports = {
    tabWidth: 4,
    printWidth: 100,
    semi: false,
    singleQuote: false,
    astroAllowShorthand: true,
    plugins: [require.resolve("prettier-plugin-astro")],
    overrides: [
        {
            files: "*.astro",
            options: {
                parser: "astro",
            },
        },
    ],
}
