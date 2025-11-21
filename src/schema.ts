import * as z from "zod"

export const characterSchema = z.object({
    id: z.number(),
    name: z.string(),
    status: z.string(),
    image: z.string(),
})

export type Character = z.infer<typeof characterSchema>;

export const apiResponseSchema = z.object({
    results: z.array(characterSchema),
    info: z.object({
        count: z.number(),
        pages: z.number(),
        next: z.string().nullable(),
        prev: z.string().nullable(),
    })
})

export type ApiResponse = z.infer<typeof apiResponseSchema>;