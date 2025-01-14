export interface MemberSearchItem 
{
  id: number;
  stageName: string;  
  photo: string;
}

export interface ArtistSearchResponse
{
  results: MemberSearchItem[];
}