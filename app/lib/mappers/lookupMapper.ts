
import { LookupItemSchema } from "@/app/(secure)/lookups/validation/lookupItemSchema";
import { LookupItem } from "@/app/types/lookups";

export function mapLookupItem(data: LookupItemSchema) {

  const lookupItem: LookupItem = {
    id: data.id,
    name: data.name    
  }; 

  return lookupItem;
}