import { z } from "zod";

export const agencySchema = z.object({
   name: z.string().min(2, 'O nome da agência precisa conter pelos menos 2 caracteres'),
   fantasyName: z.string().min(2, 'O nome fantasia da agência precisa conter pelos menos 2 caracteres'),
   cnpj: z.string(),
   registerState: z.string(),
   status: z.boolean(),
   description: z.string().min(1, 'A agência precisa conter uma descrição'),
   foundation: z.string(),
   email: z.string().email('O email precisa ser válido'),
   contact: z.string(),
   address: z.string().min(3, 'O endereço da agência precisa ser informado.'),
   uf: z.string().min(2, 'O estado precisa ser informado pela sua sigla. Ex: RJ').max(2, 'O estado precisa ser informado pela sua sigla. Ex: RJ')
})