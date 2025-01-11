import { z } from "zod";

export const agencySchema = z.object({
   name: z.string().min(2, 'O nome da agência precisa conter pelos menos 2 caracteres'),
   fantasyName: z.string().min(2, 'O nome fantasia da agência precisa conter pelos menos 2 caracteres'),
   cnpj: z.number().min(14, 'O CPNJ precisa ser válido.').max(14, 'O CPNJ precisa ser válido.'),
   registerState: z.number().min(14, 'O CPNJ precisa ser válido.').max(14, 'O CPNJ precisa ser válido.'),
   status: z.boolean(),
   description: z.string().min(1, 'A agência precisa conter uma descrição'),
   foundation: z.string(),
   email: z.string().email('O email precisa ser válido'),
   contact: z.number().min(10, 'O número para contato precisa ser válido.')
})