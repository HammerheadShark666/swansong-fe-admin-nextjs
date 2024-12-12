import { AlbumLookup } from "@/types/albumLookup";
import { ArtistLookup } from "@/types/artistLookup";
import { MemberLookup } from "@/types/memberLookup";
 
export default function getToolTip(result: AlbumLookup | ArtistLookup | MemberLookup) {

  if("stageName" in result)
    return result.stageName;
  else if("artistName" in result)
    return result.name + ' - ' + result.artistName;
  else
    return result.name; 
}