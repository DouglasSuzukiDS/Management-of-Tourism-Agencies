import { Agency } from "@/types/agency"
import { api } from "@/utils/api"
import { useState } from "react"

export const useAgency = () => {
   const [agencies, setAgencies] = useState<Agency[]>([])
   const [agency, setAgency] = useState<Agency>()

   const getAgencies = async () => {
      await api.get('/agency')
         .then(res => {
            setAgencies(res.data.agencies)

            console.log(res.data)
            return true
         })
         .catch(err => {
            console.error(err)
            return false
         })
   }

   const getAgencyById = async (id: number) => {
      await api.get(`agency/${id}`)
         .then(res => {
            setAgency(res.data.agencies)

            console.log(res.data)

            return res.data.agencies
         })
         .catch(err => {
            console.error(err)
            return false
         })
   }

   const postAgency = async (data: Agency) => {
      await api.post('/agency', { ...data })
         .then(async (res) => {
            alert('Agência cadastrada')
            //clearInputs()

            await api.get('/agency')
               .then(res => {
                  console.log(res.data)

                  setAgencies(res.data.agencies)
               })
               .catch(err => {
                  console.error(err)
                  return
               })

            console.log(res.data)
         })
         .catch(err => {
            console.error(err)
            alert('Não foi possível cadastrar a agência. Verifique se todos os campos estão preenchidos ou tente mais tarde.')
         })
   }

   const updateAgency = async (id: number, data: Agency) => {
      await api.put(`/agency/${id}`, { data })
         .then(async (res) => {
            alert('Agência editada')
            console.log(res.data)
            // clearInputs()

            await api.get('/agency')
               .then(res => {
                  console.log(res.data)

                  setAgencies(res.data.agencies)
               })
               .catch(err => {
                  console.error(err)
                  return
               })
         })
         .catch(err => {
            console.error(err)
            alert('Não foi possível editar a agência')
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
               return true
            })
            .catch(err => {
               console.error(err)
               return false
            })
      }
   }

   return { agencies, setAgencies, agency, setAgency, getAgencies, getAgencyById, postAgency, updateAgency, deleteAgency }
}