export function numberToString(number: number)
{
  return number === null ? '' : number.toString()
}

export function selectKeyNumberToString(number: number)
{
  return (number === null || number == 0) ? '' : number.toString()
}