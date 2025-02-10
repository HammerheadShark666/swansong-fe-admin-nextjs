import { RegisterSchema } from "@/app/(auth)/register/validation/registerSchema";
import { Register } from "@/app/types/register";


export function mapRegister(data: RegisterSchema) {

  const register: Register = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword    
  }; 

  return register;
}