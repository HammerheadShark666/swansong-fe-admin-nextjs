import { z } from "zod"; 

export const songSchema = z.object({
  id: z
    .number(),
  title: z
    .string()  
    .nonempty("Song title is required")
    .max(150, "Song title should be at most 150 characters"),  
  length: z    
    .string()
    .refine((value) => {

        if(value == '')
            return true;

        const parts = value.split(":");
        if ((parts.length !== 2) || (parts[0] == '' || parts[1] =='')) return false; 
      
        const [minutes, seconds] = parts.map(Number);
        return (
          !isNaN(minutes) &&
          !isNaN(seconds) &&
          minutes >= 0 &&
          minutes < 60 &&
          seconds >= 0 &&
          seconds < 60
        )})
    .optional()
});

export type SongSchema = z.infer<typeof songSchema>;