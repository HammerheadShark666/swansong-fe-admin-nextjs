import { z } from "zod"; 
import { songSchema } from "./songSchema";

export const albumSongSchema = z.object({
  id: z
    .number(),
  albumId: z
    .number(),  
  order: z
    .number()
    .max(10, "Order must not exceed 10"),
  side: z
    .number()
    .max(15, "Side must not exceed 10"),
  song: songSchema
});

export type AlbumSongSchema = z.infer<typeof albumSongSchema>;