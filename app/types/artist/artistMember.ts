export type ArtistMember = 
{
  id: number; 
  stageName: string;
  photo: string;
}

export function isArtistMember(obj: any): obj is ArtistMember {
  return obj && typeof obj.id === "number" && typeof  obj.name === "string";
}

export function isArtistMemberArray(obj: any): obj is ArtistMember[] {
  return (
    Array.isArray(obj) && obj.every(item => 
      typeof item.id === "number" && 
      typeof item.photo === "string" && 
      typeof item.stageName === "string"
    )
  );
}
 