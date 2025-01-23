"use client";
 
import { artistDetailsSchema, ArtistDetailsSchema } from "../validation/artistDetailsSchema";
import { zodResolver } from "@hookform/resolvers/zod";  
import CountrySelect from "@/app/components/controls/select";
import FormationYearSelect  from "@/app/components/controls/select";
import DisbandYearSelect  from "@/app/components/controls/select";  
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { saveNewArtistDetails } from "@/app/artists/actions/artist";
import { saveExistingArtistDetails } from "@/app/artists/actions/artist";
import { useRouter } from "next/navigation";
import Messages from "@/app/components/controls/messages";
import { Message } from "@/app/types/message";
import { Artist } from "@/app/types/artist/artist";
import { formatString, numberToString, selectKeyNumberToString } from "@/app/lib/stringHelper"; 
import { SelectItem } from "@/app/types/selectItem";
import { delayAlertRemove } from "@/app/lib/generalHelper";
import { ErrorResponse } from "@/app/interfaces/apiResponse";
import { AddEditActionResponse } from "@/app/interfaces/addEditActionResponse";  
import { ACTION } from "@/app/lib/enums";
import { ARTIST_EDIT } from "@/app/lib/urls";
import { setErrorMessagesValue } from "@/app/lib/messageHelper";

interface IProps {
  action: ACTION;
  artistData?: Artist;
  countryItems: SelectItem[]; 
  setShowSpinner: (show: boolean) => void;
}

export default function ArtistDetailsForm({action, artistData, countryItems, setShowSpinner}: IProps) {
 
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);  
 
  const { trigger, register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<ArtistDetailsSchema>({
    mode: 'onChange',
    resolver: zodResolver(artistDetailsSchema),
    defaultValues: {
      id: 0, 
      name: "",
      countryId: "",
      formationYear: "",
      disbandYear: ""
    },    
  });  

  function setArtistValues(data: Artist) {
    setValue("id", data.id);
    setValue("name", data.name);
    setValue("countryId", selectKeyNumberToString(data.countryId));  
    setValue("formationYear", selectKeyNumberToString(data.formationYear));
    setValue("disbandYear", selectKeyNumberToString(data.disbandYear)); 
  } 

  function updatingExistingData(data: ArtistDetailsSchema)
  {
    if(artistData != null) {
      artistData.name = data.name;
      artistData.countryId = Number(data.countryId === null ? "" : data.countryId);
      artistData.formationYear = Number(data.formationYear === null ? "" : data.formationYear);
      artistData.disbandYear = Number(data.disbandYear === null ? "" : data.disbandYear);   
    }
  }

  useEffect(() => {    
    if(action === ACTION.EDIT && artistData != null && artistData != undefined)  {
      setArtistValues(artistData);
    }      
  });  

  const handleClearMessages = () => {
    setMessages([]);
  };

  async function addNewArtist(data: ArtistDetailsSchema)
  {
    const response = await saveNewArtistDetails(data); 
    if(response?.status == 200)
      router.push(formatString(ARTIST_EDIT, (response.data as AddEditActionResponse).id)); 
    else 
    {
      if(response.data)        
        setMessages((response.data as ErrorResponse).messages);    
    }   
  }

  async function updateArtist(data: ArtistDetailsSchema)
  {
    updatingExistingData(data);  

    const response = await saveExistingArtistDetails(data); 
    if(response?.status == 200)     
    {
      setMessages([{ severity: "info", text: "Artist saved."}]);   
      delayAlertRemove().then(function() {
        setMessages([]);   
      });
    }      
    else
    {
      if(response.data)        
        setMessages((response.data as ErrorResponse).messages);    
    }  
  }

  const onSubmitForm: SubmitHandler<ArtistDetailsSchema> = async (data) => { 

    setShowSpinner(true);
    setMessages([]); 

    try
    {
      if(action === ACTION.ADD)    
        await addNewArtist(data);
      else    
        await updateArtist(data);
    } 
    catch(error)
    {
      setErrorMessagesValue(error, setMessages);
    }

    setShowSpinner(false);
  }

  function getListOfNumbers(min: number, max: number) {
    
    const list = [];
    for(let number = min; number <= max; number++) {

      const selectItem: SelectItem = {
        id: number,
        name: numberToString(number)
      }
      list.push(selectItem);
    }
    return list.reverse();
}

  function getYears() {

    return  getListOfNumbers(1900, 2055);
  }
 
  return (

    <form className="space-y-2 pb" onSubmit={handleSubmit(onSubmitForm)}>
  
      <Messages messages={messages} onClearMessages={handleClearMessages}></Messages>  

      <input {...register("id")} type="hidden" name="id" id="id" />       
 
      <div className="w-full flex flex-col lg:flex-row gap-4 space-y-0">

        <div className="w-full">
          <div className="grid grid-cols-12">
            <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-3">Name*</label>
            <input {...register("name")} type="text" maxLength={120} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9" placeholder="name of artist" />
            <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
              {errors.name && errors.name.message}
            </p>
          </div>

          <div className="grid grid-cols-12">
            <label className="grid-cols-12 col-span-12 md:grid-cols-3 md:col-span-3">Country</label>
            <CountrySelect trigger={trigger} name="countryId" className="grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5" register={register} items={countryItems} error={errors.name?.message} /> 
            <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
              {errors.countryId && errors.countryId.message}
            </p>
          </div>  

          <div className="grid grid-cols-12">
            <label className="grid-cols-12 col-span-12 md:grid-cols-3 md:col-span-3">Formation Year</label>          
            <FormationYearSelect trigger={trigger} name="formationYear" className="grid-cols-4 col-span-4 md:grid-cols-2 md:col-span-2" register={register} items={getYears()} error={errors.name?.message} />   
            <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
              {errors.formationYear && errors.formationYear.message}
            </p>
          </div> 

          <div className="grid grid-cols-12">
            <label className="grid-cols-12 col-span-12 md:grid-cols-3 md:col-span-3">Disband Year</label>          
            <DisbandYearSelect trigger={trigger} name="disbandYear" className="grid-cols-4 col-span-4 md:grid-cols-2 md:col-span-2" register={register} items={getYears()} error={errors.name?.message} />   
            <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
              {errors.disbandYear && errors.disbandYear.message}
            </p>
          </div>   
        </div>
      </div>      

      <div className="flex justify-end">
        <button disabled={isSubmitting} className="submit">
          {isSubmitting ? "Saving" : "Save"}          
        </button> 
      </div>  
    </form> 
)}