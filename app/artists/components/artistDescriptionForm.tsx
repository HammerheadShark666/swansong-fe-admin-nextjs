'use client'

import React, { useEffect, useState } from 'react'; 
import 'react-quill-new/dist/quill.snow.css';
import { artistDescriptionSchema, ArtistDescriptionSchema } from '../validation/artistDescriptionSchema';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArtistDescription } from '@/app/types/artist/artistDescription';
import { Message } from '@/app/types/message';
import Messages from '@/app/components/controls/messages';
import { saveExistingArtistDescriptionDetails } from '@/app/artists/actions/artist';
import { delayAlertRemove } from '@/app/lib/generalHelper';
import dynamic from 'next/dynamic'; 
import { ErrorResponse } from '@/app/interfaces/apiResponse';

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
    if(response?.status == 200)     
    {
      setMessages([{ severity: "info", text: "Artist description saved."}]);   
      delayAlertRemove().then(function() {
        setMessages([]);   
      });
    }      
    else
      if(response.data)        
        setMessages((response.data as ErrorResponse).messages);  
      
    setShowSpinner(false);
  } 

  return (
    <>
      <Messages messages={messages} onClearMessages={handleClearMessages}></Messages>  
    
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4"> 
        <div className="grid grid-cols-12">
          <button className="grid-cols-4 col-span-4 col-start-9 md:col-start-11 md:grid-cols-2 md:col-span-2 submit">
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
            <div>
              <ReactQuill {...field} theme="snow" />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
              )}
            </div>
          )}
        />         
      </form>
    </> 
  );
}; 