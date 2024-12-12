export type Song =
{
  id: number;
  albumId: number;
  songId: number;
  song: {
    id: number;
    title: string;
    length: string;
  };
  order: number;
  side: number;
}