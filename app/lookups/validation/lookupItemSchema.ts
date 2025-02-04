import { z } from "zod"; 

export const lookupItemSchema = z.object({
  id: z
    .number(),
  name: z
    .string()  
    .nonempty("Lookkup item is required")
    .max(100, "Birth place should be at most 100 characters"),  
  
});

export type LookupItemSchema = z.infer<typeof lookupItemSchema>;