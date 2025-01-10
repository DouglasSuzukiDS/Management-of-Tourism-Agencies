import { RequestHandler } from "express"
import jwt from 'jsonwebtoken'

export const ping: RequestHandler = (req, res) => {
   res.status(200).json({ message: "Pong" })
}

export const privatePing: RequestHandler = (req, res) => {
   res.status(200).json({ message: "Private Pong" })
}

export const token: RequestHandler = (req, res) => {
   let token = req.headers.authorization
   let role = ''

   if (token) {
      token = token.split(' ')[1]

      jwt.verify(
         token,
         process.env.JWT_SECRET as string,
         async (error, decoded: any) => {
            if (error) return res.status(401).json({ error: 'Acesso negado' })

            role = decoded.role
         }
      )
   }

   res.status(200).json({ token, role })
}