export interface MemberSearchItem 
{
  id: number;
  stageName: string;  
  photo: string | null;
} 

export function isMemberSearchItemArray(obj: any): obj is MemberSearchItem[] {
  return (
    Array.isArray(obj) && obj.every((item: MemberSearchItem) => 
      typeof item.id === "number" && 
      typeof item.stageName === "string" &&  
      (typeof item.photo === "string" || item.photo === null)
    )
  );
}