"use client";

import { zodResolver } from "@hookform/resolvers/zod"; 
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { saveExistingLookupItem, saveNewLookupItem, deleteLookupItem } from "../actions/lookups"; 
import Messages from "@/app/components/controls/messages";
import { Message } from "@/app/types/message";
import ConfirmationDialog from '@/app/components/dialogs/confirmationDialog'; 
import React from "react";
import { displayMessage, setMessagesValue } from "@/app/lib/messageHelper";
import { ErrorResponse } from "@/app/interfaces/errorResponse";
import { ACTION, MESSAGE_TYPE, MODE } from "@/app/lib/enums"; 
import { lookupItemSchema, LookupItemSchema } from "../validation/lookupItemSchema";
import { LookupItem } from "@/app/types/lookups";
import { isLookupItemResponse, LookupItemResponse } from "@/app/interfaces/lookupResponse";
 
interface IProps { 
  lookupItem?: LookupItem;
  mode: MODE;
  action: ACTION;
  clearMessages: boolean;
  setShowSpinner: (show: boolean) => void;
  setClearMessages: (show: boolean) => void;
  setSelectedRow: (row: number | null) => void;
  setAction: (action: ACTION) => void;
  addLookupItemToList: (lookupItem: LookupItem) => void;
  updateLookupItemInList: (lookupItem: LookupItem) => void;
  removeLookupItemFromList: (id: number) => void; 
} 

export default function LookupItemForm({lookupItem, mode, action, setSelectedRow, setAction, addLookupItemToList, 
                                        updateLookupItemInList, removeLookupItemFromList, setShowSpinner, setClearMessages, clearMessages}: IProps) {
  
  const [messages, setMessages] = useState<Message[]>([]);   
  const [isDialogOpen, setDialogOpen] = useState(false);
 
  const { register, handleSubmit, setValue, reset, setFocus, formState: { errors, isSubmitting } } = useForm<LookupItemSchema>({  
    resolver: zodResolver(lookupItemSchema),
    defaultValues: {
      id: 0,
      name: ""
    },    
  }); 

  function createLookupItem(id: number, data: LookupItemSchema)
  { 
    if(data == null)
      throw new Error("Added album song data lost.");

    const lookupItem : LookupItem  = {
      id: id,
      name: data.name
    }   

    return lookupItem;
  }

  function updatingLookupItem(data: LookupItemSchema)
  {
    if(lookupItem != null) {
      lookupItem.id = data.id;
      lookupItem.name = data.name; 
    }
  }

  useEffect(() => {      
    setFocus("name");
    if(action === ACTION.EDIT && lookupItem)  
        setLookupItemValues(lookupItem); 

    if(clearMessages) {
      setMessages([]);   
      setClearMessages(false);
    }

    function setLookupItemValues(data: LookupItem) {

      if(action == ACTION.EDIT) {
        setValue("id", data.id);
        setValue("name", data.name); 
      }
    }  

  }, [lookupItem, clearMessages, mode, action, setClearMessages, setFocus, setValue]);   
   
  async function saveLookupItem(data: LookupItemSchema): Promise<LookupItemResponse | ErrorResponse>
  {
    if(action === ACTION.ADD)       
      return await saveNewLookupItem(data, mode); 
    else
    {
      updatingLookupItem(data);  
      return await saveExistingLookupItem(data, mode); 
    }
  } 

  function resetForNextAction() {
    reset(); 
    setAction(ACTION.ADD);
    setSelectedRow(null);    
  }
 
  const onSubmitForm: SubmitHandler<LookupItemSchema> = async (data) => { 

    try
    {
      setShowSpinner(true);
      setMessages([]);    

      const response = await saveLookupItem(data);
      if(isLookupItemResponse(response))      
      {        
        const updatedLookupItem = createLookupItem(response.id, data);

        if(action === ACTION.ADD)  
          addLookupItemToList(updatedLookupItem);        
        else       
          updateLookupItemInList(updatedLookupItem);     

        resetForNextAction(); 
        displayMessage(MESSAGE_TYPE.INFO, "Lookup item saved.", setMessages);
      }      
      else
        setMessages(response.messages);
    } 
    catch(error: unknown)
    {
      setMessagesValue(MESSAGE_TYPE.ERROR, error, setMessages); 
    } 

    setShowSpinner(false);
  }  

  const handleClearMessages = () => {
    setMessages([]);
  }; 

  const handleAddLookupItemClick = () => {    
    resetForNextAction();
    setMessages([]);
  };

  const handleDelete = async ()  => {  

    try
    {
      setDialogOpen(false);
      setShowSpinner(true);
      setMessages([]);    

      if(lookupItem && lookupItem.id ) {        
        const response = await deleteLookupItem(lookupItem.id, mode);
        if(isLookupItemResponse(response))
        {
          resetForNextAction();
          displayMessage(MESSAGE_TYPE.INFO, "Lookup item deleted.", setMessages);
          removeLookupItemFromList(lookupItem.id);
        }
        else 
          setMessages(response.messages);   
      }
      else
        setMessagesValue(MESSAGE_TYPE.ERROR, "Error deleting lookup item", setMessages);   
    } 
    catch(error: unknown)
    {
      setMessagesValue(MESSAGE_TYPE.ERROR, error, setMessages); 
    } 

    setShowSpinner(false);    
  };

  const handleCancel = () => { 
    setDialogOpen(false);
  };

  const handleOpenDeleteConfirmationDialogClick = () => {    
    if(action == ACTION.EDIT)
      setDialogOpen(true);
  } 

  const getLabel = () => {    
    switch(mode)
    {
      case MODE.BIRTHPLACE:
        return "Birth place"
      case MODE.COUNTRY:
        return "Country"
      case MODE.RECORDLABEL:
        return "Record label"
      case MODE.STUDIO:
        return "Studio"
    } 
  }
 
  const getMaxLength = () => {    
    switch(mode)
    {
      case MODE.BIRTHPLACE:
        return 100
      case MODE.COUNTRY:
        return 50
      case MODE.RECORDLABEL:
        return 100
      case MODE.STUDIO:
        return 250
    } 
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

        <div className="grid grid-cols-12">
          <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-3">{getLabel()}*</label>
          <input {...register("name")} type="text" maxLength={getMaxLength()} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9"  placeholder={getLabel()} />
          <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-9 md:col-start-4 text-gray-900 mb-2">
            {errors.name && errors.name && errors.name.message}
          </p>
        </div>  

        <div className="flex flex-row"> 
          <button type="button" onClick={() => handleAddLookupItemClick()} className="w-1/3 mr-1">Add</button> 
          <button type="button" onClick={() => handleOpenDeleteConfirmationDialogClick()} className="w-1/3 mr-1">Delete</button> 
          <button disabled={isSubmitting} className="w-1/3 submit">{isSubmitting ? "Saving" : "Save"}</button>
        </div>  
      </form> 
    </>
)}