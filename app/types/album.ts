import { Song } from "./song";

export type Album =
{
  id: number;
  name: string;
  description: string;
  artistId: number;
  artistName: string;
  releaseDate: string;
  recordedDate: string;
  labelId: number;
  labelName: string;
  studioId: number;
  producers: string;
  arrangers: string;
  engineers: string;
  artwork: string;
  photo: string;
  songs: Song[];
}