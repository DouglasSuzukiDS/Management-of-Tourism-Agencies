import { Prisma } from "@prisma/client"
import { prisma } from "../utils/prisma"
import { hash } from "bcrypt"

export const getUsers = async () => {
   const users = await prisma.user.findMany()

   return users
}

export const getUserById = async (id: number) => {
   const user = await prisma.user.findUnique({ where: { id } })

   if (user) return user

   return null
}

// Usado no Signup
export const getUser = async (email: string) => {
   const user = await prisma.user.findFirst({
      where: { email }
   })

   if (user) return user

   return null
}

export const createUser = async (data: Prisma.UserCreateInput) => {
   // Verifica se o email já existe
   const userExists = await prisma.user.findFirst({ where: { email: data.email } })

   if (userExists) throw new Error("email indisponível.")

   // Cria o hash da senha
   const hashedPassword = await hash(data.password, 10)

   // Cria o usuário
   const newUser = await prisma.user.create({
      data: {
         ...data,
         password: hashedPassword,
      }
   })

   return newUser
}

export const updateUser = async (id: number, data: Prisma.UserUpdateInput) => {
   // Verifica se existe um usuario com o id
   const userExists = await prisma.user.findFirst({ where: { id } })

   if (!userExists) throw new Error("Usuário não encontrado.")

   const hashedPassword = await hash(data.password as string, 10)

   const updatedUser = await prisma.user.update({
      where: { id },
      data: {
         ...data,
         password: hashedPassword
      }
   })

   return updatedUser
}

export const deleteUser = async (id: number) => {
   const userExists = await prisma.user.findFirst({ where: { id } })

   if (!userExists) throw new Error("Usuário não encontrado")

   await prisma.user.delete({ where: { id } })

   return "Usuário excluído com sucesso"
}
