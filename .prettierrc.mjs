/** @type {import("prettier").Config} */
export default {
    tabWidth: 4,
    printWidth: 120,
    singleQuote: true,
    trailingComma: 'all',
    semi: false,
    plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
    ],
}
