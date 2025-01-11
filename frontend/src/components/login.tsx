import { Dispatch, SetStateAction, useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useAuth } from "../../contexts/auth"
import { InputCustom } from "./input"

type Props = {
   login: string
   setLogin: Dispatch<SetStateAction<string>>
   password: string
   setPassword: Dispatch<SetStateAction<string>>
   setNewAccount: Dispatch<SetStateAction<boolean>>
}

export const Login = ({ login, setLogin, password, setPassword, setNewAccount }: Props) => {
   const router = useRouter()

   const { signIn, signOut, user } = useAuth()

   const handleSubmit = async () => {
      const logged = await signIn(login, password)

      if (logged) {
         alert('Login realizado com sucesso!')

         setLogin('')
         setPassword('')

         router.push('home')
      } else {
         alert('Falha ao realizar login!')
      }
   }

   return (
      <div className="w-full flex flex-col gap-10">
         <h1 className="text-3xl text-center">Realize o Login</h1>

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
               onClick={() => setNewAccount(true)}>
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