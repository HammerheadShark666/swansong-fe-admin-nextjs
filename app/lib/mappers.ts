import { AlbumDetailsSchema } from "../albums/validation/albumDetailsSchema";
import { Album } from "../types/album";

export function mapAlbum(data: AlbumDetailsSchema) {

  const album: Album = {
    id: data.id,
    name: data.name, 
    artistId:  Number(data.artistId), 
    releaseDate: data.releaseDate, 
    recordedDate: data.recordedDate,
    labelId: Number(data.labelId),
    studioId: Number(data.studioId),
    producers: data.producers,
    arrangers: data.arrangers,
    artwork: data.artwork
  }; 

  return album;
}