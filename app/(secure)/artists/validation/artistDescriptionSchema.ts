import { z } from "zod"; 

export const artistDescriptionSchema = z.object({
  id: z
    .number(),
  description: z
    .string()
    .max(200000, "Artist description should be at most 200000 characters"),  
});

export type ArtistDescriptionSchema = z.infer<typeof artistDescriptionSchema>;