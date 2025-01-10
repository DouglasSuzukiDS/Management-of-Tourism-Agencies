import { Router } from 'express'
import * as PingController from '../controllers/ping'

export const mainRouter = Router()

mainRouter.use('/ping', PingController.ping)