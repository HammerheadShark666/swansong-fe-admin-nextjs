"use client";

import { useRef, useState } from "react"; 
import Image from "next/image";
import { saveAlbumPhoto } from "@/app/(secure)/albums/actions/albumPhoto";
import { getAlbumImageUrl, getDefaultAlbumImageUrl } from "@/app/lib/imageHelper";
import Messages from "@/app/components/controls/messages";
import { Message } from "@/app/types/message"; 
import { delayAlertRemove } from "@/app/lib/generalHelper";
import { ErrorResponse } from "@/app/interfaces/apiResponse";
import { AddPhotoResponse } from "@/app/interfaces/addPhotoResponse";

interface IProps {
  id: number;
  filename: string;
  setShowSpinner: (show: boolean) => void;
}

export default function AlbumPhotoForm({id, filename, setShowSpinner}: IProps) {

  const [messages, setMessages] = useState<Message[]>([]); 

  let photoUrl = getDefaultAlbumImageUrl();

  if(filename != null && filename != "")
    photoUrl = getAlbumImageUrl(filename);

  const hiddenFileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(photoUrl);
  const triggerFileInput = () => hiddenFileInputRef.current?.click();

  const handleClearMessages = () => {
    setMessages([]);
  };
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>)  => {
    
    setShowSpinner(true);
    setMessages([]);

    const file = event.target.files?.[0]; 
    const response = await saveAlbumPhoto(file, id); 

    if(response?.status == 200)     
    {
      const filename = (response.data as AddPhotoResponse).filename;
      const url = getAlbumImageUrl(filename);
      setPreview(url);

      setMessages([{ severity: "info", text: "Album photo saved."}]);   
      delayAlertRemove().then(function() {
        setMessages([]);   
      });
    }      
    else
    {
      if(response.data)        
        setMessages((response.data as ErrorResponse).messages);    
    }   
 
    setShowSpinner(false);   
  } 

  return (  
    <>
      <Messages messages={messages} onClearMessages={handleClearMessages}></Messages>      
      <div className={`flex flex-col md:flex-row ${messages.length > 0 ? 'mt-4': ''}`}>
        <div className="flex mb-4 md:mb-0 mr-0 md:mr-4 ">
          {preview && (                    
              <Image alt="Upload album photo"
                  src={preview} width={200} height={200} style={{ height: 'auto', objectFit: 'cover', position: 'relative' }}/>            
          )}
          <input ref={hiddenFileInputRef} hidden type="file" onChange={handleFileChange} /> 
        </div>

        <div>
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