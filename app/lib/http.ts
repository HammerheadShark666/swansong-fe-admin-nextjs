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