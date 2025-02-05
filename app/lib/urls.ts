export const API_SEARCH_ALBUMS_BY_LETTER = `${process.env.NEXT_PUBLIC_API_URL}albums/search-by-letter/{0}`;
export const API_SEARCH_ALBUMS_BY_TEXT = `${process.env.NEXT_PUBLIC_API_URL}albums/search/{0}`;
export const API_SEARCH_ARTISTS_BY_LETTER = `${process.env.NEXT_PUBLIC_API_URL}artists/search-by-letter/{0}`;
export const API_SEARCH_ARTISTS_BY_TEXT = `${process.env.NEXT_PUBLIC_API_URL}artists/search/{0}`;
export const API_SEARCH_MEMBERS_BY_LETTER = `${process.env.NEXT_PUBLIC_API_URL}members/search-by-letter/{0}`;
export const API_SEARCH_MEMBERS_BY_TEXT = `${process.env.NEXT_PUBLIC_API_URL}members/search/{0}`;

export const API_ALBUM_LOOKUPS = `${process.env.NEXT_PUBLIC_API_URL}albums/lookups`;  
export const API_GET_RANDOM_ALBUMS = `${process.env.NEXT_PUBLIC_API_URL}albums/random`;
export const API_GET_ALBUM = `${process.env.NEXT_PUBLIC_API_URL}albums/album/{0}`;
export const API_ALBUM_ADD = `${process.env.NEXT_PUBLIC_API_URL}albums/album/add`;
export const API_ALBUM_UPDATE_DESCRIPTION = `${process.env.NEXT_PUBLIC_API_URL}albums/album/description/update`;
export const API_ALBUM_UPDATE = `${process.env.NEXT_PUBLIC_API_URL}albums/album/update`;
export const API_ALBUM_UPDATE_PHOTO = `${process.env.NEXT_PUBLIC_API_URL}albums/album/upload-photo/{0}`;
 
export const API_ALBUM_SONG_ADD = `${process.env.NEXT_PUBLIC_API_URL}album/songs/song/add`;
export const API_ALBUM_SONG_UPDATE = `${process.env.NEXT_PUBLIC_API_URL}album/songs/song/update`;
export const API_ALBUM_SONG_DELETE = `${process.env.NEXT_PUBLIC_API_URL}album/songs/song/{0}`;
 
export const API_ARTIST_LOOKUPS = `${process.env.NEXT_PUBLIC_API_URL}artists/lookups`;
export const API_ARTIST_LOOKUPS_FORM = `${process.env.NEXT_PUBLIC_API_URL}artists/lookups/form`;
export const API_GET_RANDOM_ARTISTS = `${process.env.NEXT_PUBLIC_API_URL}artists/random`;
export const API_GET_ARTIST = `${process.env.NEXT_PUBLIC_API_URL}artists/artist-full-details/{0}`;
export const API_ARTIST_ADD = `${process.env.NEXT_PUBLIC_API_URL}artists/artist/add`;
export const API_ARTIST_UPDATE_DESCRIPTION = `${process.env.NEXT_PUBLIC_API_URL}artists/artist/description/update`;
export const API_ARTIST_UPDATE = `${process.env.NEXT_PUBLIC_API_URL}artists/artist/update`;
export const API_ARTIST_UPDATE_PHOTO = `${process.env.NEXT_PUBLIC_API_URL}artists/artist/upload-photo/{0}`;
  
export const API_MEMBER_LOOKUPS = `${process.env.NEXT_PUBLIC_API_URL}members/lookups`;
export const API_MEMBER_LOOKUPS_FORM = `${process.env.NEXT_PUBLIC_API_URL}members/lookups/form`;
export const API_GET_MEMBER = `${process.env.NEXT_PUBLIC_API_URL}members/member/{0}`;
export const API_MEMBER_ADD = `${process.env.NEXT_PUBLIC_API_URL}members/member/add`;
export const API_MEMBER_UPDATE = `${process.env.NEXT_PUBLIC_API_URL}members/member/update`;
export const API_MEMBERS_UPDATE_ARTISTS = `${process.env.NEXT_PUBLIC_API_URL}members/update/artist/assigned-to`;
export const API_MEMBER_UPDATE_DESCRIPTION = `${process.env.NEXT_PUBLIC_API_URL}members/member/description/update`;
export const API_MEMBER_UPDATE_PHOTO = `${process.env.NEXT_PUBLIC_API_URL}members/member/upload-photo/{0}`;

export const API_LOOKUPS = `${process.env.NEXT_PUBLIC_API_URL}lookups`;

export const API_LOOKUP_ITEM_BIRTH_PLACE_ADD = `${process.env.NEXT_PUBLIC_API_URL}birth-places/birth-place/add`;
export const API_LOOKUP_ITEM_BIRTH_PLACE_UPDATE = `${process.env.NEXT_PUBLIC_API_URL}birth-places/birth-place/update`;
export const API_LOOKUP_ITEM_BIRTH_PLACE_DELETE = `${process.env.NEXT_PUBLIC_API_URL}birth-places/birth-place/{0}`;

export const API_LOOKUP_ITEM_COUNTRY_ADD = `${process.env.NEXT_PUBLIC_API_URL}countries/country/add`;
export const API_LOOKUP_ITEM_COUNTRY_UPDATE = `${process.env.NEXT_PUBLIC_API_URL}countries/country/update`;
export const API_LOOKUP_ITEM_COUNTRY_DELETE = `${process.env.NEXT_PUBLIC_API_URL}countries/country/{0}`;

export const API_LOOKUP_ITEM_RECORD_LABEL_ADD = `${process.env.NEXT_PUBLIC_API_URL}record-labels/record-label/add`;
export const API_LOOKUP_ITEM_RECORD_LABEL_UPDATE = `${process.env.NEXT_PUBLIC_API_URL}record-labels/record-label/update`;
export const API_LOOKUP_ITEM_RECORD_LABEL_DELETE = `${process.env.NEXT_PUBLIC_API_URL}record-labels/record-label/{0}`;

export const API_LOOKUP_ITEM_STUDIO_ADD = `${process.env.NEXT_PUBLIC_API_URL}studios/studio/add`;
export const API_LOOKUP_ITEM_STUDIO_UPDATE = `${process.env.NEXT_PUBLIC_API_URL}studios/studio/update`;
export const API_LOOKUP_ITEM_STUDIO_DELETE = `${process.env.NEXT_PUBLIC_API_URL}studios/studio/{0}`;

export const API_REFRESH_TOKEN = `${process.env.NEXT_PUBLIC_API_URL}refresh-token`; 
export const API_REGISTER = `${process.env.NEXT_PUBLIC_API_URL}register`; 
export const API_VERIFY_EMAIL_REGISTRATION = `${process.env.NEXT_PUBLIC_API_URL}register/verify-email`; 

export const API_LOGIN = `${process.env.NEXT_PUBLIC_API_URL}login`;

export const FE_MEMBER_EDIT = `/members/member/edit/`;
export const FE_ARTIST_EDIT = `/artists/artist/edit/`;
export const FE_ALBUM_EDIT = `/albums/album/edit/`;
export const FE_SEARCH = `/search?criteria=`;