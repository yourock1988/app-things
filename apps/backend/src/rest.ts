import cors from 'cors'
import cookieParser from 'cookie-parser'
import { json, NextFunction, Request, Response, Router } from 'express'
import { userRouterRest } from './infra/di/userDi.js'
import { carRouterRest } from './infra/di/carDi.js'
import accountRouterRest from './infra/di/accountDi.js'
import sessionRouterRest from './infra/di/sessionDi.js'
import { authRouterRest } from './infra/di/authDi.js'

const rest = Router()
const corsOptions = { origin: true, credentials: true }

rest.use([cookieParser(), json(), cors(corsOptions)])

rest.use('/users', userRouterRest)
rest.use('/cars', carRouterRest)
rest.use('/accounts', accountRouterRest)
rest.use('/sessions', sessionRouterRest)
rest.use('/auth', authRouterRest)

rest.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err && 'body' in err && err.status === 400) {
    const message = `Невалидный JSON: ${err.body}`
    global.console.error(message)
    return res.status(400).send({ message })
  }
  if (err) {
    const message = `Какая-то ошибка сервера: ${err?.message}`
    global.console.error(message)
    return res.status(500).send({ message })
  }
  return next(err)
})

export default rest
