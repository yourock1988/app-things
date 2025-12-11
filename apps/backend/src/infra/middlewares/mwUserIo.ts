import { zUserAddDto, zUserUpdateDto } from '../../core/schemas/zUserDtos.js'
import { TUserAddDto, TUserUpdateDto } from '../../core/dtos/TUserDtos.js'
import compileMiddlewaresIo from '../../utils/compileMiddlewaresIo.js'
import compileMiddlewareIo from '../../utils/compileMiddlewareIo.js'

export default compileMiddlewaresIo({
  'user:add': compileMiddlewareIo<TUserAddDto>(zUserAddDto),
  'user:updateById': compileMiddlewareIo<TUserUpdateDto>(zUserUpdateDto),
})
