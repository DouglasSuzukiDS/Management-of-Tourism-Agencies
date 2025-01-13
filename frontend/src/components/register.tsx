import { Dispatch, SetStateAction, useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useAuth } from "../../contexts/auth"
import { InputCustom } from "./input"
import { RadioCustom } from "./radio"
import { userSchema } from "@/schemas/user"
import { SignUp } from "@/types/signUp"

type Props = {
   name: string
   setName: Dispatch<SetStateAction<string>>
   email: string
   setEmail: Dispatch<SetStateAction<string>>
   password: string
   setPassword: Dispatch<SetStateAction<string>>
   role: string
   setRole: Dispatch<SetStateAction<string>>
   setNewAccount: Dispatch<SetStateAction<boolean>>
}

export const Register = ({ name, setName, email, setEmail, password, setPassword, role, setRole, setNewAccount }: Props) => {
   const router = useRouter()

   const { signUp, signOut, user } = useAuth()

   const goToLogin = () => {
      setEmail('')
      setPassword('')
      setRole('analyst')
      setNewAccount(false)
   }

   const handleSubmit = async () => {
      const data: SignUp = { name, email, password, role }
      const safeParse = userSchema.safeParse(data)

      if (!safeParse.success) {
         // alert(JSON.stringify(safeParse.error.flatten().fieldErrors))
         alert('Preencha os campos corretamente.')
         return
      }
      const logged = await signUp(data)

      if (logged) {
         alert('Usuário cadastrado com sucesso!')

         setName('')
         setEmail('')
         setPassword('')
         setRole('analyst')
         setNewAccount(false)
      } else {
         alert('Falha ao realizar login!')
      }
   }

   return (
      <div className="w-full flex flex-col gap-10">
         <h1 className="text-3xl text-center">Realize o Cadastro</h1>

         <InputCustom
            label="Nome"
            placeholder="Digite seu nome"
            value={name}
            onChange={setName}
         />

         <InputCustom
            label="Email"
            placeholder="Digite seu email"
            value={email}
            onChange={setEmail}
         />

         <InputCustom
            label="Senha"
            placeholder="Digite sua senha"
            value={password}
            onChange={setPassword}
            type={'password'}
         />

         <RadioCustom
            role={role}
            setRole={setRole}
         />

         <div className="w-full flex gap-5">
            <Button
               variant={"ghost"}
               className="text-white font-bold border transition-all ease-linear duration-75 hover:text-black "
               onClick={handleSubmit}>Registrar</Button>

            <Button
               variant={'default'}
               className="text-black font-bold bg-white hover:bg-black hover:text-white hover:border"
               onClick={goToLogin}>
               Fazer Login
            </Button>
         </div>
      </div >
   )
}