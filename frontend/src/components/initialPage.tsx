'use client'

import { useEffect } from "react"
import { AuthProvider, useAuth } from "../../contexts/auth"
import { About } from "./about"
import { Form } from "./form"
import { redirect, useRouter } from "next/navigation"

export const InitialPage = () => {
   const { loadStorage } = useAuth()

   const router = useRouter()

   const checkIfLogged = async () => {
      const logged = await loadStorage()

      logged && router.push('/agenncies')
   }

   useEffect(() => {
      checkIfLogged()
   }, [])

   return (
      <div className="h-screen w-screen flex justify-center items-center">
         <About />
         <Form />
      </div>
   )
}