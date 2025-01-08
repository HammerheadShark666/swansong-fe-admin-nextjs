"use client";

import { zodResolver } from "@hookform/resolvers/zod"; 
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { saveExistingAlbumSong, saveNewAlbumSong, deleteAlbumSong } from "../actions/albumSong"; 
import Messages from "@/app/components/controls/messages";
import { Message } from "@/app/types/message"; 
import { albumSongSchema, AlbumSongSchema } from "../validation/albumSongSchema";
import { AlbumSong } from "@/app/types/albumSong";   
import { AlbumSongResponse } from "@/app/interfaces/albumSongResponse"; 
import ConfirmationDialog from '@/app/components/dialogs/confirmationDialog'; 
import React from "react";
import { displayMessage, setErrorMessagesValue } from "@/app/lib/messageHelper";
import { ApiResponse, ErrorResponse } from "@/app/interfaces/apiResponse";
 
interface IProps { 
  albumSong?: AlbumSong;
  albumId: number;
  mode: string;
  setSelectedRow: (row: number | null) => void;
  setMode: (mode: string) => void;
  addSongToAlbumSongList: (albumSong: AlbumSong) => void;
  updateSongInAlbumSongList: (albumSong: AlbumSong) => void;
  removeSongFromList: (id: number) => void;
} 

function createAlbumSong(id: number, songId: number, data: AlbumSongSchema)
{ 
    if(data == null)
      throw new Error("Added album song data lost.");

    const albumSong: AlbumSong = {
      id: id,
      albumId: data.albumId,
      order: data.order,
      side: data.side,
      song: {
        id: songId,
        title: data.song.title,
        length: data.song.length
    } 
  };

  return albumSong;
}

export default function SongForm({albumSong, albumId, mode, setSelectedRow, setMode, addSongToAlbumSongList, updateSongInAlbumSongList, removeSongFromList}: IProps) {
  
  const [messages, setMessages] = useState<Message[]>([]);   
  const [isDialogOpen, setDialogOpen] = useState(false);
 
  const { register, handleSubmit, setValue, reset, setFocus, formState: { errors, isSubmitting } } = useForm<AlbumSongSchema>({  
    resolver: zodResolver(albumSongSchema),
    defaultValues: {
      id: 0,
      albumId: albumId,
      song: {
        id: 0,
        title: '',
        length: ''
      },
      side: 0,
      order: 0
    },    
  });  

  function setAlbumSongValues(data: AlbumSong) {

    if(mode == "edit") {
      setValue("id", data.id);
      setValue("albumId", data.albumId);
      setValue("song.id", data.song.id)
      setValue("song.title", data.song.title);
      setValue("song.length", data.song.length);
      setValue("side", data.side);
      setValue("order", data.order);
    }
  }  

  function updatingAlbumSong(data: AlbumSongSchema)
  {
    if(albumSong != null) {
      albumSong.id = data.id;
      albumSong.albumId = data.albumId;
      albumSong.song.id = data.song.id;
      albumSong.song.title = data.song.title;
      albumSong.song.length = data.song.length;
      albumSong.side = data.side;
      albumSong.order = data.order; 
    }
  }

  useEffect(() => {      
    setFocus("song.title");
    if(mode == "edit" && albumSong != null && albumSong != undefined)  
        setAlbumSongValues(albumSong); 
  });   
   
  async function saveAlbumSong(data: AlbumSongSchema): Promise<ApiResponse<AlbumSongResponse>>
  {
    if(mode === "add")       
      return await saveNewAlbumSong(data); 
    else
    {
      updatingAlbumSong(data);  
      return await saveExistingAlbumSong(data); 
    }
  } 

  function resetForNextAction() {
    reset(); 
    setMode("add");
    setSelectedRow(null);    
  }
 
  const onSubmitForm: SubmitHandler<AlbumSongSchema> = async (data) => { 

    try
    {
      setMessages([]);    

      const response = await saveAlbumSong(data);
      if(response.status == 200)   
      { 
        if(response.data) 
        { 
          const albumSongResponse = response.data as AlbumSongResponse; 
          const updatedAlbumSong = createAlbumSong(albumSongResponse.id, albumSongResponse.songId, data);

          if(mode === "add")  
            addSongToAlbumSongList(updatedAlbumSong);        
          else       
            updateSongInAlbumSongList(updatedAlbumSong);       
        } 

        resetForNextAction(); 
        displayMessage("info", "Album song saved.", setMessages);
      }      
      else
      {
        if(response.data)        
          setMessages((response.data as ErrorResponse).messages);      
      }
    } 
    catch(error: unknown)
    {
      setErrorMessagesValue(error, setMessages); 
    } 
  }  

  const handleClearMessages = () => {
    setMessages([]);
  }; 

  const handleAddSongClick = () => {    
    resetForNextAction();
    setMessages([]);
  };

  const handleDelete = async ()  => {  

    try
    {
      setMessages([]);    

      if(albumSong && albumSong.id ) {        
        await deleteAlbumSong(albumSong.id);
        resetForNextAction();
        displayMessage("info", "Album song deleted.", setMessages);
        removeSongFromList(albumSong.id);
      }
      else
        throw new Error("Error deleting album song.");
    } 
    catch(error: unknown)
    {
      setErrorMessagesValue(error, setMessages); 
    } 

    setDialogOpen(false);
  };

  const handleCancel = () => { 
    setDialogOpen(false);
  };

  const handleOpenDeleteConfirmationDialogClick = () => {    
    if(mode == 'edit')
      setDialogOpen(true);
  } 
 
  return (
    <>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this item? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={handleCancel}
      />   

      <form className="space-y-2 pb" onSubmit={handleSubmit(onSubmitForm)}>
    
        <Messages messages={messages} onClearMessages={handleClearMessages}></Messages>  

        <input {...register("id")} type="hidden" name="id" id="id" />   
        <input {...register("song.id")} type="hidden" name="songId" id="songId" />     
        <input {...register("albumId")} type="hidden" name="albumId" id="albumId" />       

        <div className="grid grid-cols-12">
          <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-3">Title*</label>
          <input {...register("song.title")} type="text" maxLength={150} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9"  placeholder="title of song" />
          <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-9 md:col-start-4 text-gray-900 mb-2">
            {errors.song && errors.song.title && errors.song.title.message}
          </p>
        </div> 

        <div className="grid grid-cols-12">
          <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-3">Length</label>
          <input {...register("song.length")} type="text" maxLength={5} className="grid-cols-12 col-span-12 md:grid-cols-3 md:col-span-3" placeholder="MM:SS" />
          <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-9 md:col-start-4 text-gray-900 mb-2">
            {errors.song && errors.song.length && errors.song.length.message}
          </p>
        </div> 

        <div className="grid grid-cols-12">
          <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-3">Side</label>
          <input {...register("side", { valueAsNumber: true })} type="number" min={0} maxLength={2} className="grid-cols-4 col-span-4 md:grid-cols-2 md:col-span-2" placeholder="side of album song is on" />
          <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-9 md:col-start-4 text-gray-900 mb-2">
            {errors.side && errors.side.message}
          </p>
        </div>  
        
        <div className="grid grid-cols-12">
          <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-3">Order</label>
          <input {...register("order", { valueAsNumber: true })} type="number" min={0} maxLength={2} className="grid-cols-4 col-span-4 md:grid-cols-2 md:col-span-2" placeholder="order of song" />
          <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-9 md:col-start-4 text-gray-900 mb-2">
            {errors.order && errors.order.message}
          </p>
        </div>  

        <div className="grid grid-cols-12"> 
          <button type="button" onClick={() => handleAddSongClick()} className="mr-1 grid-cols-4 col-span-4 col-start-1 md:col-start-1 md:grid-cols-3 md:col-span-3">
            Add    
          </button> 
          <button type="button" onClick={() => handleOpenDeleteConfirmationDialogClick()} className="mr-1 grid-cols-4 col-span-4 col-start-5 md:col-start-4 md:grid-cols-3 md:col-span-3 ">
            Delete          
          </button> 
          <button disabled={isSubmitting} className="grid-cols-4 col-span-4 col-start-9 md:grid-cols-3 md:col-span-3 md:col-start-10 submit ">
            {isSubmitting ? "Saving" : "Save"}          
          </button>
        </div> 
      </form> 
    </>
)}