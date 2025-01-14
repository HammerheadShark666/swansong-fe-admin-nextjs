"use client";

import { zodResolver } from "@hookform/resolvers/zod"; 
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { saveExistingArtistMember, saveNewArtistMember, deleteArtistMember } from "../actions/artistMember"; 
import Messages from "@/app/components/controls/messages";
import { Message } from "@/app/types/message"; 
import { artistMemberDetailsSchema, ArtistMemberDetailsSchema } from "../validation/artistMemberDetailsSchema";
import { ArtistMember } from "@/app/types/artist/artistMember";   
import { ArtistMemberResponse } from "@/app/interfaces/artistMemberResponse"; 
import ConfirmationDialog from '@/app/components/dialogs/confirmationDialog'; 
import React from "react";
import { displayMessage, setErrorMessagesValue } from "@/app/lib/messageHelper";
import { ApiResponse, ErrorResponse } from "@/app/interfaces/apiResponse";
import { ACTION } from "@/app/lib/enums";
 
interface IProps { 
  artistMember?: ArtistMember;
  artistId: number;
  mode: string;
  clearMessages: boolean;
  setShowSpinner: (show: boolean) => void;
  setClearMessages: (show: boolean) => void;
  setSelectedRow: (row: number | null) => void;
  setMode: (mode: string) => void;
  addMemberToArtistMemberList: (artistMember: ArtistMember) => void;
  updateMemberInArtistMemberList: (artistMember: ArtistMember) => void;
  removeMemberFromList: (id: number) => void;
} 

function createArtistMember(id: number, memberId: number, data: ArtistMemberDetailsSchema)
{ 
    if(data == null)
      throw new Error("Added artist member data lost.");

    const artistMember: ArtistMember = {
      id: id,
      artistId: data.artistId,
      stageName: "",
      photo: "" 
  };

  return artistMember;
}

export default function MemberForm({artistMember, artistId, mode, setSelectedRow, setMode, addMemberToArtistMemberList, 
                                        updateMemberInArtistMemberList, removeMemberFromList, setShowSpinner, setClearMessages, clearMessages}: IProps) {
  
  const [messages, setMessages] = useState<Message[]>([]);   
  const [isDialogOpen, setDialogOpen] = useState(false);
 
  const { register, handleSubmit, setValue, reset, setFocus, formState: { errors, isSubmitting } } = useForm<ArtistMemberDetailsSchema>({  
    resolver: zodResolver(artistMemberDetailsSchema),
    defaultValues: {
      id: 0,
      artistId: artistId
    },    
  });  

  // function setArtistMemberValues(data: ArtistMember) {

  //   if(mode == ACTION.EDIT) {
  //     setValue("id", data.id);
  //     setValue("artistId", data.artistId);
  //     setValue("member.id", data.member.id)
  //     setValue("member.title", data.member.title);
  //     setValue("member.length", data.member.length);
  //     setValue("side", data.side);
  //     setValue("order", data.order);
  //   }
  // }  

  function updatingArtistMember(data: ArtistMemberDetailsSchema)
  {
    if(artistMember != null) {
      artistMember.id = data.id;
      artistMember.artistId = data.artistId;
      artistMember.stageName = "";
      artistMember.photo = ""
    }
  }

  useEffect(() => {      
    //setFocus("member.title");
    if(mode === ACTION.EDIT && artistMember != null && artistMember != undefined)  
        setArtistMemberValues(artistMember); 

    if(clearMessages) {
      setMessages([]);   
      setClearMessages(false);
    }

    function setArtistMemberValues(data: ArtistMember) {

      if(mode == ACTION.EDIT) {
        setValue("id", data.id);
        setValue("artistId", data.artistId);
      }
    }  

  }, [artistMember, clearMessages, mode, setClearMessages, setFocus, setValue]);   
   
  async function saveArtistMember(data: ArtistMemberDetailsSchema): Promise<ApiResponse<ArtistMemberResponse>>
  {
    if(mode === ACTION.ADD)       
      return await saveNewArtistMember(data); 
    else
    {
      updatingArtistMember(data);  
      return await saveExistingArtistMember(data); 
    }
  } 

  function resetForNextAction() {
    reset(); 
    setMode(ACTION.ADD);
    setSelectedRow(null);    
  }
 
  const onSubmitForm: SubmitHandler<ArtistMemberDetailsSchema> = async (data) => { 

    try
    {
      setShowSpinner(true);
      setMessages([]);    

      const response = await saveArtistMember(data);
      if(response.status == 200)   
      { 
        if(response.data) 
        { 
          const artistMemberResponse = response.data as ArtistMemberResponse; 
          const updatedArtistMember = createArtistMember(artistMemberResponse.id, artistMemberResponse.memberId, data);

          if(mode === ACTION.ADD)  
            addMemberToArtistMemberList(updatedArtistMember);        
          else       
            updateMemberInArtistMemberList(updatedArtistMember);       
        } 

        resetForNextAction(); 
        displayMessage("info", "Member saved.", setMessages);
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

    setShowSpinner(false);
  }  

  const handleClearMessages = () => {
    setMessages([]);
  }; 

  const handleAddMemberClick = () => {    
    resetForNextAction();
    setMessages([]);
  };

  const handleDelete = async ()  => {  

    try
    {
      setDialogOpen(false);
      setShowSpinner(true);
      setMessages([]);    

      if(artistMember && artistMember.id ) {        
        await deleteArtistMember(artistMember.id);
        resetForNextAction();
        displayMessage("info", "Member deleted.", setMessages);
        removeMemberFromList(artistMember.id);
      }
      else
        throw new Error("Error deleting artist member.");
    } 
    catch(error: unknown)
    {
      setErrorMessagesValue(error, setMessages); 
    } 

    setShowSpinner(false);    
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
        <input {...register("artistId")} type="hidden" name="artistId" id="artistId" />       

        <div className="grid grid-cols-12">
          <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-3">Title*</label>
          <input {...register("artistId")} type="text" maxLength={150} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9"  placeholder="title of member" />
          <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-9 md:col-start-4 text-gray-900 mb-2">
            {errors.artistId && errors.artistId && errors.artistId.message}
          </p>
        </div> 
 
        <div className="grid grid-cols-12"> 
          <button type="button" onClick={() => handleAddMemberClick()} className="mr-1 grid-cols-4 col-span-4 col-start-1 md:col-start-1 md:grid-cols-3 md:col-span-3">
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