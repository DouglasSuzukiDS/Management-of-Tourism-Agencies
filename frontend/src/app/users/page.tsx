'use client'

import { SidebarComponent } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { User } from "@/types/user"
import { api } from "@/utils/api"
import { Badge } from "lucide-react"
import { useEffect, useState } from "react"
import { useAuth } from "../../../contexts/auth"
import { useRouter } from "next/navigation"
import { SignUpForm } from "@/components/signUpForm"

export default function Page() {
   const [users, setUsers] = useState<User[]>([])
   const [user, setUser] = useState<User>()

   const { signUp, loadStorage } = useAuth()

   const router = useRouter()

   const getUsers = async () => {
      await api.get('/users')
         .then(res => {
            setUsers(res.data.users)

            console.log(res.data.users)
         })
         .catch(error => console.error(error))
   }

   const deleteUser = async (id: number) => {
      const agency: User | undefined = users.find(ag => ag.id === id)

      if (agency) {
         const delConfirm = confirm(`Realmente seseja excluir o usuário ${user?.name}`)

         delConfirm && await api.delete(`/user/${id}`)
            .then(res => {
               setUsers(users.filter(ag => ag.id !== id))

               console.log(res.data)
            })
            .catch(err => {
               console.error(err)
            })
      }
   }

   const showUser = async (id: number) => {
      const user = users.filter(u => u.id === id)

      user && setUser(user[0])

      console.log(user[0])
      console.log(id)

      // router.push(`/user/${id}`)
   }

   const checkIfBeLogged = async () => {
      const logged = await loadStorage()

      logged && getUsers()
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

               {/* Cards Container */}
               <div className="flex justify-center items-center flex-wrap gap-4">
                  {users.map((u, index) => (
                     <div key={index} className="">
                        <p>{u.name}</p>
                        <p>{u.email}</p>
                        <p>{u.password}</p>
                        <p>{u.role}</p>
                        <p>{u.name}</p>


                        {/* Buttons */}
                        <div className="flex justify-between gap-4">

                           <SignUpForm
                              user={u}
                              setUsers={setUsers} />

                           <div className={`${user?.role !== 'admin' && 'cursor-not-allowed'}`}>
                              <Button
                                 variant={'destructive'}
                                 disabled={user?.role !== 'admin' && true}
                                 className={`flex justify-center ${user?.role !== 'admin' && 'cursor-not-allowed'}`}
                                 onClick={() => deleteUser(u.id)}
                              >Excluir</Button>
                           </div>
                        </div>
                     </div>

                  ))}
               </div>
            </div>

         </div>
      </div >
   )
}