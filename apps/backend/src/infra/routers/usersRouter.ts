import { Router } from 'express'
import { userControllerRest } from '../../utils/di/userControllerDi.js'
import { userAdd, userUpdate } from '../middlewares/mwUserRest.js'

const usersRouter = Router()

usersRouter.get('/', userControllerRest.getAll)
usersRouter.get('/:id', userControllerRest.getById)
usersRouter.post('/', userAdd, userControllerRest.add)
usersRouter.patch('/:id', userUpdate, userControllerRest.updateById)
usersRouter.delete('/:id', userControllerRest.removeById)

export default usersRouter
