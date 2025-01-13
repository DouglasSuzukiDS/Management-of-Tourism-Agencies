import { RequestHandler } from "express";

import { createJWT } from "../utils/jwt";
import { compare, hash } from "bcrypt";
import { createUser, getUser } from "../services/user";
import { prisma } from "../utils/prisma";
import { Prisma } from "@prisma/client";
import { SignInSchema } from "../schemas/signIn";

import { signUpSchema } from "../schemas/singUp";
import { SigninData } from "../types/signIn";

export const signUp: RequestHandler = async (req, res) => {
   const safeData = signUpSchema.safeParse(req.body)
   // Verifica o dados recebidos
   if (!safeData.success) {
      res.status(400).json({ error: safeData.error.flatten().fieldErrors })
      return
   }

   try {
      // Tenta criar o user
      const user = await createUser(safeData.data)

      // Verifica se o user foi criado
      if (!user) res.status(400).json({ error: 'Não foi possível criar o usuário, tente mais tarde' })

      // Retorna os dados do usuário e o token de acesso
      res.status(201).json({ user })
   } catch (err) {
      console.error(err)
      res.status(404).json({ error: 'Login indisponível' })
      return
   }
}

export const signIn: RequestHandler = async (req, res) => {
   const safeData = SignInSchema.safeParse(req.body)

   // Faz a verificação dos dados do usuário
   if (!safeData.success) {
      res.status(400).json({ error: safeData.error.flatten().fieldErrors })
      return
   }

   // Verifica se o usuário existe
   const user = await getUser(safeData.data.email)

   if (!user) {
      res.status(404).json({ error: 'Email/Senha inválida' })
      return
   }

   // Faz a comparação da senha
   const verifyPassword = await compare(safeData.data.password, user.password)

   if (verifyPassword) {
      const userInfos: SigninData = {
         id: user.id,
         name: user.name,
         email: user.email,
         role: user.role
      }

      // Cria o JWT
      const token = createJWT(userInfos);

      // Retorna os dados do usuário e o token
      res.status(200).json({ token, user })
   } else {
      res.status(404).json({ error: 'Login/Senha inválida' })
   }
}

