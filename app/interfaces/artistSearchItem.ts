export interface ArtistSearchItem 
{
  id: number;
  stageName: string;  
  photo: string;
}

export interface ArtistSearchResponse
{
  results: ArtistSearchItem[];
}