import { createUrl } from "@/app/lib/http"; 
import { SearchResults } from "@/app/types/searchResult";
import { notFound } from "next/navigation"; 
import SearchResultsHtml from "./search-results";

export type IProps = 
{   
  criteria: string;   
}  

async function getSearchResults(criteria: string): Promise<SearchResults> {
  
  const res = await fetch(createUrl('search?criteria=' + criteria), {
    cache: 'force-cache',
  });

  if (!res.ok) {
    if(res.status == 404)
      notFound(); 
  }

  return res.json();
} 

export default async function SearchResultsContainer(params: IProps) {
 
  const searchResults = await getSearchResults(params.criteria); 
  const resultType: string[] = ["albums", "artists", "members"] 
  const albums = searchResults.albums;
  const artists = searchResults.artists;
  const members = searchResults.members;

  return (          
    <>    
      <div className="max-w-7xl mx-auto grid grid-cols-12">
        <div className="col-span-12">          
          <div className="grid-cols-12 pt-5 pl-5"> 
            <span className="text-lg text-white">Search results for &quot;{params.criteria}&quot;</span>
          </div>       
          <SearchResultsHtml results={albums} type={resultType[0]}></SearchResultsHtml>
          <SearchResultsHtml results={artists} type={resultType[1]}></SearchResultsHtml>
          <SearchResultsHtml results={members} type={resultType[2]}></SearchResultsHtml> 
        </div>
      </div>  
    </>
  );
} 