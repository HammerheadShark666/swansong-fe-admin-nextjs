'use client'

import React, { useEffect, useState } from 'react'; 
import 'react-quill-new/dist/quill.snow.css';
import { albumDescriptionSchema, AlbumDescriptionSchema } from '../validation/albumDescriptionSchema';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlbumDescription } from '@/app/types/album/albumDescription';
import { Message } from '@/app/types/message';
import Messages from '@/app/components/controls/messages';
import { saveExistingAlbumDescriptionDetails } from '@/app/(secure)/albums/actions/album';
import { delayAlertRemove } from '@/app/lib/generalHelper';
import dynamic from 'next/dynamic'; 
import { ErrorResponse } from '@/app/interfaces/apiResponse';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

interface IProps { 
  albumDescription?: AlbumDescription;
  setShowSpinner: (show: boolean) => void;
}

export default function AlbumDescriptionForm({albumDescription, setShowSpinner} : IProps) {

  const [messages, setMessages] = useState<Message[]>([]);  

  const { control, handleSubmit, setValue, formState: { isSubmitting }  } = useForm<AlbumDescriptionSchema>({
      mode: 'onChange',
      resolver: zodResolver(albumDescriptionSchema),
      defaultValues: {
        id: 0,
        description: ""   
      },    
    });  

  function setAlbumDescriptionValues(data: AlbumDescription) {
    setValue("id", data.id);
    setValue("description", data.description); 
  } 

  function updatingAlbumDescriptionData(data: AlbumDescriptionSchema)
  {
    if(albumDescription != null) { 
      albumDescription.description = data.description;         
    }
  }

  useEffect(() => {    
    if(albumDescription != null && albumDescription != undefined)  
      setAlbumDescriptionValues(albumDescription);
  });  
  
  const handleClearMessages = () => {
    setMessages([]);
  };
  
  const onSubmitForm: SubmitHandler<AlbumDescriptionSchema> = async (data) => { 
  
    setShowSpinner(true);
    setMessages([]);          
    updatingAlbumDescriptionData(data);  

    const response = await saveExistingAlbumDescriptionDetails(data); 
    if(response?.status == 200)     
    {
      setMessages([{ severity: "info", text: "Album description saved."}]);   
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
            <div>
              <ReactQuill {...field} theme="snow" />
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