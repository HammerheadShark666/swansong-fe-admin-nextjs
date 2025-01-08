import { Album } from "@/app/types/album";
import { AlbumDetailsSchema } from "@/app/albums/validation/albumDetailsSchema";
import { createUrl } from "@/app/lib/http";
import { mapAlbum, mapAlbumDescription } from "@/app/lib/mappers";
import { AlbumDescriptionSchema } from "@/app/albums/validation/albumDescriptionSchema";
import { apiGetCall } from "@/app/lib/apiHelper"; 
import { AlbumSearchItem } from "@/app/interfaces/albumSearchItem";

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

export async function saveExistingAlbumDescriptionDetails(data: AlbumDescriptionSchema) {     

  try {  

    const albumDescription = mapAlbumDescription(data);

    const response = await fetch(createUrl("albums/album/description/update"), {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(albumDescription)
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
 
  export async function getAlbumsByLetter(letter: string): Promise<AlbumSearchItem[]> {  
    return await apiGetCall<AlbumSearchItem[]>("albums/search-by-letter/" + letter);
  }

  export async function getAlbumsByText(text: string): Promise<AlbumSearchItem[]> {  
    return await apiGetCall<AlbumSearchItem[]>("albums/search/" + text);
  }


  //change to apiGetCall 