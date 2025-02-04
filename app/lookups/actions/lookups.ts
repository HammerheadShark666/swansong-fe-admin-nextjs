import { apiGetCall } from "@/app/lib/apiHelper";
import { CACHE_TYPE, MODE } from "@/app/lib/enums"; 
import { API_LOOKUP_ITEM_BIRTH_PLACE_ADD, API_LOOKUP_ITEM_BIRTH_PLACE_DELETE, API_LOOKUP_ITEM_BIRTH_PLACE_UPDATE, API_LOOKUP_ITEM_COUNTRY_ADD, API_LOOKUP_ITEM_COUNTRY_DELETE, API_LOOKUP_ITEM_COUNTRY_UPDATE, API_LOOKUP_ITEM_RECORD_LABEL_ADD, API_LOOKUP_ITEM_RECORD_LABEL_DELETE, API_LOOKUP_ITEM_RECORD_LABEL_UPDATE, API_LOOKUP_ITEM_STUDIO_ADD, API_LOOKUP_ITEM_STUDIO_DELETE, API_LOOKUP_ITEM_STUDIO_UPDATE, API_LOOKUPS } from "@/app/lib/urls"; 
import { Lookups } from "@/app/types/lookups";
import { mapLookupItem } from "@/app/lib/mappers/lookupMapper";
import { LookupItemSchema } from "../validation/lookupItemSchema";   
import { ApiResponse } from "@/app/interfaces/apiResponse";  
import { apiCall } from "@/app/lib/apiHelper";
import { API_METHOD } from "@/app/lib/enums"; 
import { formatString } from "@/app/lib/stringHelper";
import { LookupItemResponse } from "@/app/interfaces/lookupResponse";

export async function getLookups(): Promise<Lookups> {
  return await apiGetCall<Lookups>(API_LOOKUPS, CACHE_TYPE.NO_CACHE);
}
  
export async function saveExistingLookupItem(data: LookupItemSchema, mode: MODE): Promise<ApiResponse<LookupItemResponse>> {  
  return await apiCall<LookupItemResponse>(getUpdateApiPath(mode), API_METHOD.PUT, JSON.stringify(mapLookupItem(data))); 
}

export async function saveNewLookupItem(data: LookupItemSchema, mode: MODE): Promise<ApiResponse<LookupItemResponse>> {  
  return await apiCall<LookupItemResponse>(getAddApiPath(mode), API_METHOD.POST, JSON.stringify(mapLookupItem(data)));
}

export async function deleteLookupItem(id: number, mode: MODE): Promise<ApiResponse<LookupItemResponse>> {  
  return await apiCall<LookupItemResponse>(formatString(getDeleteApiPath(mode), id), API_METHOD.DELETE, null);   
}

const getAddApiPath = (mode: MODE) => {
    
  switch(mode)
  {
    case MODE.BIRTHPLACE:
      return API_LOOKUP_ITEM_BIRTH_PLACE_ADD
    case MODE.COUNTRY:
      return API_LOOKUP_ITEM_COUNTRY_ADD
    case MODE.RECORDLABEL:
      return API_LOOKUP_ITEM_RECORD_LABEL_ADD
    case MODE.STUDIO:
      return API_LOOKUP_ITEM_STUDIO_ADD
    default:
      throw new Error("Lookup add item api path not found.")
  } 
}
 
const getUpdateApiPath = (mode: MODE) => {
  
  switch(mode)
  {
    case MODE.BIRTHPLACE:
      return API_LOOKUP_ITEM_BIRTH_PLACE_UPDATE
    case MODE.COUNTRY:
      return API_LOOKUP_ITEM_COUNTRY_UPDATE
    case MODE.RECORDLABEL:
      return API_LOOKUP_ITEM_RECORD_LABEL_UPDATE
    case MODE.STUDIO:
      return API_LOOKUP_ITEM_STUDIO_UPDATE
    default:
      throw new Error("Lookup update item api path not found.")
  } 
}

const getDeleteApiPath = (mode: MODE) => {
  
  switch(mode)
  {
    case MODE.BIRTHPLACE:
      return API_LOOKUP_ITEM_BIRTH_PLACE_DELETE
    case MODE.COUNTRY:
      return API_LOOKUP_ITEM_COUNTRY_DELETE
    case MODE.RECORDLABEL:
      return API_LOOKUP_ITEM_RECORD_LABEL_DELETE
    case MODE.STUDIO:
      return API_LOOKUP_ITEM_STUDIO_DELETE
    default:
      throw new Error("Lookup delete item api path not found.")
  } 
}