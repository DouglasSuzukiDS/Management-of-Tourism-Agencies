import { RequestHandler } from "express"

export const ping: RequestHandler = (req, res) => {
   res.status(200).json({ message: "Pong" })
}

export const privatePing: RequestHandler = (req, res) => {
   res.status(200).json({ message: "Private Pong" })
}

export const token: RequestHandler = (req, res) => {
   let token = req.headers.authorization

   if (token) token = token.split(' ')[1]

   res.status(200).json({ token })
}