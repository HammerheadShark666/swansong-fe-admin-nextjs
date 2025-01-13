import { z } from "zod"; 

export const artistMemberDetailsSchema = z.object({
  id: z
    .number(),
  artistId: z
    .number()  
});

export type ArtistMemberDetailsSchema = z.infer<typeof artistMemberDetailsSchema>;