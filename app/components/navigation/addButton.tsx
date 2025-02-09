import { MODE } from "@/app/lib/enums";
import { getModeLabel } from "@/app/lib/generalHelper"; 
import { getAddUrl } from "@/app/lib/http";
import Link from "next/link";

interface IProps {  
  mode: MODE;
}
 
export default function AddButton({mode}: IProps) {

  const modeLabel = getModeLabel(mode);
  const addUrl =  getAddUrl(mode);
  
  return (
    <Link href={addUrl} key="add-album" className="text-black py-1.5 px-4 text-sm bg-[#b68d40] cursor-pointer text-center shadow-xs transition-all duration-500 hover:text-white tooltip" data-tip={'Add ' + modeLabel}>
      <div className="flex">
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="27px" height="27px"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"/></svg>
      </div>
    </Link>
  )
}