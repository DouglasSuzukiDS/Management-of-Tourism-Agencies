'use client'

import { Button } from "@/components/ui/button"
import { useAuth } from "../../../contexts/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { SidebarComponent } from "@/components/sidebar"
import { Header } from "@/components/header"

export default function Page() {
   const { signOut, loadStorage } = useAuth()

   const router = useRouter()

   const handleClick = async () => {
      await signOut()
      router.push('/')
   }

   const checkIfBeLogged = async () => {
      const logged = await loadStorage()

      if (!logged) {
         router.push('/')
      }
   }

   useEffect(() => {
      checkIfBeLogged()
   }, [])

   return (
      <div className="w-screen h-screen flex flex-col bg-customGray-medium">
         <Header />

         <div className="h-full w-auto flex flex-1 justify-center items-center p-10">
            <h1 className="text-5xl">HOME</h1>
         </div>
      </div>
   )
}