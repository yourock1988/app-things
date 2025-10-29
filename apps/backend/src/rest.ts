import cors from 'cors'
import { json, Router } from 'express'
import { userRouterRest } from './infra/di/userDi.js'
// import { carsRouterRest } from './infra/di/CarsDi'

const rest = Router()
const corsOptions = { origin: true, credentials: true }
rest.use([json(), cors(corsOptions)])

rest.use('/users', userRouterRest)
// rest.use('/cars', carsRouterRest)

export default rest
