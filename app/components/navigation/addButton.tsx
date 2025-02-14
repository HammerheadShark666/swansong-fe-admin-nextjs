import { MODE } from "@/app/lib/enums";
import { getModeLabel } from "@/app/lib/generalHelper"; 
import { getAddUrl } from "@/app/lib/http";
import Link from "next/link"; 
import { MdAddCircle } from "react-icons/md";

interface IProps {  
  mode: MODE;
}
 
export default function AddButton({mode}: IProps) {

  const modeLabel = getModeLabel(mode);
  const addUrl = getAddUrl(mode);

  return (
    <Link href={addUrl} key="add-album" className="text-black text-sm bg-[#b68d40] cursor-pointer text-center shadow-xs transition-all duration-500 hover:text-white tooltip" data-tip={'Add ' + modeLabel}>
      <div className="flex justify-center items-center h-8 w-12">
        <MdAddCircle className="w-8 h-8 block align-middle" />
      </div>    
    </Link>
  )
}