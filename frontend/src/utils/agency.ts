import { Agency } from "@/types/agency"
import { api } from "./api"
import { Dispatch, SetStateAction } from "react"

export const getAgencies = async () => {
   await api.get('/agency')
      .then(res => {
         console.log(res.data)

         return res.data.agencies
      })
      .catch(err => {
         console.error(err)
         return []
      })
}