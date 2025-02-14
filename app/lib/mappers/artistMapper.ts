import { ArtistDetailsSchema } from "@/app/(secure)/artists/validation/artistDetailsSchema";
import { Artist } from "../../types/artist/artist";
import { ArtistDescription } from "../../types/artist/artistDescription"; 
import { ArtistDescriptionSchema } from "@/app/(secure)/artists/validation/artistDescriptionSchema"; 

export function mapArtist(data: ArtistDetailsSchema) {

  const artist: Artist = {
    id: data.id,
    name: data.name, 
    countryId:  Number(data.countryId), 
    formationYear: Number(data.formationYear),
    disbandYear: Number(data.disbandYear),
    photo: "",
    description: "",
    albums: [],
    members: []
  }; 

  return artist;
} 

export function mapArtistDescription(data: ArtistDescriptionSchema) {

  const artistDescription: ArtistDescription = {
    id: data.id,
    description: data.description,      
  }; 

  return artistDescription;
}