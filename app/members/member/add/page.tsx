import PageNavigationBar from "@/app/components/navigation/pageNavigationBar";
import { Metadata } from "next";
import { ACTION, MODE } from "@/app/lib/enums";

export const metadata: Metadata = {
  title: "Swansong - Add Artist",
  description: "Swansong music admin site"
}

export default async function AddMemberPage() {  
  
  return  (    
    <>    
      <PageNavigationBar action={ACTION.ADD} mode={MODE.ARTIST}></PageNavigationBar>
      <b>Using the h-full class</b>
        <div className="parent flex flex-col h-full bg-gray-300 mt-4 w-full">
            <div className="child flex-1 bg-blue-500 w-1/2"></div>
            <div className="child flex-1 bg-blue-500 w-1/2"></div>
        </div>
    </> 
  )
};