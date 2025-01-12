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
    .min(1, "Please select an country"), 
  formationYear: z
    .number()
    .optional(),
  disbandYear: z
    .number()
    .optional()  
});

export type ArtistDetailsSchema = z.infer<typeof artistDetailsSchema>;