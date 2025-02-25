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
import { getAlbum, saveNewAlbumDetails } from "@/app/(secure)/albums/actions/album";
import { saveExistingAlbumDetails } from "@/app/(secure)/albums/actions/album";
import { useRouter } from "next/navigation";
import Messages from "@/app/components/controls/messages";
import { Message } from "@/app/types/message";
import { Album } from "@/app/types/album/album";
import { selectKeyNumberToString } from "@/app/lib/stringHelper"; 
import { SelectItem } from "@/app/types/selectItem";
import { delayAlertRemove } from "@/app/lib/generalHelper";
import { isAddEditActionResponse } from "@/app/interfaces/addEditActionResponse";  
import { ACTION, MESSAGE_TYPE } from "@/app/lib/enums";
import { setMessagesValue } from "@/app/lib/messageHelper";
import { FE_ALBUM_EDIT } from "@/app/lib/urls";

interface IProps {
  action: ACTION;
  albumData?: Album;
  artistItems: SelectItem[];
  studioItems: SelectItem[];
  recordLabelItems: SelectItem[]; 
  setShowSpinner: (show: boolean) => void;
}

export default function AlbumDetailsForm({action, albumData, artistItems, studioItems, recordLabelItems, setShowSpinner}: IProps) {
 
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
    if(albumData != null) {
      albumData.releaseDate = data.releaseDate;
      albumData.recordedDate = data.recordedDate;
      albumData.name = data.name;
      albumData.artistId = Number(data.artistId);
      albumData.labelId = Number(data.labelId === null ? "" : data.labelId);
      albumData.studioId = Number(data.studioId);
      albumData.producers = data.producers;
      albumData.artwork = data.artwork;    
      albumData.arrangers = data.arrangers;   
    }
  }

  useEffect(() => {    
    if(action === ACTION.EDIT && albumData != null && albumData != undefined)  {
      setAlbumValues(albumData);
    }      
  });  

  const handleClearMessages = () => {
    setMessages([]);
  };

  async function addNewAlbum(data: AlbumDetailsSchema)
  {
    const response = await saveNewAlbumDetails(data); 
    if(isAddEditActionResponse(response))  
      router.push(FE_ALBUM_EDIT + response.id.toString());  
    else 
      setMessages(response.messages);   
  }

  async function updateAlbum(data: AlbumDetailsSchema)
  {
    updatingExistingData(data);  

    const response = await saveExistingAlbumDetails(data); 
    if(isAddEditActionResponse(response)) 
    {
      setMessages([{ severity: MESSAGE_TYPE.INFO, text: "Album saved."}]);   
      delayAlertRemove().then(function() {
        setMessages([]);   
      });
    }      
    else
      setMessages(response.messages);   
  }

  const onSubmitForm: SubmitHandler<AlbumDetailsSchema> = async (data) => { 

    setShowSpinner(true);
    setMessages([]); 

    try {
      if(action === ACTION.ADD)     
        await addNewAlbum(data);      
      else     
        await updateAlbum(data);    
    } 
    catch(error)
    {
      setMessagesValue(MESSAGE_TYPE.ERROR, error, setMessages);
    }

    setShowSpinner(false);
  }
 
  return (

    <form className="space-y-2 pb" onSubmit={handleSubmit(onSubmitForm)}>
  
      <Messages messages={messages} onClearMessages={handleClearMessages}></Messages>  

      <input {...register("id")} type="hidden" name="id" id="id" />       
 
      <div className="w-full flex flex-col lg:flex-row gap-4 space-y-0">

        <div className="w-full lg:w-3/6">  

          <div className="grid grid-cols-12">
            <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-3">Name*</label>
            <input {...register("name")} type="text" maxLength={120} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9" placeholder="name of album" />
            <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
              {errors.name && errors.name.message}
            </p>
          </div>

          <div className="grid grid-cols-12">
            <label className="grid-cols-12 col-span-12 md:grid-cols-3 md:col-span-3">Artist*</label>
            <ArtistSelect trigger={trigger} name="artistId" className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9" register={register} items={artistItems} error={errors.name?.message} /> 
            <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
              {errors.artistId && errors.artistId.message}
            </p>
          </div>  
    
          <div className="grid grid-cols-12 mb-2">        
            <label className="grid-cols-12 col-span-12 md:grid-cols-3 md:col-span-3">Release Date</label> 
            <DatePicker name="releaseDate" control={control} />
          </div> 

          <div className="grid grid-cols-12">        
            <label className="grid-cols-12 col-span-12 md:grid-cols-3 md:col-span-3">Recorded Date</label> 
            <DatePicker name="recordedDate" control={control} />
          </div>
        </div>

        <div className="w-full lg:w-3/6"> 
          <div className="grid grid-cols-12">
            <label className="grid-cols-12 col-span-12 md:grid-cols-3 md:col-span-3">Record Label</label>          
            <RecordLabelSelect trigger={trigger} name="labelId" register={register} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9" items={recordLabelItems} error={errors.name?.message} />   
            <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
              {errors.labelId && errors.labelId.message}
            </p>
          </div> 

          <div className="grid grid-cols-12">
            <label className="grid-cols-12 col-span-12 md:grid-cols-3 md:col-span-3">Studio</label>          
            <StudioSelect trigger={trigger} name="studioId" register={register} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9" items={studioItems} error={errors.name?.message} />   
            <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
              {errors.studioId && errors.studioId.message}
            </p>
          </div> 

          <div className="grid grid-cols-12">
            <label className="grid-cols-12 col-span-12 md:grid-cols-3 md:col-span-3">Producers</label>
            <input {...register("producers")} type="text" maxLength={250} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9" placeholder="Producers" />
            <p className="error grid-cols-12 col-span-12 md:grid-cols-3 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
              {errors.producers && errors.producers.message}
            </p>
          </div>

          <div className="grid grid-cols-12">
            <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-3">Arrangers</label>
            <input {...register("arrangers")} type="text" maxLength={250} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9" placeholder="Arrangers" />
            <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
              {errors.arrangers && errors.arrangers.message}
            </p>
          </div>

          <div className="grid grid-cols-12">
            <label className="grid-cols-12 col-span-12 md:grid-cols-3 md:col-span-3">Artwork</label>
            <input {...register("artwork")} type="text" maxLength={250} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9 " placeholder="Artwork" />
            <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
              {errors.artwork && errors.artwork.message}
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