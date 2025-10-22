import { Router } from 'express'
import welcomeRouter from './welcomeRouter.js'
import staticRouter from './staticRouter.js'
import usersRouter from './infra/routers/usersRouter.js'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/', welcomeRouter)
routes.use('/', staticRouter)

export default routes
