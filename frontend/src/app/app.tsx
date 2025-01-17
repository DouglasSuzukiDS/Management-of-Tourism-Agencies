'use client'

import { InitialPage } from "@/components/initialPage"
import { AuthProvider, useAuth } from "../../contexts/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const App = () => {
   const { loadStorage } = useAuth()
   const router = useRouter()

   const checkIfBeLogged = async () => {
      const logged = await loadStorage()

      if (logged) {
         router.push('/agencies')
      } else {
         router.push('/')
      }
   }

   useEffect(() => {
      checkIfBeLogged()
   }, [])

   return (
      <div className="h-screen w-screen flex justify-center items-center">
         <AuthProvider>
            <InitialPage />
         </AuthProvider>
      </div>
   )
}