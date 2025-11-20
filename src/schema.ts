import * as z from "zod"

const characterSchema = z.object({
    id: z.number(),
    name: z.string(),
    status: z.string(),
    image: z.string(),
})

export type Character = z.infer<typeof characterSchema>;

const apiResponseSchema = z.object({
    results: z.array(characterSchema),
})

export type ApiResponse = z.infer<typeof apiResponseSchema>;