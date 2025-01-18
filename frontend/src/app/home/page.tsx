'use client'

import { Button } from "@/components/ui/button"
import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from "@/components/ui/avatar"
import { useAuth } from "../../../contexts/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { SidebarComponent } from "@/components/sidebar"
import { Header } from "@/components/header"
import { About } from "@/components/about"
import Link from "next/link"
import Image from "next/image"
import { url } from "inspector"
import { Footer } from "@/components/footer"

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
      <div className="w-screen h-screen flex flex-col justify-between bg-customGray-medium">
         <Header />

         <div className="flex h-auto justify-center p-4 overflow-y-auto">
            <div className="flex auto flex-col justify-center items-center max-w-lg border p-5 rounded-md shadow-md shadow-gray-300 overflow-y-auto h-auto">
               <About />
            </div>
         </div>

         <Footer className="flex justify-center text-center py-5 border-t gap-y-4" />
      </div >
   )
}