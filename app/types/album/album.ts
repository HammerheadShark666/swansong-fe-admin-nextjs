import { AlbumSong } from "@/app/types/album/albumSong";

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
  songs: AlbumSong[];
  description: string;
}