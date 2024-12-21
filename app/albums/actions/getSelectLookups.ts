import { createUrl } from "@/app/lib/http";
import { SelectItem } from "@/app/types/selectItem";
 
export type AlbumLookups = 
{
  artists: SelectItem[];
  recordLabels: SelectItem[]; 
  studios: SelectItem[]; 
}
  
export async function getAlbumLookups(): Promise<AlbumLookups> {
  
  const res = await fetch(createUrl("albums/lookups"), {
    cache: 'force-cache',
  });

  if (!res.ok) {
    //notFound();
  }

  const data: AlbumLookups = await res.json();
  return data; 
} 
  