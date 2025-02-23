'use client'

import React, { useEffect, useState } from 'react'; 
import 'react-quill-new/dist/quill.snow.css';
import { artistDescriptionSchema, ArtistDescriptionSchema } from '../validation/artistDescriptionSchema';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArtistDescription } from '@/app/types/artist/artistDescription';
import { Message } from '@/app/types/message';
import Messages from '@/app/components/controls/messages';
import { saveExistingArtistDescriptionDetails } from '@/app/(secure)/artists/actions/artist';
import { delayAlertRemove } from '@/app/lib/generalHelper';
import dynamic from 'next/dynamic';  
import { MESSAGE_TYPE } from '@/app/lib/enums';
import { isAddEditActionResponse } from '@/app/interfaces/AddEditActionResponse';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

interface IProps { 
  artistDescription?: ArtistDescription;
  setShowSpinner: (show: boolean) => void;
}

export default function ArtistDescriptionForm({artistDescription, setShowSpinner} : IProps) {

  const [messages, setMessages] = useState<Message[]>([]);  

  const { control, handleSubmit, setValue, formState: { isSubmitting }  } = useForm<ArtistDescriptionSchema>({
      mode: 'onChange',
      resolver: zodResolver(artistDescriptionSchema),
      defaultValues: {
        id: 0,
        description: ""   
      },    
    });  

  function setArtistDescriptionValues(data: ArtistDescription) {
    setValue("id", data.id);
    setValue("description", data.description); 
  } 

  function updatingArtistDescriptionData(data: ArtistDescriptionSchema)
  {
    if(artistDescription != null) { 
      artistDescription.description = data.description;         
    }
  }

  useEffect(() => {    
    if(artistDescription != null && artistDescription != undefined)  
      setArtistDescriptionValues(artistDescription);
  });  
  
  const handleClearMessages = () => {
    setMessages([]);
  };
  
  const onSubmitForm: SubmitHandler<ArtistDescriptionSchema> = async (data) => { 
  
    setShowSpinner(true);
    setMessages([]);          
    updatingArtistDescriptionData(data);  

    const response = await saveExistingArtistDescriptionDetails(data);
    if(isAddEditActionResponse(response))   
    {
      setMessages([{ severity: MESSAGE_TYPE.INFO, text: "Artist description saved."}]);   
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