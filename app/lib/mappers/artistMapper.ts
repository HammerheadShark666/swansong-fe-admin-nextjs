import { ArtistDetailsSchema } from "@/app/artists/validation/artistDetailsSchema";
import { ArtistDescriptionSchema } from "../../artists/validation/artistDescriptionSchema";
import { ArtistMemberDetailsSchema } from "../../artists/validation/artistMemberDetailsSchema";
import { Artist } from "../../types/artist/artist";
import { ArtistDescription } from "../../types/artist/artistDescription";
import { ArtistMember } from "@/app/types/artist/artistMember";

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

export function mapArtistMember(data: ArtistMemberDetailsSchema) {

  const artistMember: ArtistMember = {
    id: data.id,
    artistId: data.artistId,
    photo: "",  ///IS IT NEEDED?
    stageName: "" ///IS IT NEEDED?
  }; 

  return artistMember;
}

export function mapArtistDescription(data: ArtistDescriptionSchema) {

  const artistDescription: ArtistDescription = {
    id: data.id,
    description: data.description,      
  }; 

  return artistDescription;
}