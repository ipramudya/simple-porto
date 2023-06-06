import { defineCollection, z } from "astro:content"

const projectCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        language: z.enum(["en", "id"]),
        category: z.string(),
        image: z.object({
            src: z.string(),
            alt: z.string(),
        }),
        color: z.object({
            dark: z.string(),
            light: z.string(),
        }),
        isWritten: z.boolean().optional(),
        externalLink: z.string(),
        tags: z.array(z.string()).optional(),
    }),
})

export const collections = {
    project: projectCollection,
}
