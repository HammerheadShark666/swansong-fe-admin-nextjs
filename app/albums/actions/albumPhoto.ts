"use server";

//import { PhotoSchema } from "@/app/albums/validation/photoSchema"; 
import { createUrl } from "@/app/lib/http";

// async function SaveAlbumPhoto(formData: PhotoSchema, id: number) {   

//   try {

//     if(formData.image == null)
//       throw new Error("Upload image is null.");
    
//     const body = new FormData();
//     body.set('file', formData.image);

//     const response = await fetch(createUrl('albums/album/upload-photo/' + id), {
//       method: "POST",
//       headers: {},
//       body: body
//     });

//     const callResponse = await response.json();

//     if(response.status != 200)
//     {       
//        return { success: false, message: callResponse }; 
//     }

//     return { success: true, filename: callResponse };
//   } 
//   catch (error) { 
//     return { success: false, message: error };
//   }
// }

//export async function saveAlbumPhoto(formData: PhotoSchema, id: number) {
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
       return { success: false, message: callResponse }; 
    }

    return { success: true, filename: callResponse.filename };
  } 
  catch (error) { 
    return { success: false, message: error };
  }
}
 



// export async function saveAlbumPhoto(formData: PhotoSchema, id: number) {
  
//   try {

//     if(formData.image == null)
//       throw new Error("Upload image is null.");
    
//     const body = new FormData();
//     body.set('file', formData.image);

//     const response = await fetch(createUrl('albums/album/upload-photo/' + id), {
//       method: "POST",
//       headers: {},
//       body: body
//     });

//     const callResponse = await response.json();

//     if(response.status != 200)
//     {       
//        return { success: false, message: callResponse }; 
//     }

//     return { success: true, filename: callResponse };
//   } 
//   catch (error) { 
//     return { success: false, message: error };
//   }
// }















// export async function submitPhotoForm(formData: PhotoSchema, id: number) {
 
//     if(formData.image == null)
//         return;

//     const response = await SaveAlbumPhoto(formData, id);

//     return response;
 
// }