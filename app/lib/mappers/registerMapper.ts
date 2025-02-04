import { RegisterSchema } from "@/app/register/validation/registerSchema";
import { Register } from "@/types/register"; 

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