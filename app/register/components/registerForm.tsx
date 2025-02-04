"use client";
 
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react"; 
import { useRouter } from "next/navigation"; 
import { registerSchema, RegisterSchema } from "../validation/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Message } from "@/types/message";
import Messages from "@/app/components/controls/messages";
import { ErrorResponse } from "@/interfaces/apiResponse";
import { setErrorMessagesValue } from "@/app/lib/messageHelper";
import { registerFromApi } from "../actions/register"; 
 
export default function RegisterForm() {
 
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);  
 
  const { register, handleSubmit,formState: { errors, isSubmitting } } = useForm<RegisterSchema>({
    mode: 'onChange',
    resolver: zodResolver(registerSchema),
    defaultValues: {  
      firstName: "John",
      lastName: "Miller",    
      email: "Test1000@hotmail.com",  
      password: "Password#1",
      confirmPassword: "Password#1"
    },    
  });  
 
  const handleClearMessages = () => {
    setMessages([]);
  };

  async function login(data: RegisterSchema)
  {
    const response = await registerFromApi(data); 
    if(response.status == 200)        
      router.push("/home");        
    else 
    {
      if(response.data)        
        setMessages((response.data as ErrorResponse).messages);    
    }     
  } 

  const onSubmitForm: SubmitHandler<RegisterSchema> = async (data) => { 

    setMessages([]); 

    try 
    {
      login(data);
    } 
    catch(error)
    {
      setErrorMessagesValue(error, setMessages);
    }
  }
 
  return (

    <form className="space-y-2 pb" onSubmit={handleSubmit(onSubmitForm)}>
  
      <Messages messages={messages} onClearMessages={handleClearMessages}></Messages>   
     
      <div className="w-full flex flex-col lg:flex-row gap-4 space-y-0">

        <h1 className="text-blue-200">Login</h1>

        <div className="w-full lg:w-3/6">
        <div className="grid grid-cols-12">
            <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-3">First Name*</label>
            <input {...register("firstName")} type="text" maxLength={50} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9" placeholder="first name" />
            <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
              {errors.firstName && errors.firstName.message}
            </p>
          </div>
          <div className="grid grid-cols-12">
            <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-3">Last Name*</label>
            <input {...register("lastName")} type="text" maxLength={50} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9" placeholder="last name" />
            <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
              {errors.lastName && errors.lastName.message}
            </p>
          </div>
          <div className="grid grid-cols-12">
            <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-3">Email*</label>
            <input {...register("email")} type="text" maxLength={150} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9" placeholder="email" />
            <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
              {errors.email && errors.email.message}
            </p>
          </div>
          <div className="grid grid-cols-12">
            <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-3">Password*</label>
            <input {...register("password")} type="password" maxLength={50} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9" placeholder="password" />
            <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
              {errors.password && errors.password.message}
            </p>
          </div>    
          <div className="grid grid-cols-12">
            <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-3">Confirm Password*</label>
            <input {...register("confirmPassword")} type="password" maxLength={50} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9" placeholder="confirm password" />
            <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
              {errors.confirmPassword && errors.confirmPassword.message}
            </p>
          </div>      
        </div>  
      </div>

      <div className="flex justify-end">
        <button disabled={isSubmitting} className="submit">
          {isSubmitting ? "Registering" : "Registration"}          
        </button> 
      </div>  
    </form> 
)}