import { z } from "zod";

export const signUpSchema = z.object({
   name: z.string().min(3, 'O nome precisa ter pelo menos 3 caracteres.'),
   email: z.string().email('O email precisa ser válido.'),
   password: z.string().min(3, 'A senha precisa ter pelo menos 3 caracteres.'),
   role: z.string()
})