import { AlbumLookup } from "@/app/types/album/albumLookup";
import { ArtistLookup } from "@/app/types/artist/artistLookup";
import { MemberLookup } from "@/app/types/member/memberLookup";
 
export default function getToolTip(result: AlbumLookup | ArtistLookup | MemberLookup) {

  if("stageName" in result)
    return result.stageName;
  else if("artistName" in result)
    return result.name + ' - ' + result.artistName;
  else
    return result.name; 
}