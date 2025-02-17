import { isSearchResults } from "@/app/types/searchResult";
import SearchResults from "./search-results";
import { getSearch } from "../actions/search";

export type IProps = 
{   
  criteria: string;   
}   

export default async function SearchResultsContainer(params: IProps) {
 
  const response = await getSearch(params.criteria);
  if(isSearchResults(response))
  {    
    const resultType: string[] = ["albums", "artists", "members"] 
    const albums = response.albums;
    const artists = response.artists;
    const members = response.members;

    return (          
      <>    
        <div className="max-w-7xl mx-auto grid grid-cols-12">
          <div className="col-span-12">          
            <div className="grid-cols-12 pt-5 pl-5"> 
              <span className="text-lg text-white">Search results for &quot;{params.criteria}&quot;</span>
            </div>       
            <SearchResults results={albums} type={resultType[0]}></SearchResults>
            <SearchResults results={artists} type={resultType[1]}></SearchResults>
            <SearchResults results={members} type={resultType[2]}></SearchResults> 
          </div>
        </div>  
      </>
    );
  }
  else
  {
    return (
      <div className="max-w-7xl mx-auto grid grid-cols-12">
        <div className="col-span-12">          
          <div className="grid-cols-12 pt-5 pl-5"> 
            <span className="text-lg text-white">No search results for &quot;{params.criteria}&quot;</span>
          </div>        
        </div>
      </div>  
    )
  }
} 