import { z } from "zod";

export const userSchema = z.object({
   id: z.number(),
   name: z.string().min(3, 'O nome precisa ter pelo menos 3 caracteres'),
   login: z.string().min(3, 'O login precisa ter pelo menos 3 caracteres'),
   password: z.string().min(3, 'Asenha precisa ter pelo menos 3 caracteres'),
   role: z.string()
})