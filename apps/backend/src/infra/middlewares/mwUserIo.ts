import { zUserAddDto, zUserUpdateDto } from '../../core/schemas/zUserDtos.js'
import { TUserAddDto, TUserUpdateDto } from '../../core/dtos/TUserDtos.js'
import compileMiddlewares from '../../utils/compileMiddlewares.js'
import validateSchemaIo from '../../utils/validateSchemaIo.js'

export default compileMiddlewares({
  'user:add': validateSchemaIo<TUserAddDto>(zUserAddDto),
  'user:update': validateSchemaIo<TUserUpdateDto>(zUserUpdateDto),
})
