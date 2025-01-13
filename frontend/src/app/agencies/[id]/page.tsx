'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Agency } from "@/types/agency"
import { api } from "@/utils/api"
import { ArrowBigLeft, Mail, Phone } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuth } from "../../../../contexts/auth"
import { useAgency } from "@/hooks/useAgency"

type Props = {
   params: Promise<{ id: string }>
}
export default function Page({ params }: Props) {

   const [agency, setAgency] = useState<Agency>()

   const { user, loadStorage } = useAuth()

   // const { agencies, setAgencies, getAgencies, getAgencyById, deleteAgency, agency } = useAgency()

   const router = useRouter()

   const getAgency = async () => {
      const { id } = await params

      await api.get(`/agency/${id}`)
         //await api.get(`/agency/5`)
         .then(res => {
            setAgency(res.data.agency)
         })
         .catch(err => {
            console.error(err)
            alert('Agência não encontrada, você sera redirecionado para página de agências.')

            router.push('/agencies')
         })
   }

   const getAgencyXXX = async () => {
      const { id } = await params
      // await getAgencyById(parseInt(id))

   }

   const checkIfBeLogged = async () => {
      const logged = await loadStorage()

      if (logged) {
         getAgency()
      } else {
         router.push('/')
      }
   }

   useEffect(() => {
      checkIfBeLogged()
   }, [])

   return (
      <div className="h-screen flex justify-center items-center bg-customGray-light">

         <div className="max-w-[75%] border-2 rounded-md p-10 text-gray-200 font-bold">
            {/* Title & Descriptions */}
            <div className="flex flex-col gap-5">
               <h1 className="text-center text-gray-200 text-4xl">
                  {agency?.fantasyName}</h1>

               <p className="text-center text-gray-200 text-lg ">
                  {agency?.description}</p>
            </div>

            {/* Infos */}
            <div className="flex flex-col gap-4 my-5">
               <p>
                  CNPJ: {agency?.cnpj}</p>

               <p>
                  Inscrição Estadual: {agency?.registerState}</p>


               <div className="flex itens-center gap-2">
                  <p className="flex items-center">Situação: </p>

                  <Badge
                     className={`text-white py-2 px-5 border-none ${agency?.status === true && 'bg-green-600 hover:opacity-75'}`}
                     variant={agency?.status === true ? 'outline' : 'destructive'}
                  >
                     {agency?.status === true ? 'ATIVA' : 'INATIVA'}
                  </Badge>
               </div>

               <p>
                  Endereço: {agency?.address} - {agency?.uf}</p>

               <p>
                  Fundação: {agency?.foundation}</p>

               <p className="flex gap-2">
                  <Mail />
                  {agency?.email}</p>

               <p className="flex gap-2">
                  <Phone />
                  {agency?.contact}</p>

            </div>

            <Button
               variant={'ghost'}
               className="font-bold border"
               onClick={() => router.push('/agencies')}
            >
               <ArrowBigLeft />
               Voltar para listagen das agências
            </Button>

         </div>
      </div >
   )
}