export function numberToString(number: number)
{
  return number === null ? '' : number.toString()
}

export function selectKeyNumberToString(number: number)
{
  return (number === null || number == 0) ? '' : number.toString()
}

export function capitaliseWord(word: string) 
{
  return word.charAt(0).toUpperCase() + word.slice(1)
}