import cors from 'cors'
import cookieParser from 'cookie-parser'
import { json, NextFunction, Request, Response, Router } from 'express'
import accountRouterRest from './infra/di/accountDi.js'
import sessionRouterRest from './infra/di/sessionDi.js'
import { teapotRouterRest } from './infra/di/teapotDi.js'
import { userRouterRest } from './infra/di/userDi.js'
import { authRouterRest } from './infra/di/authDi.js'
import { carRouterRest } from './infra/di/carDi.js'

const APP_ORIGIN = String(process.env.APP_ORIGIN)
const WEB_DEV_SERV_PORT = 9000
const rest = Router()
const corsOptions = {
  origin: [APP_ORIGIN, `http://localhost:${WEB_DEV_SERV_PORT}`],
  credentials: true,
}

rest.use([cookieParser(), json(), cors(corsOptions)])

rest.use('/accounts', accountRouterRest)
rest.use('/sessions', sessionRouterRest)
rest.use('/teapots', teapotRouterRest)
rest.use('/users', userRouterRest)
rest.use('/auth', authRouterRest)
rest.use('/cars', carRouterRest)

rest.use('/*unknown', (req: Request, res: Response) => {
  const message = `Неизвестный маршрут ${req.params.unknown}`
  res.status(404).send(message)
})
rest.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err && 'body' in err && err.status === 400) {
    const message = `Невалидный JSON: ${err.body}`
    return res.status(400).send({ _errors: [message] })
  }
  if (err) {
    const message = `Какая-то ошибка сервера: ${err?.message}`
    return res.status(500).send(message)
  }
  return next(err)
})

export default rest
