import { Router } from 'express'
import { userControllerRest } from '../../utils/di/userControllerDi.js'

const usersRouter = Router()

usersRouter.get('/', userControllerRest.getAll)
usersRouter.get('/:id', userControllerRest.getById)
usersRouter.post('/', userControllerRest.add)
usersRouter.patch('/:id', userControllerRest.updateById)

export default usersRouter
