'use client'

import { Agency } from "@/types/agency"
import { api } from "@/utils/api"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type Props = {
   params: Promise<{ id: string }>
}
export default async function Page({ params }: Props) {
   const { id } = await params

   const [agency, setAgency] = useState<Agency>()

   const router = useRouter()

   const getAgency = async () => {
      await api.get(`/agency/${id}`)
         .then(res => {
            setAgency(res.data.agency)
         })
         .catch(err => {
            console.error(err)
            alert('Agência não encontrada, você sera redirecionado para página de agências.')

            router.push('/agencies')
         })
   }

   useEffect(() => {
      getAgency()
   }, [])

   return (
      <div>
         <p>Agencia - {agency?.name}</p>
         <p>Descrição - {agency?.description}</p>
      </div>
   )
}