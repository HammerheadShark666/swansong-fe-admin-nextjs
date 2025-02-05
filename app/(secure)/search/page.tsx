import SearchResultsContainer from "./components/search-results-container"; 

type tParams = Promise<{ criteria: string }>;

export default async function SearchPage(props: { searchParams: tParams }) {
      const { criteria } = await props.searchParams;

  return ( 
    <SearchResultsContainer criteria={criteria} ></SearchResultsContainer> 
  )
}