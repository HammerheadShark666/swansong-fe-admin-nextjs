export interface AlbumSongResponse {id: number, songId: number}

export function isAlbumSongResponse(obj: any): obj is AlbumSongResponse {
  return obj && typeof obj.id === "number" && typeof obj.songId === "number";
}