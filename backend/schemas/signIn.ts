import { z } from "zod";

export const SignInSchema = z.object({
   login: z.string().min(3, "Login precisa ter pelo menos 3 caracteres"),
   password: z.string().min(3, "Senha precisa ter pelo menos 3 caracteres")
})