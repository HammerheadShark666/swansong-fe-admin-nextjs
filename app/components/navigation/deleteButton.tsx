'use client'

import { MODE } from "@/app/lib/enums";
import { getModeLabel } from "@/app/lib/generalHelper";   
import { deleteArtist } from "@/app/(secure)/artists/actions/artist";
import { isAddEditActionResponse } from "@/app/interfaces/AddEditActionResponse";
import { useRouter } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmationDialog from "../dialogs/confirmationDialog";
import { useState } from "react";
import { deleteAlbum } from "@/app/(secure)/albums/actions/album";
import { deleteMember } from "@/app/(secure)/members/actions/member";

interface IProps {  
  mode: MODE;
  id: number;
}

export default function DeleteArtistForm({mode, id} : IProps) { 

  const router = useRouter();
  const modeLabel = getModeLabel(mode);   
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleCancel = () => { 
    setDialogOpen(false);
  };

  const handleDelete = async ()  => {   
    switch(mode) {
      case MODE.ALBUM:
      {
        const response = await deleteAlbum(id);
        if(isAddEditActionResponse(response))
        {
          router.push("/albums/album/add"); 
        }
        setDialogOpen(false);  
        return;
      } 
      case MODE.ARTIST:
      {
        const response = await deleteArtist(id);
        if(isAddEditActionResponse(response))
          router.push("/artists/artist/add");
        return;
      }
      case MODE.MEMBER:
      {
        const response = await deleteMember(id);
        if(isAddEditActionResponse(response))
          router.push("/members/member/add");
        return;
      } 
    }
  };
  
  const handleOpenDeleteConfirmationDialogClick = () => {     
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

      <div onClick={handleOpenDeleteConfirmationDialogClick} className="text-black text-sm bg-[#b68d40] cursor-pointer text-center shadow-xs transition-all duration-500 hover:text-white tooltip" data-tip={'Delete ' + modeLabel}>
        <div className="flex justify-center items-center h-8 w-12">
          <RiDeleteBin6Line className="w-8 h-8 block align-middle" /> 
        </div> 
      </div> 
    </>
  )
}