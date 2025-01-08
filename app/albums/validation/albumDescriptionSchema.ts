import { z } from "zod"; 

export const albumDescriptionSchema = z.object({
  id: z
    .number(),
  description: z
    .string()
    .max(200000, "Album description should be at most 200000 characters"),  
});

export type AlbumDescriptionSchema = z.infer<typeof albumDescriptionSchema>;