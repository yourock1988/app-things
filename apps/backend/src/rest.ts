import cors from 'cors'
import { json, Router } from 'express'
import { userRouterRest } from './infra/di/userDi.js'
import { carRouterRest } from './infra/di/carDi.js'

const rest = Router()
const corsOptions = { origin: true, credentials: true }
rest.use([json(), cors(corsOptions)])

rest.use('/users', userRouterRest)
rest.use('/cars', carRouterRest)

export default rest
