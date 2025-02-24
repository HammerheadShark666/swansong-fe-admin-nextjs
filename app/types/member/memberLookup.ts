export type MemberLookup = 
{
  id: number;
  stageName: string; 
  photo: string | null; 
}

export function isArtistMember(obj: any): obj is MemberLookup {
  return obj && typeof obj.id === "number" && typeof  obj.name === "string";
}

export function isArtistMemberArray(obj: any): obj is MemberLookup[] {
  return (
    Array.isArray(obj) && obj.every(item => 
      typeof item.id === "number" && 
      (typeof item.photo === "string" || item.photo === null) && 
      typeof item.stageName === "string"
    )
  );
}
 