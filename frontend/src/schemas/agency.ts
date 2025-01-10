import { z } from "zod";

export const agencySchema = z.object({
   name: z.string().min(2, 'O nome da agência precisa conter pelos menos 2 caracteres'),
   description: z.string().min(1, 'A agência precisa conter uma descrição'),
})