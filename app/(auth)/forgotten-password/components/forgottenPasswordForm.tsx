"use client";
 
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { forgottenPasswordSchema, ForgottenPasswordSchema } from "../validation/forgottenPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Message } from "@/app/types/message"; 
import Messages from "@/app/components/controls/messages"; 
import { setMessagesValue } from "@/app/lib/messageHelper"; 
import TitleBar from "../../components/titlebar";
import { MESSAGE_TYPE } from "@/app/lib/enums";
import { forgottenPasswordFromApi } from "../actions/forgottenPassword";
import { isForgottenPasswordResponse } from "@/app/interfaces/forgottenPasswordResponse";
import Link from "next/link";
 
export default function ForgottenPasswordForm() {
  
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);  
  const [showForm, setShowForm] = useState<boolean>(true);
  const [forgottenPasswordMessage, setForgottenPasswordMessage] = useState<string>("");
 
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgottenPasswordSchema>({
    mode: 'onChange',
    resolver: zodResolver(forgottenPasswordSchema),
    defaultValues: {      
      email: "Test100@hotmail.com" 
    },    
  });  
 
  const handleClearMessages = () => {
    setMessages([]);
  }; 

  const handleLogin = () => {    
    router.push("/login"); 
  }; 
 
  const onSubmitForm: SubmitHandler<ForgottenPasswordSchema> = async (data) => { 
 
    setMessages([]); 

    try 
    {
      const response = await forgottenPasswordFromApi(data.email); 
      if(isForgottenPasswordResponse(response)) 
      {
        setShowForm(false);
        setForgottenPasswordMessage(response.message);
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
    <>
    {(showForm) ? (

      <form className="space-y-2 pb w-2/5" onSubmit={handleSubmit(onSubmitForm)}>    
        <Messages messages={messages} onClearMessages={handleClearMessages}></Messages>           
        <div className="w-full flex flex-col gap-4 space-y-0">    
            <div className="w-full flex justify-center">
              <h1 className="text-zinc-800 text-lg">Forgotten Password</h1>
            </div>
            <TitleBar></TitleBar>    
            <div className="w-full">
            <div className="grid grid-cols-12">
                <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-2">Email*</label>
                <input {...register("email")} type="text" maxLength={150} className="grid-cols-12 col-span-12 md:grid-cols-10 md:col-span-10" placeholder="email" />
                <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
                {errors.email && errors.email.message}
                </p>
            </div> 
            </div>  
        </div>
        <div className="flex w-full justify-between">  
          <Link href="/login"> 
            <button type="button" className="button">Login</button>  
          </Link>       
          <button disabled={isSubmitting} className="submit">
              {isSubmitting ? "Request Reset Password" : "Reset Password"}          
          </button>         
        </div>
      </form> 
    ) : (<h1>{forgottenPasswordMessage}</h1>)}
    </>
)}