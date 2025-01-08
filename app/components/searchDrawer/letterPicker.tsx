interface IProps {  
  handleSearchClick: (letter: string, searchBy: "letter" | "text") => void; 
} 

function getAlphabet() {
  return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
}

export default function LetterPicker({handleSearchClick}: IProps) { 

  const alphabet = getAlphabet();

  return (
    <> 
      <div className="w-full grid-cols-12 col-span-12">
        <div id="alphabet-search" className="grid grid-cols-12 gap-y-1 gap-x-2">              
          {alphabet.map((letter) => (
            <div
              key={letter}
              className="h-6 w-6 flex flex1 justify-center items-center bg-[#b68d40] text-white hover:cursor-pointer hover:text-black"
              onClick={() => handleSearchClick(letter, "letter")}
            >
              {letter}
            </div>
          ))}      
        </div>  
      </div>
    </>
  )
}