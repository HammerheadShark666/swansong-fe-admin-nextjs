import { Song } from "./song";

export type AlbumSong =
{
  id: number;
  albumId: number;
  song: Song;
  order: number;
  side: number;
}