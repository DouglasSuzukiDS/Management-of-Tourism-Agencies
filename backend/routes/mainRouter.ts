import { Router } from 'express'
import * as pingController from '../controllers/ping'
import * as userController from '../controllers/user'
import * as authController from '../controllers/auth'
import * as agencyController from '../controllers/agency'
import { verifyJWT } from '../utils/jwt'

export const mainRouter = Router()

// Test Routes
mainRouter.get('/ping', pingController.ping)
mainRouter.get('/private-ping', verifyJWT, pingController.privatePing)
mainRouter.get('/token', verifyJWT, pingController.token)

// User Routes
mainRouter.get('/users', verifyJWT, userController.getUsers)
mainRouter.get('/user/:id', verifyJWT, userController.getUserById)
mainRouter.post('/user', verifyJWT, userController.createUser)
mainRouter.put('/user/:id', verifyJWT, userController.updateUser)
mainRouter.delete('/user/:id', verifyJWT, userController.deleteUser)

// Auth Routes
mainRouter.post('/register', userController.createUser)
mainRouter.post('/login', authController.signIn)

// Admin or Analyst Agency Routes
mainRouter.get('/agency', verifyJWT, agencyController.getAgenciesList)
mainRouter.get('/agency/:id', verifyJWT, agencyController.getAgency)
mainRouter.post('/agency', verifyJWT, agencyController.createAgency)
mainRouter.put('/agency/:id', verifyJWT, agencyController.updateAgencyData)

// Admin Agency Route
mainRouter.delete('/agency/:id', verifyJWT, agencyController.deleteAgency)

