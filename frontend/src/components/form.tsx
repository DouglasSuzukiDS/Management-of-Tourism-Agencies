'use client'

import { useState } from "react"
import { useAuth } from "../../contexts/auth"
import { Login } from "./login"
import { Register } from "./register"
import Link from "next/link"
import { Footer } from "./footer"

export const Form = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const [name, setName] = useState('')
   const [role, setRole] = useState('analyst')

   const [newAccount, setNewAccount] = useState(false)

   const { signIn, signOut, user } = useAuth()

   return (
      <div className="flex flex-col flex-1 md:w-1/2 justify-center items-center h-full px-10 text-white gap-10 border">
         {newAccount ?
            <Register
               name={name}
               setName={setName}
               email={email}
               setEmail={setEmail}
               password={password}
               setPassword={setPassword}
               role={role}
               setRole={setRole}
               setNewAccount={setNewAccount}
            /> :

            <Login
               email={email}
               setEmail={setEmail}
               password={password}
               setPassword={setPassword}
               setNewAccount={setNewAccount} />
         }

         <Footer className="md:hidden flex" />
      </div>


   )
}