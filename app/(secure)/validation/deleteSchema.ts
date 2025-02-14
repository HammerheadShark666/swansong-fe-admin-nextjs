import { z } from "zod"; 

export const deleteSchema = z.object({
  id: z
    .number()
});

export type DeleteSchema = z.infer<typeof deleteSchema>;