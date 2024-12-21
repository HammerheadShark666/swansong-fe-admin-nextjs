import { Album } from "@/app/types/album";
import { AlbumDetailsSchema } from "../validation/albumDetailsSchema";
import { createUrl } from "@/app/lib/http";
import { mapAlbum } from "@/app/lib/mappers";

export async function saveNewAlbumDetails(data: AlbumDetailsSchema) {     

    try {  
  
      const album = mapAlbum(data);
  
      const response = await fetch(createUrl("albums/album/add"), {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(album)
      });
  
      const callResponse = await response.json();
   
      return response.status != 200 
              ? { success: false, messages: callResponse }
              : { success: true, data: callResponse };
    }
    catch (error) { 
      return { success: false, message: error };
    }
  }

export async function saveExistingAlbumDetails(data: AlbumDetailsSchema) {     

  try {  

    const album = mapAlbum(data);

    const response = await fetch(createUrl("albums/album/update"), {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(album)
    });

    const callResponse = await response.json(); 
 
    return response.status != 200 
            ? { success: false, messages: callResponse }
            : { success: true, data: callResponse };
  }
  catch (error) { 
    return { success: false, message: error };
  }
} 

export async function getAlbum(id: number): Promise<Album> {
  
    const res = await fetch(createUrl("albums/album/" + id), { 
      cache: 'no-store'
    });
  
    if (!res.ok) {
      //notFound();
    }
  
    const data: Album = await res.json();
    return data; 
  }