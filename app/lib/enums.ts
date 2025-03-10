export enum API_METHOD {
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

export enum CACHE_TYPE
{  
  CACHE = "force-cache",
  NO_CACHE = "no-store"
}

export enum MODE 
{
  ALBUM = "album", 
  ARTIST = "artist",
  BIRTHPLACE = "birthplace",
  COUNTRY = "countries",
  MEMBER = "member",
  RECORDLABEL = "recordlabels",
  STUDIO = "studio",
  LOOKUPS = "lookups"
}

export enum ACTION
{
   ADD = "add",
   EDIT = "edit",
   BOTH = "both"
}

export enum DROP_MODE 
{
  ADD = "add",
  REMOVE = "remove"
}

export enum SEARCH_MODE 
{
  LETTER = "letter",
  TEXT = "text"
}

export enum DIRECTION
{
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical"
}

export enum MESSAGE_TYPE
{
  ERROR = "error",
  INFO = "info",
  WARNING = "warning"
}