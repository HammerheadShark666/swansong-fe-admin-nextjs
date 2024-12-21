"use client";

import { useRef, useState } from "react"; 
import Image from "next/image";
import { saveAlbumPhoto } from "@/app/albums/actions/albumPhoto";
import { getAlbumImageUrl, getDefaultAlbumImageUrl } from "@/app/lib/imageHelper";

interface IProps {
  id: number;
  filename: string;
}

export default function AlbumPhotoForm({id, filename}: IProps) {

  let photoUrl = getDefaultAlbumImageUrl();

  if(filename != null)
    photoUrl = getAlbumImageUrl(filename);

  const hiddenFileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(photoUrl);
  const triggerFileInput = () => hiddenFileInputRef.current?.click();
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>)  => {
    
    const file = event.target.files?.[0]; 
    const response = await saveAlbumPhoto(file, id);

    if(response?.success == true)
    {
      const url = getAlbumImageUrl(response.filename);

      setPreview(url);
      console.log(response.filename);
    } 
    else 
    {
      console.log(response?.message);
    }   
  } 

  return (
    
    <div className="grid grid-cols-12 p-5 gap-2">

      <div className="grid-cols-4 col-span-4">
        {preview && (
          <Image src={preview} className="img" alt="upload photo" height={100} width={100} /> 
        )}

        <input ref={hiddenFileInputRef} hidden type="file" onChange={handleFileChange} /> 
      </div>

      <div className="grid-cols-8 col-span-8">
        <div className="buttons">
          <button type="button" onClick={triggerFileInput} className="text-black py-1.5 px-6 text-sm bg-[#b68d40] cursor-pointer text-center shadow-xs transition-all duration-500 hover:text-white tooltip">
            Click to upload
          </button> 
        </div>
        <div className="w-full text-xs mt-1">jpg/png files with a size less than 500kb</div>
      </div>
    </div>
  );
}