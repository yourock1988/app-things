import { zCarAddDto, zCarUpdateDto } from '../../core/schemas/zCarDtos.js'
import { TCarAddDto, TCarUpdateDto } from '../../core/dtos/TCarDtos.js'
import compileMiddlewaresIo from '../../utils/compileMiddlewaresIo.js'
import compileMiddlewareIo from '../../utils/compileMiddlewareIo.js'

export default compileMiddlewaresIo({
  'car:add': compileMiddlewareIo<TCarAddDto>(zCarAddDto),
  'car:updateById': compileMiddlewareIo<TCarUpdateDto>(zCarUpdateDto),
})
