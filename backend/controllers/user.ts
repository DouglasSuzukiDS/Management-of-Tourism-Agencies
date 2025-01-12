import { RequestHandler } from "express";
import * as userService from '../services/user'
import { userSchema } from "../schemas/user";
import { signUpSchema } from "../schemas/singUp";
import jwt from 'jsonwebtoken'

export const getUsers: RequestHandler = async (req, res) => {
   const userList = await userService.getUsers()

   res.json({ users: userList })
}

export const getUser: RequestHandler = async (req, res) => {
   const { login } = req.body

   const user = await userService.getUser(login)

   res.status(200).json({ user })
}

export const getUserById: RequestHandler = async (req, res) => {
   const { id } = req.params

   try {
      const user = await userService.getUserById(parseInt(id))

      if (!user) {
         res.status(404).json({ error: 'Usuário não encontrado.' })
      }

      res.status(200).json({ message: 'Usuário localizado.', user })
   } catch (err) {
      console.error(err)
      res.status(404).json({ error: 'Usuário não encontrado' })
   }
}

export const createUser: RequestHandler = async (req, res) => {
   const safeData = signUpSchema.safeParse(req.body)
   // Verifica o dados recebidos
   if (!safeData.success) {
      res.status(400).json({ error: safeData.error.flatten().fieldErrors })
      return
   }

   try {
      // Tenta criar o user
      const user = await userService.createUser(safeData.data)

      // Verifica se o user foi criado
      if (!user) res.status(400).json({ error: 'Não foi possível criar o usuário, tente mais tarde.' })

      // Retorna os dados do usuário e o token de acesso
      res.status(201).json({ message: 'Usuário criado.', user })
   } catch (err) {
      console.error(err)
      res.status(404).json({ error: 'Login indisponível no momento.' })
      return
   }
}

export const updateUser: RequestHandler = async (req, res) => {
   const { id } = req.params

   const safeData = userSchema.safeParse(req.body)
   // Verifica o dados recebidos
   if (!safeData.success) {
      res.status(400).json({ error: safeData.error.flatten().fieldErrors })
      return
   }

   try {
      // Tenta fazer a edição do user
      const user = await userService.updateUser(parseInt(id), safeData.data)

      // Verifica se o user foi editado
      if (!user) res.status(400).json({ error: 'Não foi possível fazer a edição do usuário. Por favor, tente mais tarde.' })

      // Retorna os dados do usuário e o token de acesso
      res.status(200).json({ message: 'Dados de usuários ediatados.', user })
   } catch (err) {
      console.error(err)
      res.status(404).json({ error: 'Não foi possível fazer a edição do usuário. Por favor, tente mais tarde.' })
      return
   }
}

export const deleteUser: RequestHandler = async (req, res) => {
   const { id } = req.params

   let token = req.headers.authorization
   let role = ''

   if (token) {
      token = token.split(' ')[1]

      // Verifica o token e tenta extrair a propriedade ROLE e ver se ele e ADMIN para tentar fazer a exclusão da Agência
      jwt.verify(
         token,
         process.env.JWT_SECRET as string,
         async (error, decoded: any) => {
            if (error) return res.status(401).json({ error: 'Acesso negado.' })

            role = decoded.role
         }
      )

      if (role === 'admin') {
         try {
            const user = await userService.deleteUser(parseInt(id))

            res.status(200).json({ message: 'Usuário removido do sistema.', user })
         } catch (err) {
            console.error(err)
            res.status(404).json({ error: 'Usuário não encontrado.' })
         }
      } else {
         // Se ROLE não por admin error um erro.
         res.status(404).json({ error: 'Você não pode executar essa ação.' })
      }
   }
}