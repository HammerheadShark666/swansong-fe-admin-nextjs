import { parseISO, format } from 'date-fns';

export default function DateTag({ dateString }) {

  if(dateString == undefined)
    return "";

  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'dd/MM/yyyy')}</time>;
}

export function getDateOnly(dateString)
{
  if(dateString === '' || dateString === null)
    return '';

  const date = new Date(dateString);         
  return date.toISOString().split('T')[0]; 
}