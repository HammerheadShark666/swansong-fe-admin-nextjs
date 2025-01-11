import { MODE } from "./enums";

export function createUrl(path : string){
  return process.env.NEXT_PUBLIC_API_URL + path;
}

export default function getUrl(type: string, id:number) {

  switch(type)
  {
    case "albums":
      return "/albums/album/edit/" + id
    case "artists":
      return "/artists/artist/" + id
    default:
      return "/members/member/" + id
  }
} 

export function getAddUrl(mode: MODE)
{
  switch(mode) {  
    case MODE.ALBUM :
    {
      return "albums/album/add";
    }
    case MODE.ARTIST :
    {
      return "artists/artist/add";
    }
    case MODE.MEMBER :
    {
      return "members/member/add";
    }
    default:
      throw new Error("Add url not found for mode: " + mode);
  }  
}