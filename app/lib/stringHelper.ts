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

export function formatString(template: string, ...args: any[]): string {
  return template.replace(/{(\d+)}/g, (match, index) => {
      return typeof args[index] !== 'undefined' ? args[index] : match;
  });
}