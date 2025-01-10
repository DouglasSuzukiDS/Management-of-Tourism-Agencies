import express, { urlencoded } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { mainRouter } from './routes/mainRouter'

const server = express()

server.use(helmet()) // Middleware de segurança que ajuda a proteger a aplicação
server.use(cors()) // Permite acesso da API de outra origens
server.use(urlencoded({ extended: true })) // Middleware do Express que faz o parsing de dados enviados em formulários no formato application/x-www-form-urlencoded. Com { extended: true }, ele usa a biblioteca qs, permitindo que você processe objetos aninhados e arrays.
server.use(express.json()) // Transforme em JSON as informações provindas do req.body

server.use(mainRouter) // Utiliza todas as rotas inseridas no arquivo

server.listen(process.env.PORT, () => {
   console.log(`Server is running on http://localhost:${process.env.PORT}`)
})