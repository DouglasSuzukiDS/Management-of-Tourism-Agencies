'use client'

import { InitialPage } from "@/components/initialPage"
import { AuthProvider } from "../../contexts/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const App = () => {
   const router = useRouter()

   useEffect(() => {
      router.push('/agencies')
   })

   return (
      <div className="h-screen w-screen flex justify-center items-center">
         <AuthProvider>
            <InitialPage />
         </AuthProvider>
      </div>
   )
}