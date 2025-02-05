"use client";
 
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react"; 
import { useRouter } from "next/navigation"; 
import { loginSchema, LoginSchema } from "../validation/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Message } from "@/app/types/message";
import { loginFromApi } from "@/app/(auth)/login/actions/login";
import Messages from "@/app/components/controls/messages";
import { ErrorResponse } from "@/app/interfaces/apiResponse";
import { setErrorMessagesValue } from "@/app/lib/messageHelper";
 
export default function LoginForm() {
 
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);  
 
  const { register, handleSubmit,formState: { errors, isSubmitting } } = useForm<LoginSchema>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
    defaultValues: {      
      email: "Test100@hotmail.com",  
      password: "Password#1" 
    },    
  });  
 
  const handleClearMessages = () => {
    setMessages([]);
  };

  async function login(data: LoginSchema)
  {
    const response = await loginFromApi(data.email, data.password); 
    if(response.status == 200)        
      router.push("/home");        
    else 
    {
      if(response.data)        
        setMessages((response.data as ErrorResponse).messages);    
    }     
  } 

  const onSubmitForm: SubmitHandler<LoginSchema> = async (data) => { 
 
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

    <form className="space-y-2 pb w-2/5" onSubmit={handleSubmit(onSubmitForm)}>
  
      <Messages messages={messages} onClearMessages={handleClearMessages}></Messages>   
     
      <div className="w-full flex flex-col gap-4 space-y-0">

        <h1 className="text-zinc-800 text-lg">Login</h1>

        <div className="w-full">
          <div className="grid grid-cols-12">
            <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-3">Email*</label>
            <input {...register("email")} type="text" maxLength={150} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9" placeholder="email" />
            <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
              {errors.email && errors.email.message}
            </p>
          </div>
          <div className="grid grid-cols-12">
            <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-3 mr-2">Password*</label>
            <input {...register("password")} type="password" maxLength={50} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9" placeholder="password" />
            <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
              {errors.password && errors.password.message}
            </p>
          </div>      
        </div>  
      </div>

      <div className="flex justify-end">
        <button disabled={isSubmitting} className="submit">
          {isSubmitting ? "Logging In" : "Login"}          
        </button> 
      </div>  
    </form> 
)}