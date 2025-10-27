import { Router } from 'express'
import { userControllerRest } from '../../utils/di/userControllerDi.js'
import validateSchema from '../../utils/validateSchema.js'
import { zUserAddDto, zUserUpdateDto } from '../../core/schemas/zUserDtos.js'
import { TUserAddDto, TUserUpdateDto } from '../../core/dtos/TUserDtos.js'

const usersRouter = Router()

const validate = {
  userAdd: validateSchema<TUserAddDto>(zUserAddDto),
  userUpdate: validateSchema<TUserUpdateDto>(zUserUpdateDto),
}

usersRouter.get('/', userControllerRest.getAll)
usersRouter.get('/:id', userControllerRest.getById)
usersRouter.post('/', validate.userAdd, userControllerRest.add)
usersRouter.patch('/:id', validate.userUpdate, userControllerRest.updateById)
usersRouter.delete('/:id', userControllerRest.removeById)

export default usersRouter
