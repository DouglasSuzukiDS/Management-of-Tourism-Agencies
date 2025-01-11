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
   login: string
   setLogin: Dispatch<SetStateAction<string>>
   password: string
   setPassword: Dispatch<SetStateAction<string>>
   role: string
   setRole: Dispatch<SetStateAction<string>>
   setNewAccount: Dispatch<SetStateAction<boolean>>
}

export const Register = ({ name, setName, login, setLogin, password, setPassword, role, setRole, setNewAccount }: Props) => {
   const router = useRouter()

   const { signUp, signOut, user } = useAuth()

   const handleSubmit = async () => {
      const data: SignUp = { name, login, password, role }
      const safeParse = userSchema.safeParse(data)

      if (!safeParse.success) {
         // alert(JSON.stringify(safeParse.error.flatten().fieldErrors))
         alert('Preencha os campos corretamente.')
         return
      }
      const logged = await signUp(data)

      if (logged) {
         alert('Usuário realizado com sucesso!')

         setName('')
         setLogin('')
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
            label="Login"
            placeholder="Digite seu login"
            value={login}
            onChange={setLogin}
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
               className="text-white font-bold w-1/4 border transition-all ease-linear duration-75 hover:text-black "
               onClick={handleSubmit}>Registrar</Button>

            <Button
               variant={'default'}
               className="text-black font-bold w-1/4 bg-white hover:bg-black hover:text-white hover:border"
               onClick={() => setNewAccount(false)}>
               Fazer Login
            </Button>
         </div>
         <Button
            variant={'outline'}
            onClick={signOut}
            className="text-black">Sair</Button>

         <h1 className="text-3xl text-white">{user?.name}</h1>
      </div>
   )
}