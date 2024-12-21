//import { Song } from "./song";

export type Album =
{
  id: number;
  name: string; 
  artistId: number; 
  releaseDate: string | undefined;
  recordedDate: string | undefined;
  labelId: number; 
  studioId: number;
  producers: string;
  arrangers: string; 
  artwork: string;
  photo: string;
  // songs: Song[];
}