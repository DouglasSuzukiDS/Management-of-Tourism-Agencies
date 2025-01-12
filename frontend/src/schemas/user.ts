import { z } from "zod";

export const userSchema = z.object({
   name: z.string().min(3, 'O nome precisa ter pelo menos 3 caracteres'),
   email: z.string().min(3, 'O email precisa ter pelo menos 3 caracteres'),
   password: z.string().min(3, 'A senha precisa ter pelo menos 3 caracteres'),
   role: z.string()
})