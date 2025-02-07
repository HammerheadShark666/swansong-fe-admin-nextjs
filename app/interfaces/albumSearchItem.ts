export interface AlbumSearchItem 
{
  id: number;
  name: string; 
  artistName: string;  
  photo: string;
}

export function isAlbumSearchItemArray(obj: any): obj is AlbumSearchItem[] {
  return (
    Array.isArray(obj) && obj.every((item: AlbumSearchItem) => 
      typeof item.id === "number" && 
      typeof item.name === "string" && 
      typeof item.artistName === "string" &&
      typeof item.photo === "string"
    )
  );
}