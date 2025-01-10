import * as agencyService from '../services/agency'
import { RequestHandler } from "express";
import { agencySchema } from '../schemas/agency'

export const getAgenciesList: RequestHandler = async (req, res) => {
   try {
      const agenciesList = await agencyService.getAgencies()

      res.status(200).json({ agencies: agenciesList })
   } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Ocorreu um erro ao buscar as agências.' })
   }
}

export const getAgency: RequestHandler = async (req, res) => {
   const { id } = req.params

   try {
      const agencyById = await agencyService.getAgencyById(parseInt(id))

      if (!agencyById) res.status(404).json({ error: 'Agência não encontrada.' })

      res.status(200).json({ message: 'Agência localizada.', agency: agencyById })
   } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Ocorreu um erro ao buscar a agência.' })
   }
}

export const createAgency: RequestHandler = async (req, res) => {
   const safeData = agencySchema.safeParse(req.body)

   // Verifica os dados recebidos
   if (!safeData.success) {
      res.status(400).json({ error: safeData.error.flatten().fieldErrors })
      return
   }

   try {
      const agency = await agencyService.createAgency(safeData.data)

      // Verifica se a agência foi criada
      if (!agency) res.status(400).json({ error: 'Não foi possível criar a agência. Por favor,tente mais tarde.' })

      // Se a agencia for criata ele retorna os dados
      res.status(201).json({ message: 'Agência criada.', agency })
   } catch (err) {
      console.error(err)
      res.status(404).json({ error: 'Não foi possível criar a agência. Por favor,tente mais tarde.' })
      return
   }
}

export const updateAgencyData: RequestHandler = async (req, res) => {
   const { id } = req.params
   const safeData = agencySchema.safeParse(req.body)

   // Verifica os dados recebidos
   if (!safeData.success) {
      res.status(400).json({ error: safeData.error.flatten().fieldErrors })
      return
   }

   try {
      const agency = await agencyService.updateAgency(parseInt(id), safeData.data)

      // Verifica se a agência foi editada
      if (!agency) res.status(400).json({ error: 'Não foi possível editar as informações da agência. Por favor,tente mais tarde.' })

      // Se a agência for editada ele retorna os dados
      res.status(200).json({ message: 'Dados da agência editadas.', agency })
   } catch (err) {
      console.error(err)
      res.status(404).json({ error: 'Não foi possível editar as informações da agência. Por favor,tente mais tarde.' })
      return
   }
}

export const deleteAgency: RequestHandler = async (req, res) => {
   const { id } = req.params

   try {
      const agency = await agencyService.deleteAgency(parseInt(id))

      res.status(200).json({ message: 'Agência removida do sistema.', agency })
   } catch (err) {
      console.error(err)
      res.status(404).json({ error: 'Não foi possível remover a agência do sistema.' })
   }


}