import { z } from "zod"; 

export const memberDescriptionSchema = z.object({
  id: z
    .number(),
  description: z
    .string()
    .max(200000, "Member description should be at most 200000 characters"),  
});

export type MemberDescriptionSchema = z.infer<typeof memberDescriptionSchema>;