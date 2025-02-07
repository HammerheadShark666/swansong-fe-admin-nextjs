import { z } from "zod"; 

export const loginSchema = z.object({  
  email: z
    .string({ message: "Email is required" }) 
    .email()
    .min(8, { message: "Email is required" })
    .max(150, "Email should be at most 150 characters"),
  password: z
    .string({ message: "Password is required" }) 
    .min(8, { message: "Password should be at least 8 characters" })
    .max(50, "Password should be at most 50 characters"),  
});

export type LoginSchema = z.infer<typeof loginSchema>;