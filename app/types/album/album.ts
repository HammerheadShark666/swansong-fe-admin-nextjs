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

export function isAlbum(obj: any): obj is Album {
  return obj && typeof obj.id === "number" && typeof obj.artistId === "number" && typeof obj.name === "string";
}