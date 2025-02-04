import { z } from "zod"; 

export const registerSchema = z.object({  
  firstName: z
    .string({ message: "First name is required" })   
    .min(2, { message: "First name is required" })
    .max(50, "First name should be at most 50 characters"),
  lastName: z
    .string({ message: "First name is required" })   
    .min(2, { message: "First name is required" })
    .max(50, "First name should be at most 50 characters"),
  email: z
    .string({ message: "Email is required" }) 
    .email()
    .min(8, { message: "Email is required" })
    .max(150, "Email should be at most 150 characters"),
  password: z
    .string({ message: "Password is required" }) 
    .min(8, { message: "Password should be at least 8 characters" })
    .max(50, "Password should be at most 50 characters"),  
  confirmPassword: z
    .string({ message: "Confirm password is required" }) 
    .min(8, { message: "Confirm password should be at least 8 characters" })
    .max(50, "Confirm password name should be at most 50 characters"),  
});

export type RegisterSchema = z.infer<typeof registerSchema>;