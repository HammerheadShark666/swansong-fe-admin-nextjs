import { SelectItem } from "../selectItem";

export type MemberLookups = 
{
  birthPlaces: SelectItem[];
}

export function isMemberLookups(obj: any): obj is MemberLookups { 
  return obj && Array.isArray(obj.birthPlaces)
          && obj.birthPlaces.every((item: SelectItem) => typeof item.id === 'number' && typeof item.name === 'string');
}