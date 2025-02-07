import { z } from "zod"; 

export const albumDetailsSchema = z.object({
  id: z
    .number(),
  name: z
    .string({ message: "Album name is required" }) 
    .min(1, { message: "Album name is required" })
    .max(120, "Album name should be at most 120 characters"),
  artistId: z
    .string()
    .min(1, "Please select an artist"), 
  releaseDate: z
    .string()
    .optional(),
  recordedDate: z
    .string()
    .optional(),
  labelId: z
    .string()
    .optional(),
  studioId: z
    .string()
    .optional(),
  producers: z
    .string()  
    .max(250, "Producers should be at most 250 characters"),
  arrangers: z
    .string()  
    .max(250, "Arrangers should be at most 250 characters"),
  artwork: z
    .string()  
    .max(100, "Artwork should be at most 100 characters"),   
});

export type AlbumDetailsSchema = z.infer<typeof albumDetailsSchema>;