import { DIRECTION, SEARCH_MODE } from "@/app/lib/enums";

interface IProps {  
  direction: DIRECTION;
  selectedLetter: string;
  handleSearchClick: (letter: string, searchMode: SEARCH_MODE) => void; 
} 

function getAlphabet() {
  return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
}

export default function LetterPicker({handleSearchClick, direction, selectedLetter}: IProps) { 

  const alphabet = getAlphabet();

  return (
    <>
      <div className={`w-full
          ${direction == DIRECTION.HORIZONTAL ? "grid-cols-12 col-span-12" : "grid-cols-12 col-span-12 md:grid-cols-1 md:col-span-1"}`}> 
 
        <div id="alphabet-search" className="flex flex-wrap gap-1">              
          {alphabet.map((letter) => (
            <div
              key={letter}
              className={`h-6 w-6 flex flex1 justify-center items-center bg-[#b68d40] ${selectedLetter == letter ? "text-black" : "text-white"} hover:cursor-pointer hover:text-black`}
              onClick={() => handleSearchClick(letter, SEARCH_MODE.LETTER)}
            >
              {letter}
            </div>
          ))}      
        </div>  
      </div>
    </>
  )
}