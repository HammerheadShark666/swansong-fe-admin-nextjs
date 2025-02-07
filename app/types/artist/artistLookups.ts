import { SelectItem } from "../selectItem";

export type ArtistLookups = 
{
  countries: SelectItem[];
}

export function isArtistLookups(obj: any): obj is ArtistLookups { 
  return obj && Array.isArray(obj.countries)
          && obj.countries.every((item: SelectItem) => typeof item.id === 'number' && typeof item.name === 'string');
}