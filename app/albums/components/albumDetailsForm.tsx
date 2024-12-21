"use client";
 
import { albumDetailsSchema, AlbumDetailsSchema } from "../validation/albumDetailsSchema";
import { zodResolver } from "@hookform/resolvers/zod"; 
import { getDateOnly } from "@/app/lib/date"
import ArtistSelect from "@/app/components/controls/select";
import RecordLabelSelect  from "@/app/components/controls/select";
import StudioSelect  from "@/app/components/controls/select"; 
import DatePicker from "@/app/components/controls/datepicker";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { saveNewAlbumDetails } from "../actions/album";
import { saveExistingAlbumDetails } from "../actions/album";
import { useRouter } from "next/navigation";
import Messages from "@/app/components/controls/messages";
import { Message } from "@/app/types/message";
import { Album } from "@/app/types/album";
import { selectKeyNumberToString } from "@/app/lib/stringHelper"; 
import { SelectItem } from "@/app/types/selectItem";

interface IProps {
  mode: "add" | "edit";
  existingData?: Album;
  artistItems: SelectItem[];
  studioItems: SelectItem[];
  recordLabelItems: SelectItem[];
}

export default function AlbumDetailsForm({mode, existingData, artistItems, studioItems, recordLabelItems}: IProps) {
 
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]); 
 
  const { trigger, control, register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<AlbumDetailsSchema>({
    mode: 'onChange',
    resolver: zodResolver(albumDetailsSchema),
    defaultValues: {
      id: 0,
      releaseDate: "",  
      recordedDate: "",
      name: "",
      artistId: "",
      labelId: "",
      studioId: "",
      producers: "",
      artwork: "",      
      arrangers: ""      
    },    
  });  

  function setAlbumValues(data: Album) {
    setValue("id", data.id);
    setValue("name", data.name);
    setValue("artistId", selectKeyNumberToString(data.artistId));
    setValue("recordedDate", getDateOnly(data.recordedDate));
    setValue("releaseDate", getDateOnly(data.releaseDate));
    setValue("labelId",  selectKeyNumberToString(data.labelId));
    setValue("studioId", selectKeyNumberToString(data.studioId));
    setValue("producers", data.producers);
    setValue("arrangers", data.arrangers);
    setValue("artwork", data.artwork);
  } 

  function updatingExistingData(data: AlbumDetailsSchema)
  {
    if(existingData != null) {
      existingData.releaseDate = data.releaseDate;
      existingData.recordedDate = data.recordedDate;
      existingData.name = data.name;
      existingData.artistId = Number(data.artistId);
      existingData.labelId = Number(data.labelId === null ? "" : data.labelId);
      existingData.studioId = Number(data.studioId);
      existingData.producers = data.producers;
      existingData.artwork = data.artwork;    
      existingData.arrangers = data.arrangers;   
    }
  }

  useEffect(() => {
    
    if(mode == "edit" && existingData != null && existingData != undefined)  
      setAlbumValues(existingData);
  })   

  const onSubmitForm: SubmitHandler<AlbumDetailsSchema> = async (data) => { 

    setMessages([]);

    if(mode === "add")
    { 
      const response = await saveNewAlbumDetails(data); 
      if(response?.success == true)        
        router.push("/albums/album/edit/" + response.data.id.toString());        
      else 
        setMessages(response.messages.messages);      
    } 
    else
    {
      updatingExistingData(data);  

      const response = await saveExistingAlbumDetails(data); 
      if(response?.success == true)     
        setMessages([{ severity: "info", text: "Album saved."}]);     
      else
        setMessages(response.messages.messages);
    }
  }
 
  return (

    <form className="space-y-2 pb" onSubmit={handleSubmit(onSubmitForm)}>
  
      <Messages messages={messages}></Messages>  

      <input {...register("id")} type="hidden" name="id" id="id" />       

      <div className="grid grid-cols-12">
        <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-3 block mb-3 text-sm font-medium text-gray-900 dark:text-white">Name*</label>
        <input {...register("name")} type="text" name="name" id="name" maxLength={120} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name of album" />
        <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {errors.name && errors.name.message}
        </p>
      </div>

      <div className="grid grid-cols-12">
        <label className="grid-cols-12 col-span-12 md:grid-cols-3 md:col-span-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Artist*</label> 

        <ArtistSelect trigger={trigger} name="artistId" register={register} items={artistItems} error={errors.name?.message} />     

        <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {errors.artistId && errors.artistId.message}
        </p>
      </div>  
 
      <div className="grid grid-cols-12 mb-16">        
        <label className="grid-cols-12 col-span-12 md:grid-cols-3 md:col-span-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Release Date</label> 
        <DatePicker name="releaseDate" control={control} />
      </div>

      <div className="h-0.5"></div>

      <div className="grid grid-cols-12 mb-16">        
        <label className="grid-cols-12 col-span-12 md:grid-cols-3 md:col-span-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recorded Date</label> 
        <DatePicker name="recordedDate" control={control} />
      </div>

      <div className="h-0.5"></div>

      <div className="grid grid-cols-12">
        <label className="grid-cols-12 col-span-12 md:grid-cols-3 md:col-span-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Record Label</label> 
         
        <RecordLabelSelect trigger={trigger} name="labelId" register={register} items={recordLabelItems} error={errors.name?.message} />    

        <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {errors.labelId && errors.labelId.message}
        </p>
      </div> 

      <div className="grid grid-cols-12">
        <label className="grid-cols-12 col-span-12 md:grid-cols-3 md:col-span-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Studio</label> 
         
        <StudioSelect trigger={trigger} name="studioId" register={register} items={studioItems} error={errors.name?.message} />    

        <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {errors.studioId && errors.studioId.message}
        </p>
      </div> 

      <div className="grid grid-cols-12">
        <label className="grid-cols-12 col-span-12 md:grid-cols-3 md:col-span-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Producers</label>
        <input {...register("producers")} type="text" name="producers" id="producers" maxLength={250} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Producers" />
        <p className="error grid-cols-12 col-span-12 md:grid-cols-3 md:col-span-5 md:col-start-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {errors.producers && errors.producers.message}
        </p>
      </div>

      <div className="grid grid-cols-12">
        <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-3 block mb-3 text-sm font-medium text-gray-900 dark:text-white">Arrangers</label>
        <input {...register("arrangers")} type="text" name="arrangers" id="arrangers" maxLength={250} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Arrangers" />
        <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {errors.arrangers && errors.arrangers.message}
        </p>
      </div>

      <div className="grid grid-cols-12">
        <label className="grid-cols-12 col-span-12 md:grid-cols-3 md:col-span-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Artwork</label>
        <input {...register("artwork")} type="text" name="artwork" id="aartwork" maxLength={250} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Artwork" />
        <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {errors.artwork && errors.artwork.message}
        </p>
      </div> 

      <div className="grid grid-cols-12">
        <button disabled={isSubmitting} className="grid-cols-3 col-span-3 col-start-10 md:col-start-11 md:grid-cols-2 md:col-span-2  submit text-black py-1.5 px-7 text-sm bg-[#b68d40]  cursor-pointer text-center shadow-xs transition-all duration-500 hover:text-white tooltip">
          {isSubmitting ? "Saving" : "Save"}          
        </button> 
      </div> 
    </form> 
)}