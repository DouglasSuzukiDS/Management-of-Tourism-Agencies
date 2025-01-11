'use client'

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useAuth } from "../../contexts/auth"
import { useRouter } from "next/navigation"
import { Login } from "./login"
import { Register } from "./register"

export const Form = () => {
   const [login, setLogin] = useState('')
   const [password, setPassword] = useState('')

   const [name, setName] = useState('')
   const [role, setRole] = useState('analyst')

   const [newAccount, setNewAccount] = useState(false)

   const { signIn, signOut, user } = useAuth()

   return (
      <div className="flex flex-col justify-center items-center w-full h-full px-10 text-white gap-10 border">

         {newAccount ?
            <Register
               name={name}
               setName={setName}
               login={login}
               setLogin={setLogin}
               password={password}
               setPassword={setPassword}
               role={role}
               setRole={setRole}
               setNewAccount={setNewAccount}
            /> :

            <Login
               login={login}
               setLogin={setLogin}
               password={password}
               setPassword={setPassword}
               setNewAccount={setNewAccount} />
         }
      </div>


   )
}