import { z } from "zod";

export const signUpSchema = z.object({
   email: z.string().email('O email precisa ser válido.'),
   login: z.string().min(3, 'O login precisa ter pelo menos 3 caracteres'),
   password: z.string().min(3, 'A senha precisa ter pelo menos 3 caracteres'),
   role: z.string()
})