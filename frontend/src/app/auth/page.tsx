'use client'

import { useEffect } from "react"
import { AuthProvider, useAuth } from "../../../contexts/auth"
import { About } from "../../components/about"
import { Form } from "../../components/form"
import { useRouter } from "next/navigation"

export default function Page() {
   const { loadStorage } = useAuth()

   const router = useRouter()

   const checkIfLogged = async () => {
      const logged = await loadStorage()

      logged && alert('NAO')
   }

   useEffect(() => {
      checkIfLogged()
   }, [])

   return (
      <AuthProvider>
         <div className="h-screen w-screen flex justify-center items-center">
            <About />
            <Form />
         </div>
      </AuthProvider>
   )
}