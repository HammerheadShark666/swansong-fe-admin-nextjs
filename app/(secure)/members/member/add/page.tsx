import PageNavigationBar from "@/app/components/navigation/pageNavigationBar";
import { Metadata } from "next";
import AddMemberTabs from "@/app/(secure)/members/components/tabs/addMemberTabs";
import { ACTION, MODE } from "@/app/lib/enums";
import { getMemberLookupsForm } from "@/app/(secure)/members/actions/lookups";  

export const metadata: Metadata = {
  title: "Swansong - Add Member",
  description: "Swansong music admin site"
}

export default async function AddMemberPage() {  
 
  const lookups = await getMemberLookupsForm();  
 
  return  (    
    <>    
      <PageNavigationBar action={ACTION.ADD} mode={MODE.MEMBER}></PageNavigationBar>
      <div className="flex flex-col w-full border-gray-100 bg-white h-full flex-1 pl-4 pr-4">  
        <AddMemberTabs birthPlaceItems={lookups.birthPlaces}></AddMemberTabs>
      </div>
    </> 
  )
};