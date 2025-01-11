'use client'

import { SidebarComponent } from "@/components/sidebar"
import { Agency } from "@/types/agency"
import { api } from "@/utils/api"
import { useEffect, useState } from "react"
import { useAuth } from "../../../contexts/auth"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Page() {
   const [agencies, setAgencies] = useState<Agency[]>([])
   const [agency, setAgency] = useState<Agency>()

   const { user } = useAuth()

   const router = useRouter()

   const getAgencies = async () => {
      await api.get('/agency')
         .then(res => {
            setAgencies(res.data.agencies)

            console.log(res.data)
         })
         .catch(err => {
            console.error(err)
         })
   }

   const deleteAgency = async (id: number) => {
      const agency: Agency | undefined = agencies.find(ag => ag.id === id)

      if (agency) {
         const delConfirm = confirm(`Realmente seseja excluir a agência ${agency?.name}`)

         delConfirm && await api.delete(`/agency/${id}`)
            .then(res => {
               setAgencies(agencies.filter(ag => ag.id !== id))

               console.log(res.data)
            })
            .catch(err => {
               console.error(err)
            })
      }
   }

   const showAgency = async (id: number) => {
      const agItem = agencies.filter(ag => ag.id === id)

      agency && setAgency(agItem[0])

      console.log(agItem[0])
      console.log(id)

      router.push(`/agencies/${id}`)
   }

   useEffect(() => {
      getAgencies()
   }, [])

   return (
      <div className="w-screen h-screen flex flex-row bg-customGray-medium">
         <SidebarComponent />

         <div className="flex flex-1 justify-center items-center px-10 border">
            <div className="bg-customGray-light rounded border">
               <h1 className="text-3xl text-gray-200">Agências</h1>

               {agencies.map(item => (
                  <div key={item.id} className="flex gap-5 py-5 px-2 flex-wrap border border-b">

                     <div className="flex gap-5">
                        <p>{item.name}</p>

                        <p>{item.description}</p>
                     </div>

                     <div className="flex gap-4">
                        <Button onClick={() => showAgency(item.id)}>
                           Mais informações
                        </Button>

                        <Button>Editar</Button>

                        <Button
                           variant={'destructive'}
                           disabled={user?.role !== 'admin' && true}
                           className={`${user?.role !== 'admin' && 'cursor-not-allowed'}`}
                           onClick={() => deleteAgency(item.id)}
                        >Excluir</Button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}