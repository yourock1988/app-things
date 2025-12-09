import { zCarAddDto, zCarUpdateDto } from '../../core/schemas/zCarDtos.js'
import { TCarAddDto, TCarUpdateDto } from '../../core/dtos/TCarDtos.js'
import validateSchema from '../../utils/validateSchema.js'

const ADD = validateSchema<TCarAddDto>(zCarAddDto)
const UPD = validateSchema<TCarUpdateDto>(zCarUpdateDto)

const mwCarRest = { ADD, UPD }

export default mwCarRest
