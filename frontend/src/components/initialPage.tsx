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

      logged && router.push('/agencies')
   }

   useEffect(() => {
      checkIfLogged()
   }, [])

   return (
      <div className="h-screen w-screen flex justify-center items-center">
         <div className="hidden h-screen md:w-1/2 md:flex flex-col justify-center items-center gap-10 px-10 overflow-y-auto border">
            <div className="m-5 p-5 border rounded-md shadow-md shadow-gray-300 overflow-y-auto">
               <About />
            </div>
         </div>

         <div className="flex flex-col flex-1 justify-center items-center h-full px-5 md:px-10 text-white gap-10 overflow-y-auto">
            <div className="w-full m-5 p-5 border rounded-md shadow-md shadow-gray-300 overflow-y-auto">
               <Form />
            </div>
         </div>
      </div>
   )
}