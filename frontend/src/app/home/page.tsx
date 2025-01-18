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

         {/* <div className="flex flex-col flex-1 h-full items-center justify-center">

            <div className="flex flex-col justify-center items-center w-1/2 border p-5 rounded-md shadow-md shadow-gray-300">

               <div className="flex flex-col justify-center items-center">
                  <h1 className="text-3xl text-center font-bold text-gray-400">Desenvolvido com 💗 por Douglas</h1>
               </div>

               <p className="text-center text-gray-400 text-lg">
                  Desenvolvedor Fullstack, formado como Técnico em Informática pelo Senac e atualmente estudante de Engenharia de Software pela Gran Faculdade, também sendo aluno do CFBCursos, B7WEB, DankiCode, e Matheus Fraga.
               </p>

               <p className="text-center text-gray-400 text-lg">
                  Apaixonado pela linguagem Javascript, se aventura pelo desenvolvimento <i><b>Frontend</b></i> com <b>React/Next</b>, <i><b>Backend</b></i> com <b>Node e Prisma</b>, e o <i><b>Mobile</b></i> com <b>React Native</b> utilizando o TailwindCSS em tudo que for possível 🤣
               </p>

               <div className="flex gap-5 mt-4">
                  <Button variant={'ghost'} className="border">
                     <Link
                        href={'https://www.linkedin.com/in/douglas-suzuki/'}
                        target="_blank"
                        className="text-center text-gray-400 font-bold hover:text-black">Linkedin</Link>
                  </Button>

                  <Button variant={'ghost'} className="border">
                     <Link
                        href={'https://github.com/DouglasSuzukiDS'}
                        target="_blank"
                        className="text-center text-gray-400 hover:text-black font-bold">GitHub</Link>
                  </Button>
               </div>
            </div>
         </div> */}

         <div className="flex h-auto justify-center p-4 overflow-y-auto">
            <div className="flex auto flex-col justify-center items-center max-w-lg border p-5 rounded-md shadow-md shadow-gray-300 overflow-y-auto h-auto">
               <About />
            </div>
         </div>

         <Footer className="flex justify-center text-center py-5 border-t gap-y-4" />
      </div >
   )
}