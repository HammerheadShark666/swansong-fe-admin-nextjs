import { z } from "zod"; 

export const forgottenPasswordSchema = z.object({  
  email: z
    .string({ message: "Email is required" }) 
    .email()
    .min(8, { message: "Email is required" })
    .max(150, "Email should be at most 150 characters"),
  
});

export type ForgottenPasswordSchema = z.infer<typeof forgottenPasswordSchema>;