import { Dispatch, SetStateAction, useState } from "react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useAuth } from "../../contexts/auth"
import { InputCustom } from "./input"

type Props = {
   email: string
   setEmail: Dispatch<SetStateAction<string>>
   password: string
   setPassword: Dispatch<SetStateAction<string>>
   setNewAccount: Dispatch<SetStateAction<boolean>>
}

export const Login = ({ email, setEmail, password, setPassword, setNewAccount }: Props) => {
   const router = useRouter()

   const { signIn, signOut, user } = useAuth()

   const handleSubmit = async () => {
      const logged = await signIn(email, password)

      if (logged) {
         alert('Login realizado com sucesso!')

         setEmail('')
         setPassword('')

         router.push('agencies')
      } else {
         alert('Falha ao realizar login!')
      }
   }

   const goToRegister = () => {
      setEmail('')
      setPassword('')
      setNewAccount(true)
   }

   return (
      <div className="w-full flex flex-col gap-10">
         <h1 className="text-3xl text-center">Realize o Login</h1>

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
            type="password"
         />

         <div className="w-full flex gap-5">
            <Button
               variant={"default"}
               className="text-black font-bold w-1/4 bg-white hover:bg-black hover:text-white hover:border"
               onClick={handleSubmit}>Logar</Button>

            <Button
               variant={'ghost'}
               className="text-white font-bold w-1/4 border hover:text-black transition-all ease-linear duration-75"
               onClick={goToRegister}>
               Criar conta
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