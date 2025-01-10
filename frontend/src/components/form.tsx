'use client'

import { FormEvent, FormEventHandler, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { api } from "@/utils/api"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { AlertCustom } from "./alertCustom"
import axios from "axios"
import { useAuth } from "../../contexts/auth"

export const Form = () => {
   const [login, setLogin] = useState('')
   const [password, setPassword] = useState('')

   const { signIn, signOut, user } = useAuth()

   const handleSubmit = async () => {
      await api.post('/login', { login, password })
         .then(res => {
            signIn(login, password)

         })
         .catch(err => {
            alert(err.data)
         })
   }

   return (
      <div className="text-white border">
         <h1 className="text-3xl text-center">Realize o Login</h1>

         <label>Login</label>
         <Input
            placeholder='Digite seu login'
            className="text-black"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
         />

         <label>Senha</label>
         <Input
            placeholder='Digite sua senha'
            className="text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
         />

         <Button onClick={handleSubmit}>Logar</Button>

         <Button
            variant={'outline'}
            className="text-black">Criar conta</Button>

         <Button
            variant={'outline'}
            onClick={signOut}
            className="text-black">Sair</Button>

         <h1 className="text-3xl text-white">{user?.name}</h1>
         <h1 className="text-3xl text-white">{user?.login}</h1>
         <h1 className="text-3xl text-white">{user?.role}</h1>
      </div>
   )
}