export type Member = 
{
  id: number;
  stageName: string; 
  firstName: string | undefined;
  middleName: string | undefined;
  surname: string | undefined;
  birthPlaceId: number; 
  dateOfBirth: string | undefined;
  dateOfDeath: string | undefined;
  photo: string;
  description: string;
}

export function isMember(obj: any): obj is Member {
  return obj && typeof obj.id === "number" && typeof obj.birthPlaceId === "number" && typeof obj.stageName === "string";
}