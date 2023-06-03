import image from "@astrojs/image"
import preact from "@astrojs/preact"
import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
    site: "https://pramudyatamir.web.app",
    integrations: [
        preact({
            compat: true,
        }),
        tailwind(),
        image({
            serviceEntryPoint: "@astrojs/image/sharp",
        }),
    ],
    markdown: {
        shikiConfig: {
            theme: "poimandres",
        },
    },
})
