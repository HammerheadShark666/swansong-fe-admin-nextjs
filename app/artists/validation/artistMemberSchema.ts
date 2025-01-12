import { z } from "zod"; 

export const memberDetailsSchema = z.object({
  id: z
    .number(),
  artistId: z
    .number(),
  stageName: z
    .string({ message: "Member name is required" }) 
    .min(1, { message: "Member name is required" })
    .max(150, "Member name should be at most 150 characters"),
firstName: z
    .string({ message: "First name is required" }) 
    .min(1, { message: "First name is required" })
    .max(100, "First name should be at most 100 characters"),
middleName: z
    .string()
    .max(100, "Middle name should be at most 100 characters")
    .optional(),
surname: z
    .string({ message: "Surname is required" }) 
    .min(1, { message: "Surname is required" })
    .max(100, "Surname should be at most 100 characters"),
  dateofBirth: z
    .string()
    .optional(),
  dateOfDeath: z
    .string()
    .optional()
});

export type memberDetailsSchema = z.infer<typeof memberDetailsSchema>;