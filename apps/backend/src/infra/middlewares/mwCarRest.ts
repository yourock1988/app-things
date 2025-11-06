import { zCarAddDto, zCarUpdateDto } from '../../core/schemas/zCarDtos.js'
import { TCarAddDto, TCarUpdateDto } from '../../core/dtos/TCarDtos.js'
import validateSchema from '../../utils/validateSchema.js'

const carAdd = validateSchema<TCarAddDto>(zCarAddDto)
const carUpdate = validateSchema<TCarUpdateDto>(zCarUpdateDto)

const mwCarRest = { carAdd, carUpdate }

export default mwCarRest
