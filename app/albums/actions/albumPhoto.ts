"use server";

import { createUrl } from "@/app/lib/http";

export async function saveAlbumPhoto(file: File | null | undefined, id: number) {
  
  try {

    if(file == null)
      throw new Error("Upload image is null.");
    
    const body = new FormData();
    body.set('file', file);

    const response = await fetch(createUrl('albums/album/upload-photo/' + id), {
      method: "POST",
      headers: {},
      body: body
    });

    const callResponse = await response.json();

    if(response.status != 200)
    {       
       return { success: false, messages: callResponse }; 
    }

    return { success: true, filename: callResponse.filename };
  } 
  catch (error) { 
    console.log(error)
    return { success: false, messages: [{ severity: "error", text: "Error saving album photo."}] };
  }
}