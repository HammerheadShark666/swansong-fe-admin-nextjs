export function getAlbumImageUrl(filename: string) {
    return `${process.env.NEXT_PUBLIC_AZURE_STORAGE_URL}` + `${process.env.NEXT_PUBLIC_APP_SITE_ALBUMS}` + '/' + filename  
  }
  
  export function getDefaultAlbumImageUrl() {
    return `${process.env.NEXT_PUBLIC_AZURE_STORAGE_URL}` + `${process.env.NEXT_PUBLIC_APP_SITE_ALBUMS}` + '/default-album-image.jpg' 
  }
  
  export function getArtistImageUrl(filename: string) {
    return `${process.env.NEXT_PUBLIC_AZURE_STORAGE_URL}` + `${process.env.NEXT_PUBLIC_APP_SITE_ARTISTS}` + '/' + filename  
  }
  
  export function getDefaultArtistImageUrl() {
    return `${process.env.NEXT_PUBLIC_AZURE_STORAGE_URL}` + `${process.env.NEXT_PUBLIC_APP_SITE_ARTISTS}` + '/default-artist-image.jpg' 
  }
  
  export function getMemberImageUrl(filename: string) {
    return `${process.env.NEXT_PUBLIC_AZURE_STORAGE_URL}` + `${process.env.NEXT_PUBLIC_APP_SITE_MEMBERS}` + '/' + filename  
  }
  
  export function getDefaultMemberImageUrl() {
    return `${process.env.NEXT_PUBLIC_AZURE_STORAGE_URL}` + `${process.env.NEXT_PUBLIC_APP_SITE_MEMBERS}` + '/default-member-image.jpg' 
  }
  
  export function getLogoImageUrl() {
    return `${process.env.NEXT_PUBLIC_AZURE_STORAGE_URL}` + `${process.env.NEXT_PUBLIC_APP_SITE_IMAGES}` + '/SwanSongLogo2.PNG' 
  }