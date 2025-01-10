import { RequestHandler } from 'express'

import { prisma } from '../utils/prisma'
import { Prisma } from '@prisma/client'

export const getAgencies = async () => {
   const agenciesList = await prisma.agency.findMany()

   return agenciesList
}

export const getAgencyById = async (id: number) => {
   const agency = await prisma.agency.findFirst({
      where: { id }
   })

   return agency
}

export const createAgency = async (data: Prisma.AgencyCreateInput) => {
   const newAgency = await prisma.agency.create({ data })

   return newAgency
}

export const updateAgency = async (id: number, data: Prisma.AgencyUpdateInput) => {
   const agencyExists = await prisma.agency.findFirst({ where: { id } })

   if (!agencyExists) throw new Error("Agência não encontrada.")
   const updateAgency = await prisma.agency.update({
      where: { id },
      data
   })

   return updateAgency
}

export const deleteAgency = async (id: number) => {
   const agencyExists = await prisma.agency.findFirst({ where: { id } })

   if (!agencyExists) throw new Error("Agência não encontrada.")
   const deleteAgency = await prisma.agency.delete({
      where: { id },
   })

   return deleteAgency
}