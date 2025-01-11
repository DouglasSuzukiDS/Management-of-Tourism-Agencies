'use client'

import { Home, House, TowerControl, TowerControlIcon, User } from "lucide-react"
import Link from "next/link"
import { SignOutButton } from "./signOutButton"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../contexts/auth"

export const SidebarComponent = () => {

   const linkItems = [
      { label: "Home", href: "/home", icon: Home },
      { label: "Usuários", href: "/users", icon: User },
      { label: "Agências", href: "/agencies", icon: TowerControlIcon },
   ]

   const { loadStorage } = useAuth()
   const router = useRouter()

   const checkIfLogged = async () => {
      const logged = await loadStorage()

      if (!logged) router.replace('/')
   }

   useEffect(() => {
      checkIfLogged()
   }, [])

   return (
      <div className="bg-customGray-dark py-10 px-5">
         <h1 className="text-white mb-5">Gestão de Agências de Turismo</h1>

         <div className="flex flex-col h-full justify-between border">
            <div>
               {linkItems.map((item, index) => (
                  <Link key={index} href={item.href} className="flex gap-4 my-4">
                     <item.icon />
                     {item.label}
                  </Link>
               ))}
            </div>

            <SignOutButton />
         </div>
      </div>
   )
}