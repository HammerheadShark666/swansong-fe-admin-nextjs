'use client'

import React, { useEffect, useState } from 'react'; 
import 'react-quill-new/dist/quill.snow.css';
import { memberDescriptionSchema, MemberDescriptionSchema } from '@/app/(secure)/members/validation/memberDescriptionSchema';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MemberDescription } from '@/app/types/member/memberDescription';
import { Message } from '@/app/types/message';
import Messages from '@/app/components/controls/messages';
import { saveExistingMemberDescriptionDetails } from '@/app/(secure)/members/actions/member';
import { delayAlertRemove } from '@/app/lib/generalHelper';
import dynamic from 'next/dynamic';
import { MESSAGE_TYPE } from '@/app/lib/enums';
import { isAddEditActionResponse } from '@/app/interfaces/addEditActionResponse';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

interface IProps { 
  memberDescription?: MemberDescription;
  setShowSpinner: (show: boolean) => void;
}

export default function MemberDescriptionForm({memberDescription, setShowSpinner} : IProps) {

  const [messages, setMessages] = useState<Message[]>([]);  

  const { control, handleSubmit, setValue, formState: { isSubmitting }  } = useForm<MemberDescriptionSchema>({
      mode: 'onChange',
      resolver: zodResolver(memberDescriptionSchema),
      defaultValues: {
        id: 0,
        description: ""   
      },    
    });  

  function setMemberDescriptionValues(data: MemberDescription) {
    setValue("id", data.id);
    setValue("description", data.description); 
  } 

  function updatingMemberDescriptionData(data: MemberDescriptionSchema)
  {
    if(memberDescription != null) { 
      memberDescription.description = data.description;         
    }
  }

  useEffect(() => {    
    if(memberDescription != null && memberDescription != undefined)  
      setMemberDescriptionValues(memberDescription);
  });  
  
  const handleClearMessages = () => {
    setMessages([]);
  };
  
  const onSubmitForm: SubmitHandler<MemberDescriptionSchema> = async (data) => { 
  
    setShowSpinner(true);
    setMessages([]);          
    updatingMemberDescriptionData(data);  

    const response = await saveExistingMemberDescriptionDetails(data); 
    if(isAddEditActionResponse(response)) 
    {
      setMessages([{ severity: MESSAGE_TYPE.INFO, text: "Member description saved."}]);   
      delayAlertRemove().then(function() {
        setMessages([]);   
      });
    }      
    else
      setMessages(response.messages); 
      
    setShowSpinner(false);
  } 

  return (
    <>
      <Messages messages={messages} onClearMessages={handleClearMessages}></Messages>  
    
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4"> 
        <div className="flex justify-end">
          <button className="submit">
            {isSubmitting ? "Saving" : "Save"}     
          </button> 
        </div>         
        <Controller
          name="description"
          control={control}
          rules={{
            maxLength:  {
              value: 200000,
              message: "Maximum length of description is 200000"
            }
          }}
          render={({ field, fieldState: { error } }) => (
            <div className='flex flex-col h-full'>
              <ReactQuill {...field} theme="snow" className='h-full' />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
              )}
            </div>
          )}
        />   
        <div className="flex justify-end">
          <button className="submit">
            {isSubmitting ? "Saving" : "Save"}     
          </button> 
        </div>    
      </form>
    </> 
  );
}; 