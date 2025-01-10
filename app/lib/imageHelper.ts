import { DEFAULT_ALBUM_PHOTO, DEFAULT_ARTIST_PHOTO, DEFAULT_MEMBER_PHOTO, SWANSONG_LOGO } from "./constants";

export function getAlbumImageUrl(filename: string) {
    return `${process.env.NEXT_PUBLIC_AZURE_STORAGE_URL}` + `${process.env.NEXT_PUBLIC_APP_SITE_ALBUMS}` + '/' + filename;  
  }
  
  export function getDefaultAlbumImageUrl() {
    return `${process.env.NEXT_PUBLIC_AZURE_STORAGE_URL}` + `${process.env.NEXT_PUBLIC_APP_SITE_ALBUMS}` + '/' + DEFAULT_ALBUM_PHOTO;
  }
  
  export function getArtistImageUrl(filename: string) {
    return `${process.env.NEXT_PUBLIC_AZURE_STORAGE_URL}` + `${process.env.NEXT_PUBLIC_APP_SITE_ARTISTS}` + '/' + filename;  
  }
  
  export function getDefaultArtistImageUrl() {
    return `${process.env.NEXT_PUBLIC_AZURE_STORAGE_URL}` + `${process.env.NEXT_PUBLIC_APP_SITE_ARTISTS}` + '/' + DEFAULT_ARTIST_PHOTO;
  }
  
  export function getMemberImageUrl(filename: string) {
    return `${process.env.NEXT_PUBLIC_AZURE_STORAGE_URL}` + `${process.env.NEXT_PUBLIC_APP_SITE_MEMBERS}` + '/' + filename;  
  }
  
  export function getDefaultMemberImageUrl() {
    return `${process.env.NEXT_PUBLIC_AZURE_STORAGE_URL}` + `${process.env.NEXT_PUBLIC_APP_SITE_MEMBERS}` + '/' + DEFAULT_MEMBER_PHOTO;
  }
  
  export function getLogoImageUrl() {
    return `${process.env.NEXT_PUBLIC_AZURE_STORAGE_URL}` + `${process.env.NEXT_PUBLIC_APP_SITE_IMAGES}` + '/' + SWANSONG_LOGO;
  }

  
export function getPhoto(photo: string)
{
  if(photo === '')
    return DEFAULT_ALBUM_PHOTO;

  return photo;
}