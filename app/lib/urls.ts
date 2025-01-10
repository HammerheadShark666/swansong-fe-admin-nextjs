export const SEARCH_ALBUMS_BY_LETTER = `${process.env.NEXT_PUBLIC_API_URL}albums/search-by-letter/{0}`;
export const SEARCH_ALBUMS_BY_TEXT = `${process.env.NEXT_PUBLIC_API_URL}albums/search/{0}`;
 
export const GET_RANDOM_ALBUMS = `${process.env.NEXT_PUBLIC_API_URL}albums/random`;
export const GET_ALBUM = `${process.env.NEXT_PUBLIC_API_URL}albums/album/{0}`;
export const ALBUM_ADD = `${process.env.NEXT_PUBLIC_API_URL}albums/album/add`;
export const ALBUM_UPDATE_DESCRIPTION = `${process.env.NEXT_PUBLIC_API_URL}albums/album/description/update`;
export const ALBUM_UPDATE = `${process.env.NEXT_PUBLIC_API_URL}albums/album/update`;
export const ALBUM_UPDATE_PHOTO = `${process.env.NEXT_PUBLIC_API_URL}albums/album/upload-photo/{0}`;
 
export const ALBUM_SONG_ADD = `${process.env.NEXT_PUBLIC_API_URL}album/songs/song/add`;
export const ALBUM_SONG_UPDATE = `${process.env.NEXT_PUBLIC_API_URL}album/songs/song/update`;
export const ALBUM_SONG_DELETE = `${process.env.NEXT_PUBLIC_API_URL}album/songs/song/{0}`;