
import { Message } from "@/app/types/message"
import { z } from "zod";

// const messageSchema: z.ZodType<Message> = z.object({
//     severity: z.string(),
//     text: z.string(),
//   });


  const messageSchema = z.object({
    severity: z.string(),
    text: z.string(),
}) satisfies z.ZodType<Message>


export type MessageSchema = z.infer<typeof messageSchema>;