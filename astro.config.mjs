import image from "@astrojs/image"
import preact from "@astrojs/preact"
import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
    integrations: [
        preact(),
        tailwind(),
        image({
            serviceEntryPoint: "@astrojs/image/sharp",
        }),
    ],
})
