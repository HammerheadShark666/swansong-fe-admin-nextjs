import { ArtistLookup } from "../artist/artistLookup";

export type Member = 
{
  id: number;
  stageName: string; 
  firstName: string | undefined;
  middleName: string | undefined;
  surname: string | undefined;
  birthPlaceId: number | null; 
  dateOfBirth: string | undefined;
  dateOfDeath: string | undefined;
  photo: string;
  description: string;
  artists: ArtistLookup[];
}

export function isMember(obj: any): obj is Member {
  return obj && typeof obj.id === "number" && (typeof obj.birthPlaceId === "number" || obj.birthPlaceId === null) && typeof obj.stageName === "string";
}