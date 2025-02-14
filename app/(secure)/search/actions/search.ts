import { ErrorResponse } from "@/app/interfaces/errorResponse";
import { apiGetCallAuthenticated } from "@/app/lib/apiHelper";
import { CACHE_TYPE } from "@/app/lib/enums";
import { API_SEARCH } from "@/app/lib/urls";
import { SearchResults } from "@/app/types/searchResult";

export async function getSearch(criteria: string): Promise<SearchResults | ErrorResponse> {  
  return await apiGetCallAuthenticated<SearchResults>(API_SEARCH + criteria, CACHE_TYPE.NO_CACHE);
}