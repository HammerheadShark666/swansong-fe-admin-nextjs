export interface ArtistSearchItem 
{
  id: number;
  name: string;  
  photo: string;
}

export interface ArtistSearchResponse
{
  results: ArtistSearchItem[];
}