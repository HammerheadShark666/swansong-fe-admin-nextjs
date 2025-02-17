"use client";
 
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";  
import { registerSchema, RegisterSchema } from "../validation/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod"; 
import Messages from "@/app/components/controls/messages"; 
import { setMessagesValue } from "@/app/lib/messageHelper";
import { registerFromApi } from "../actions/register"; 
import TitleBar from "../../components/titlebar";
import { Message } from "@/app/types/message";
import { isRegisterResponse } from "@/app/interfaces/registerResponse";
import { MESSAGE_TYPE } from "@/app/lib/enums";
 
export default function RegisterForm() {
  
  const [messages, setMessages] = useState<Message[]>([]);  
 
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<RegisterSchema>({
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

  const onSubmitForm: SubmitHandler<RegisterSchema> = async (data) => { 

    setMessages([]); 

    try 
    {
      const response = await registerFromApi(data); 
      if(isRegisterResponse(response)) {    
        reset();
        setMessagesValue(MESSAGE_TYPE.INFO, "Registration successful, please check your email for verification instructions.", setMessages);
      }
      else       
        setMessages(response.messages);    
    } 
    catch(error)
    {
      setMessagesValue(MESSAGE_TYPE.ERROR, error, setMessages); 
    }
  }
 
  return (

    <form className="space-y-2 pb w-1/2" onSubmit={handleSubmit(onSubmitForm)}>
  
      <Messages messages={messages} onClearMessages={handleClearMessages}></Messages>        
      <div className="w-full flex flex-col gap-4 space-y-0">
        <div className="w-full flex justify-center">
          <h1 className="text-zinc-800 text-lg">Register</h1>
        </div>
        <TitleBar></TitleBar>      
        <div className="w-full lg:full">
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
            <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-3 mr-2">Confirm Password*</label>
            <input {...register("confirmPassword")} type="password" maxLength={50} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9" placeholder="confirm password" />
            <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
              {errors.confirmPassword && errors.confirmPassword.message}
            </p>
          </div>      
        </div>  
      </div>

      <div className="flex justify-end">
        <button disabled={isSubmitting} className="submit">
          {isSubmitting ? "Registering" : "Register"}          
        </button> 
      </div>  
    </form> 
)}