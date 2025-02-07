import { MODE } from "../lib/enums";

export type LookupItem =
{
    id: number;
    name: string;    
}

export type Lookups = 
{
    countries: LookupItem[],
    recordLabels: LookupItem[], 
    studios: LookupItem[],
    birthPlaces: LookupItem[]
}

export type LookupTab =
{
    mode: MODE,
    items: LookupItem[]
}

export function isLookups(obj: any): obj is Lookups { 
 
  return obj && Array.isArray(obj.countries)
             && obj.countries.every((item: LookupItem) => typeof item.id === 'number' && typeof item.name === 'string')             
             && Array.isArray(obj.recordLabels)
             && obj.recordLabels.every((item: LookupItem) => typeof item.id === 'number' && typeof item.name === 'string')             
             && Array.isArray(obj.studios)
             && obj.studios.every((item: LookupItem) => typeof item.id === 'number' && typeof item.name === 'string')             
             && Array.isArray(obj.birthPlaces)
             && obj.birthPlaces.every((item: LookupItem) => typeof item.id === 'number' && typeof item.name === 'string')              
}