export function createUrl(path : string){
  return process.env.API_URL + path;
}
  
export const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.' + response.status);
  }

  return response.json();
};

export default function getUrl(type: string, id:number) {

  switch(type)
  {
    case "albums":
      return "/albums/album/" + id
    case "artists":
      return "/artists/artist/" + id
    default:
      return "/members/member/" + id
  }
}