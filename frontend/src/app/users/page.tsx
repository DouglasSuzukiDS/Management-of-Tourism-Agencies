'use client'

import { SidebarComponent } from "@/components/sidebar"
import { User } from "@/types/user"
import { api } from "@/utils/api"
import { useEffect, useState } from "react"
import { useAuth } from "../../../contexts/auth"
import { useRouter } from "next/navigation"
import { SignUpForm } from "@/components/signUpForm"
import { UserTable } from "@/components/userTableList"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"


export default function Page() {
   const [users, setUsers] = useState<User[]>([])

   const [cloneUsers, setCloneUsers] = useState<User[]>([])

   const { user, loadStorage } = useAuth()

   const router = useRouter()

   const getUsers = async () => {
      await api.get('/users')
         .then(res => {
            const usersList: User[] = res.data.users
            // setUsers(usersList.filter(u => u.id !== user?.id))
            setUsers(usersList)
            setCloneUsers(usersList)

            console.log(res.data.users)
         })
         .catch(error => console.error(error))
   }

   const checkIfBeLogged = async () => {
      const logged = await loadStorage()

      if (logged) {
         await getUsers()
      } else {
         router.push('/')
      }
   }

   const searchUser = (search: string) => {
      const filterUsers = users.filter(u =>
         u.name.toLowerCase().includes(search.toLowerCase()) ||
         u.role.toString().includes(search.toLowerCase())
      )

      if (filterUsers.length >= 1) {
         setCloneUsers(filterUsers)
      } else {
         setCloneUsers(users)
      }

   }

   useEffect(() => {
      checkIfBeLogged()
   }, [])

   return (
      <div className="w-auto h-screen overflow-y-auto flex flex-col bg-customGray-medium">
         {/* <SidebarComponent /> */}
         <Header />

         <div className="h-full w-auto flex flex-1 justify-center items-center p-10">

            {/* Users */}
            <div className="h-full flex flex-col warp p-10 bg-customGray-light rounded border overflow-y-auto shadow-md">
               {/* Title & Button New User */}
               <div className="flex justify-between flex-wrap mb-10">
                  <h1 className="text-3xl text-gray-200 mr-5">Colaboradores</h1>

                  <div className="flex flex-1 items-center gap-5">
                     <Input
                        className="bg-neutral-400 border-none ring-0 focus:ring-0 focus:border-none focus:outline-none font-bold"
                        onChange={e => searchUser(e.target.value)}
                        placeholder="Pesquisar" />

                     <SignUpForm
                        user={null}
                        setUsers={setUsers} />
                  </div>
               </div>

               {/* Users List */}
               <UserTable
                  users={cloneUsers}
                  setUsers={setUsers}
               />
            </div>

         </div>

         <Footer className="flex justify-center py-5 border-t gap-y-4" />
      </div>
   )
}
