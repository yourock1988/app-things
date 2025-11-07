import { zCarAddDto, zCarUpdateDto } from '../../core/schemas/zCarDtos.js'
import { TCarAddDto, TCarUpdateDto } from '../../core/dtos/TCarDtos.js'
import compileMiddlewares from '../../utils/compileMiddlewares.js'
import validateSchemaIo from '../../utils/validateSchemaIo.js'

export default compileMiddlewares({
  'car:add': validateSchemaIo<TCarAddDto>(zCarAddDto),
  'car:updateById': validateSchemaIo<TCarUpdateDto>(zCarUpdateDto),
})
