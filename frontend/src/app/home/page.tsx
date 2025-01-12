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

   const checkIfLogged = async () => {
      const logged = await loadStorage()

      if (!logged) router.replace('/')
   }

   useEffect(() => {
      checkIfLogged()
   }, [])

   return (
      <div className="w-screen h-screen flex flex-row bg-customGray-medium">
         <Header />
         {/* <SidebarComponent /> */}

         {/* <div>
            <h1 className="text-3xl">Home</h1>
         </div> */}

      </div>
   )
}