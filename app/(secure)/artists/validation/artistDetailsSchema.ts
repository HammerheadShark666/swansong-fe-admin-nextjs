import { z } from "zod"; 

export const artistDetailsSchema = z.object({
  id: z
    .number(),
  name: z
    .string({ message: "Artist name is required" }) 
    .min(1, { message: "Artist name is required" })
    .max(100, "Artist name should be at most 100 characters"),
  countryId: z
    .string() 
    .optional(),
  formationYear: z
    .string()
    .optional(),
  disbandYear: z
    .string()
    .optional()  
});

export type ArtistDetailsSchema = z.infer<typeof artistDetailsSchema>;