'use client'

import { SidebarComponent } from "@/components/sidebar"
import { Agency } from "@/types/agency"
import { api } from "@/utils/api"
import { useEffect, useState } from "react"
import { useAuth } from "../../../contexts/auth"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import { TooltipCustom } from "@/components/tooltip"
import { AgencyForm } from "@/components/agencyForm"
import { useAgency } from "@/hooks/useAgency"
export default function Page() {
   const [agencies, setAgencies] = useState<Agency[]>([])
   const [agency, setAgency] = useState<Agency>()
   const [newAgency, setNewAgency] = useState(false)

   const { user, loadStorage } = useAuth()
   // const { agencies, setAgencies, getAgencies, deleteAgency } = useAgency()

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

   const checkIfBeLogged = async () => {
      const logged = await loadStorage()

      if (logged) {
         await getAgencies()
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
                  <h1 className="text-3xl text-gray-200 mb-10">Agências</h1>

                  <AgencyForm
                     agency={null}
                     setAgencies={setAgencies} />
               </div>

               {/* Cards Container */}
               <div className="flex justify-center items-center flex-wrap gap-4">
                  {agencies.map((item, index) => (
                     <div key={item.id}
                        className={`flex flex-col gap-5 p-5 flex-wrap border rounded-md hover:opacity-75 ${index % 2 === 0 ? 'bg-neutral-300' : 'bg-neutral-400'}`}>
                        {/* FantasyName & CNPJ */}
                        <div className="flex flex-col">
                           <div className="flex flex-col gap-2">
                              <p className="font-bold text-center">{item.fantasyName}</p>
                              <p><span className="font-bold">Desde: </span>{item.foundation}</p>
                           </div>

                           <div className="flex flex-col gap-2">
                              <p><span className="font-bold">CNPJ: </span>{item.cnpj}</p>
                              <p><span className="font-bold">Inscrição Estadual: </span>{item.registerState}</p>
                           </div>
                        </div>

                        {/* Status & Know more */}
                        <div className="flex justify-between gap-5">
                           <Badge
                              className={`text-white py-2 px-5 border-none ${item.status === true && 'bg-green-600 hover:opacity-75'}`}
                              variant={item.status === true ? 'outline' : 'destructive'}
                           >
                              {item.status === true ? 'ATIVA' : 'INATIVA'}
                           </Badge>

                           <Button
                              variant={'ghost'}
                              className="border border-black font-bold"
                              onClick={() => showAgency(item.id)}>
                              Mais informações
                           </Button>


                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between gap-4">

                           <AgencyForm
                              agency={item}
                              setAgencies={setAgencies} />

                           <div className={`${user?.role !== 'admin' && 'cursor-not-allowed'}`}>
                              <Button
                                 variant={'destructive'}
                                 disabled={user?.role !== 'admin' && true}
                                 className={`flex font-bold justify-center ${user?.role !== 'admin' && 'cursor-not-allowed'}`}
                                 onClick={() => deleteAgency(item.id)}
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