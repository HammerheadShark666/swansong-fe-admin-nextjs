import { SEARCH_MODE } from "@/app/lib/enums";

interface IProps {   
  selectedLetter: string;
  handleSearchClick: (letter: string, searchMode: SEARCH_MODE) => void; 
} 

function getAlphabet() {
  return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
}

export default function LetterPicker({handleSearchClick, selectedLetter}: IProps) { 

  const alphabet = getAlphabet();

  return (
    <>   
      <div id="alphabet-search" className="flex flex-col flex-wrap gap-1 w-full h-28 md:flex-col md:w-14 md:h-96 mr-0 md:mr-4">        
        {alphabet.map((letter) => (
          <div
            key={letter}
            className={`h-8 w-8 md:h-6 md:w-6 flex justify-center items-center bg-[#b68d40] ${selectedLetter == letter ? "text-black" : "text-white"} hover:cursor-pointer hover:text-black`}
            onClick={() => handleSearchClick(letter, SEARCH_MODE.LETTER)}
          >
            {letter}
          </div>
        ))}      
      </div>   
    </>
  )
}