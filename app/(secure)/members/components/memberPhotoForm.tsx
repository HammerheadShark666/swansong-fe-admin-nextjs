"use client";

import { useRef, useState } from "react"; 
import Image from "next/image";
import { saveMemberPhoto } from "@/app/(secure)/members/actions/memberPhoto";
import { getMemberImageUrl, getDefaultMemberImageUrl } from "@/app/lib/imageHelper";
import Messages from "@/app/components/controls/messages";
import { Message } from "@/app/types/message"; 
import { delayAlertRemove } from "@/app/lib/generalHelper"; 
import { isAddPhotoResponse } from "@/app/interfaces/addPhotoResponse";
import { MESSAGE_TYPE } from "@/app/lib/enums";

interface IProps {
  id: number;
  filename: string;
  setShowSpinner: (show: boolean) => void;
}

export default function MemberPhotoForm({id, filename, setShowSpinner}: IProps) {

  const [messages, setMessages] = useState<Message[]>([]); 

  let photoUrl = getDefaultMemberImageUrl();

  if(filename != null && filename != "")
    photoUrl = getMemberImageUrl(filename);

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
    const response = await saveMemberPhoto(file, id); 

    if(isAddPhotoResponse(response))      
    { 
      const url = getMemberImageUrl(response.filename);
      setPreview(url);

      setMessages([{ severity: MESSAGE_TYPE.INFO, text: "Member photo saved."}]);   
      delayAlertRemove().then(function() {
        setMessages([]);   
      });
    }      
    else
      setMessages(response.messages);
 
    setShowSpinner(false);   
  } 

  return (  
    <>
      <Messages messages={messages} onClearMessages={handleClearMessages}></Messages>    
      <div className={`flex flex-col md:flex-row ${messages.length > 0 ? 'mt-4': ''}`}>
        <div className="flex mb-4 md:mb-0 mr-0 md:mr-4 ">
          {preview && (                  
              <Image alt="Upload member photo"
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