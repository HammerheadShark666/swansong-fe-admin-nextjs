export interface ArtistSearchItem 
{
  id: number;
  name: string;  
  photo: string;
} 

export function isArtistSearchItemArray(obj: any): obj is ArtistSearchItem[] {
  return (
    Array.isArray(obj) && obj.every((item: ArtistSearchItem) => 
      typeof item.id === "number" && 
      typeof item.name === "string" &&  
      typeof item.photo === "string"
    )
  );
}