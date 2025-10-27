import { zUserAddDto, zUserUpdateDto } from '../../core/schemas/zUserDtos.js'
import { TUserAddDto, TUserUpdateDto } from '../../core/dtos/TUserDtos.js'
import validateSchemaIo from '../../utils/validateSchemaIo.js'
import compileMiddlewares from '../../utils/compileMiddlewares.js'
import { io } from '../../appIo.js'

const validate = {
  'user:add': validateSchemaIo<TUserAddDto>(zUserAddDto),
  'user:update': validateSchemaIo<TUserUpdateDto>(zUserUpdateDto),
}

const usersRouterSv = io.use((socket, next) => {
  global.console.log(socket.id)
  setTimeout(next, 300)
  // next(new Error('very bad client connected'))

  socket.use(compileMiddlewares(validate))
})

export default usersRouterSv
