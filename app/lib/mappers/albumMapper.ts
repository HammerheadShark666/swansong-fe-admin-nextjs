import { AlbumDetailsSchema } from "@/app/albums/validation/albumDetailsSchema";
import { AlbumDescriptionSchema } from "../../albums/validation/albumDescriptionSchema";
import { AlbumSongSchema } from "../../albums/validation/albumSongSchema";
import { Album } from "../../types/album/album";
import { AlbumDescription } from "../../types/album/albumDescription";
import { AlbumSong } from "@/app/types/album/albumSong";

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
    songs: [],
    description: ""
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

export function mapAlbumDescription(data: AlbumDescriptionSchema) {

  const albumDescription: AlbumDescription = {
    id: data.id,
    description: data.description,      
  }; 

  return albumDescription;
}