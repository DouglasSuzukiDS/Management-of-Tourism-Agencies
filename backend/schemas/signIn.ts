import { z } from "zod";

export const SignInSchema = z.object({
   email: z.string().email('O email precisa ser válido.'),
   password: z.string().min(3, "Senha precisa ter pelo menos 3 caracteres")
})