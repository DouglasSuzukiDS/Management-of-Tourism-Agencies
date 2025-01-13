'use client'

import { SidebarComponent } from "@/components/sidebar"
import { User } from "@/types/user"
import { api } from "@/utils/api"
import { useEffect, useState } from "react"
import { useAuth } from "../../../contexts/auth"
import { useRouter } from "next/navigation"
import { SignUpForm } from "@/components/signUpForm"
import { UserTable } from "@/components/userTableList"


export default function Page() {
   const [users, setUsers] = useState<User[]>([])

   const { user, loadStorage } = useAuth()

   const router = useRouter()

   const getUsers = async () => {
      await api.get('/users')
         .then(res => {
            const usersList: User[] = res.data.users
            setUsers(usersList.filter(u => u.id !== user?.id))

            console.log(res.data.users)
         })
         .catch(error => console.error(error))
   }

   const checkIfBeLogged = async () => {
      const logged = await loadStorage()

      if (logged) {
         getUsers()
      } else {
         router.push('/')
      }
   }

   useEffect(() => {
      checkIfBeLogged()
   }, [])

   return (
      <div className="w-auto h-screen flex flex-row bg-customGray-medium">
         {/* <SidebarComponent /> */}

         <div className="h-full w-auto flex flex-1 justify-center items-center p-10">

            {/* Agencies */}
            <div className="h-full flex flex-col warp p-10 bg-customGray-light rounded border overflow-y-auto shadow-md">
               {/* Title & Button New Agency */}
               <div className="flex justify-between">
                  <h1 className="text-3xl text-gray-200 mb-10">Colaboradores</h1>

                  <SignUpForm
                     user={null}
                     setUsers={setUsers} />
               </div>

               {/* Users List */}
               <UserTable
                  users={users}
                  setUsers={setUsers}
               />

            </div>

         </div>
      </div >
   )
}
