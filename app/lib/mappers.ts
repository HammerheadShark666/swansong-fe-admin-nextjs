import { AlbumDetailsSchema } from "../albums/validation/albumDetailsSchema";
import { AlbumSongSchema } from "../albums/validation/albumSongSchema";
import { Album } from "../types/album";
import { AlbumSong } from "../types/albumSong";

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
    artwork: data.artwork,
    photo: "",
    songs: []
  }; 

  return album;
}

export function mapAlbumSong(data: AlbumSongSchema) {

  const albumSong: AlbumSong = {
    id: data.id,
    albumId: data.albumId, 
    side:  Number(data.side), 
    order: Number(data.order), 
    song: {
      id: data.song.id,
      title: data.song.title,
      length: data.song.length
    }     
  }; 

  return albumSong;
}