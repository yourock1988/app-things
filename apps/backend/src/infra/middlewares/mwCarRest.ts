import { zCarAddDto, zCarUpdateDto } from '../../core/schemas/zCarDtos.js'
import { TCarAddDto, TCarUpdateDto } from '../../core/dtos/TCarDtos.js'
import validateSchema from '../../utils/validateSchema.js'
import zParamsIdDto from '../../core/schemas/zParamsIdDto.js'
import validateSchemaRestParams from '../../utils/validateSchemaRestParams.js'
import { authMW } from '../di/authDi.js'

const carId = validateSchemaRestParams(zParamsIdDto)
const carAdd = validateSchema<TCarAddDto>(zCarAddDto)
const carUpdate = validateSchema<TCarUpdateDto>(zCarUpdateDto)

const mwCarRest = { authMW, carId, carAdd, carUpdate }

export default mwCarRest
