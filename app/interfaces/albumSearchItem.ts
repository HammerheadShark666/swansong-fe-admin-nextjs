export interface AlbumSearchItem 
{
  id: number;
  name: string; 
  artistName: string;  
  photo: string;
}

export interface AlbumSearchResponse
{
  results: AlbumSearchItem[];
}