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