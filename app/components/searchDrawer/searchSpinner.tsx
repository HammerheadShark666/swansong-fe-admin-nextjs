interface IProps {  
  isSearching: boolean;
} 
    
export default function SearchSpinner({isSearching}: IProps) { 
    
  return (
    <>          
      {(isSearching) ? (  
          <div className="w-full grid-cols-12 col-span-12 mt-4">    
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        )
        : (<></>)}          
    </>
  )
}