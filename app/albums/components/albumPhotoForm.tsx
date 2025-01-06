"use client";

import { useRef, useState } from "react"; 
import Image from "next/image";
import { saveAlbumPhoto } from "@/app/albums/actions/albumPhoto";
import { getAlbumImageUrl, getDefaultAlbumImageUrl } from "@/app/lib/imageHelper";
import Messages from "@/app/components/controls/messages";
import { Message } from "@/app/types/message";
import { displayMessage } from "@/app/lib/messageHelper";


interface IProps {
  id: number;
  filename: string;
}

export default function AlbumPhotoForm({id, filename}: IProps) {

  const [messages, setMessages] = useState<Message[]>([]); 

  let photoUrl = getDefaultAlbumImageUrl();

  if(filename != null)
    photoUrl = getAlbumImageUrl(filename);

  const hiddenFileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(photoUrl);
  const triggerFileInput = () => hiddenFileInputRef.current?.click();

  const handleClearMessages = () => {
    setMessages([]);
  };
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>)  => {
    
    setMessages([]);

    const file = event.target.files?.[0]; 
    const response = await saveAlbumPhoto(file, id);

    if(response?.success == true)
    {
      const url = getAlbumImageUrl(response.filename);

      setPreview(url);
      displayMessage("info", "Album photo saved.", setMessages);     
    } 
    else 
    {
      setMessages(response.messages.messages);  
    }   
  } 

  return (  
    <>
      <Messages messages={messages} onClearMessages={handleClearMessages}></Messages>      
      <div className={`grid grid-cols-12 gap-2 ${messages.length > 0 ? 'mt-4': ''}`}>
 
        <div className="grid-cols-12 col-span-12 md:grid-cols-4 md:col-span-4 lg:grid-cols-3 lg:col-span-3">
          {preview && ( 
            <div className="relative h-48 w-48 md:h-48 md:w-48">
            <Image
              src={preview}
              alt="Upload album photo"
              layout="fill"
              objectFit="cover"
            />
          </div>
          )}
          <input ref={hiddenFileInputRef} hidden type="file" onChange={handleFileChange} /> 
        </div>

        <div className="grid-cols-12 col-span-12 md:grid-cols-4 md:col-span-4">
          <div className="buttons">
            <button type="button" onClick={triggerFileInput} >
              Click to upload
            </button> 
          </div>
          <div className="w-full text-xs mt-1">jpg/png files with a size less than 500kb</div>
        </div>
      </div>
    </>
  );
}