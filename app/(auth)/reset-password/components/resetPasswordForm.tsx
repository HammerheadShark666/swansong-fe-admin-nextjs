'use client'

import { Message } from "@/app/types/message";
import { useState } from "react";
import TitleBar from "../../components/titlebar";
import Messages from "@/app/components/controls/messages";
import { MESSAGE_TYPE } from "@/app/lib/enums";
import { setMessagesValue } from "@/app/lib/messageHelper";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { resetPasswordSchema, ResetPasswordSchema } from "../validation/resetPasswordSchema";
import { resetPasswordFromApi } from "../actions/resetPassword";
import Link from "next/link"; 
import { isResetPasswordResponse } from "@/app/interfaces/resetPasswordResponse";

interface IProps { 
  token: string;
}

export default function ResetPasswordForm({ token }: IProps) {

	const [messages, setMessages] = useState<Message[]>([]); 
	 
		const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ResetPasswordSchema>({
			mode: 'onChange',
			resolver: zodResolver(resetPasswordSchema),
			defaultValues: {  
				email: "johnwmiller33@hotmail.com", 
				currentPassword: "Password#1",
				password: "Password#1",
				confirmPassword: "Password#1",
				token: token
			},    
		});  
	 
		const handleClearMessages = () => {
			setMessages([]);
		}; 
	
		const onSubmitForm: SubmitHandler<ResetPasswordSchema> = async (data) => { 
	
			setMessages([]); 
	
			try 
			{
				const response = await resetPasswordFromApi(data); 
				if(isResetPasswordResponse(response)) {    
					reset();
					setMessagesValue(MESSAGE_TYPE.INFO, "Your Password has been reset, you can now login", setMessages);
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
						<h1 className="text-zinc-800 text-lg">Reset Password</h1>
					</div>
					<TitleBar></TitleBar>      
					<div className="w-full lg:full">						 
						<div className="grid grid-cols-12">
							<label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-3">Email*</label>
							<input {...register("email")} type="text" maxLength={150} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9" placeholder="email" />
							<p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
								{errors.email && errors.email.message}
							</p>
						</div>
						<div className="grid grid-cols-12">
							<label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-3">Current Password*</label>
							<input {...register("currentPassword")} type="password" maxLength={50} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9" placeholder="current password" />
							<p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
								{errors.password && errors.password.message}
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
	
				<div className="flex justify-between">
					<Link href="/login">
						<button type="button" className="button">Login</button>  
					</Link>       
					<button disabled={isSubmitting} className="submit">
						{isSubmitting ? "Resetting Password" : "Reset Password"}          
					</button> 
				</div>  
			</form> 
		)
}