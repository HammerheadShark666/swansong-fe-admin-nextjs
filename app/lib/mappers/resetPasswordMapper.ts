import { ResetPasswordSchema } from "@/app/(auth)/reset-password/validation/resetPasswordSchema";
import { ResetPassword } from "@/app/types/resetPassword";

export function mapResetPassword(data: ResetPasswordSchema) {

  const resetPassword: ResetPassword = {     
    email: data.email,
    currentPassword: data.currentPassword,
    password: data.password,
    confirmPassword: data.confirmPassword,
    token: data.token
  }; 

  return resetPassword;
}