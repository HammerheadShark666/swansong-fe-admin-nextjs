import { z } from "zod"; 

export const resetPasswordSchema = z.object({  
  email: z
    .string({ message: "Email is required" }) 
    .email()
    .min(8, { message: "Email is required" })
    .max(150, "Email should be at most 150 characters"),
  currentPassword: z
    .string({ message: "Current password is required" }) 
    .min(8, { message: "Current password should be at least 8 characters" })
    .max(50, "Current password should be at most 50 characters"),    
  password: z
    .string({ message: "Password is required" }) 
    .min(8, { message: "Password should be at least 8 characters" })
    .max(50, "Password should be at most 50 characters"),  
  confirmPassword: z
    .string({ message: "Confirm password is required" }) 
    .min(8, { message: "Confirm password should be at least 8 characters" })
    .max(50, "Confirm password should be at most 50 characters"),  
  token: z
    .string({ message: "Token is required" }) 
    .min(10, { message: "Token should be at least 10 characters" })
    .max(100, "Token should be at most 100 characters"),  
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;