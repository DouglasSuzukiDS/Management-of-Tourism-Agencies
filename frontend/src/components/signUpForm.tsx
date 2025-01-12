import { Button } from "@/components/ui/button"
import {
   Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { TooltipCustom } from "./tooltip"
import { Plus } from "lucide-react"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { InputCustom } from "./input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { RadioButton } from "./radioButton"
import { Agency } from "@/types/agency"
import { useAuth } from "../../contexts/auth"
import { api } from "@/utils/api"
import { User } from "@/types/user"
import { getAgencies } from "@/utils/agency"
import { signUpSchema } from "@/schemas/singUp"

type Props = {
   user: User | null
   setUsers: Dispatch<SetStateAction<User[]>>
}
export function SignUpForm({ user, setUsers }: Props) {
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [role, setRole] = useState('analyst')

   // Para caso o usuário não mude a senha, seja enviado a 
   const [savePassword, setSavePassword] = useState('')

   const { signUp } = useAuth()

   // Quantas opções de radio forem necessários
   const radioOptions = [
      { value: 'analyst', label: 'Analista' },
      { value: 'admin', label: 'Admnistrador' },
   ]

   const handleNewUser = async () => {

      await signUp({ name, email, password, role })
         .then(async (res) => {
            alert('Colaborador cadastrado.')
            clearInputs()

            if (res) {
               await api.get('/users')
                  .then(res => {
                     console.log(res.data)

                     setUsers(res.data.users)
                  })
                  .catch(err => {
                     console.error(err)
                     return
                  })
            } else {
               alert('Não foi possível cadastrar o colaborador. Verifique se todos os campos estão preenchidos ou tente mais tarde.')
            }
         })
         .catch(err => {
            console.error(err)
            alert('Não foi possível cadastrar o colaborador. Verifique se todos os campos estão preenchidos ou tente mais tarde.')
         })
   }

   const handleEditUser = async (id: number) => {
      const data = { name, email, password, role }
      const safeData = signUpSchema.safeParse(data)

      password === savePassword ? console.log('SIM') : console.log('NÃO')

      if (!safeData.success) {
         console.log(safeData.error.flatten().fieldErrors)
         const errors = safeData.error.flatten().fieldErrors

         let errorsList = ['Não foi possível editar os dados do colaborador.\n\n']
         errors.name && errorsList.push(`Campo nome: ${errors.name}\n\n`)
         errors.email && errorsList.push(`Campo email: ${errors.email}\n\n`)
         errors.password && errorsList.push(`Campo senha: ${errors.password}\n\n`)



         alert(errorsList.join('').replace(',', ''))
      } else {
         await api.put(`/user/${id}`, {
            name,
            password,
            email,
            role
         })
            .then(async (res) => {
               alert('Colaborador editado.')
               console.log(res.data)
               clearInputs()

               await api.get('/users')
                  .then(res => {
                     console.log(res.data)

                     setUsers(res.data.users)
                  })
                  .catch(err => {
                     console.error(err)
                     alert('Não foi possível editar os dados do colaborador.')
                     return
                  })
               clearInputs()
            })
            .catch(err => {
               console.error(err)
               console.error(err.data.error)
               alert('Não foi possível editar os dados do colaborador.')
            })
      }
   }

   const clearInputs = async () => {
      setName('')
      setEmail('')
      setPassword('')
      setRole('analyst')
   }

   useEffect(() => {
      if (user === null) {
         clearInputs()
      } else {
         setName(user.name)
         setEmail(user.email)
         setPassword(user.password)
         setRole('analyst')

         setSavePassword(user.password)
      }
   }, [user])

   return (
      <Dialog>

         <DialogTrigger asChild>
            {user === null ?
               <TooltipCustom
                  buttonLabel={<Plus />}
                  className="bg-sky-300 hover:bg-sky-400"
                  tooltipText="Adicionar um novo colaborador"
                  onClick={() => { }}
               /> :
               <Button
                  variant={'default'}
                  className="bg-blue-400 font-bold hover:bg-blue-500 hover:opacity-75">Editar</Button>
            }
         </DialogTrigger>

         <DialogContent
            className="sm:max-w-[425px] max-h-[500px] overflow-y-auto bg-customGray-medium text-gray-200 rounded-md">

            <DialogHeader>
               <DialogTitle>{user === null ? 'Cadastrar um novo colaborador' : 'Editar dados do colaborador'}</DialogTitle>
               <DialogDescription>
                  Informe os dados do colaborador
               </DialogDescription>
            </DialogHeader>

            <div className="w-full grid gap-4 py-4">
               <InputCustom
                  label="Nome do colaborador"
                  placeholder="Digite o nome ddo colaborador"
                  className="w-full"
                  value={name}
                  onChange={setName}
               />

               <InputCustom
                  label="Email do colaborador"
                  placeholder="Digite o email do colaborador"
                  className="w-full"
                  value={email}
                  onChange={setEmail}
               />

               <InputCustom
                  label="Senha"
                  placeholder="Digite a senha"
                  className="w-full"
                  value={password}
                  type="password"
                  onChange={setPassword}
               />

               <RadioButton
                  options={radioOptions}
                  state={role}
                  setState={setRole}
                  checked={role}
               />
            </div>

            <DialogFooter className="w-full">
               {user === null ?
                  <Button
                     variant={"ghost"}
                     className="w-full border font-bold"
                     onClick={handleNewUser}>
                     Registrar
                  </Button> :
                  <Button
                     variant={"ghost"}
                     className="w-full border font-bold"
                     onClick={() => handleEditUser(user.id)}>
                     Editar
                  </Button>
               }
            </DialogFooter>

         </DialogContent>

      </Dialog>
   )
}
