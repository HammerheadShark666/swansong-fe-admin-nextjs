import { z } from "zod"; 

export const memberDetailsSchema = z.object({
  id: z
    .number(),
  stageName: z
    .string({ message: "stage name is required" }) 
    .min(1, { message: "stage name is required" })
    .max(150, "stage name should be at most 150 characters"),
  firstName: z
    .string()     
    .max(50, "first name should be at most 50 characters")
    .optional(),
  middleName: z
    .string() 
    .max(50, "middle name should be at most 50 characters")
    .optional(),
  surname: z
    .string() 
    .max(50, "surname should be at most 50 characters")
    .optional(),
  birthPlaceId: z
    .string() 
    .optional(),
  dateOfBirth: z
    .string()
    .optional(),
  dateOfDeath: z
    .string()
    .optional(),
});

export type MemberDetailsSchema = z.infer<typeof memberDetailsSchema>;