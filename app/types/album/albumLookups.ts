import { SelectItem } from "../selectItem";

export type AlbumLookups = 
{
  artists: SelectItem[];
  recordLabels: SelectItem[]; 
  studios: SelectItem[]; 
}

export function isAlbumLookups(obj: any): obj is AlbumLookups { 
  return obj && Array.isArray(obj.artists) && Array.isArray(obj.recordLabels) && Array.isArray(obj.studios)
          && obj.artists.every((item: SelectItem) => typeof item.id === 'number' && typeof item.name === 'string');
}