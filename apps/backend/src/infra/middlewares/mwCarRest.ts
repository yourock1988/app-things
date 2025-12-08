import { zCarAddDto, zCarUpdateDto } from '../../core/schemas/zCarDtos.js'
import { TCarAddDto, TCarUpdateDto } from '../../core/dtos/TCarDtos.js'
import validateSchema from '../../utils/validateSchema.js'
import zParamsIdDto from '../../core/schemas/zParamsIdDto.js'
import validateSchemaRestParams from '../../utils/validateSchemaRestParams.js'
import { authMW as AUTH } from '../di/authDi.js'

const ID = validateSchemaRestParams(zParamsIdDto)
const ADD = validateSchema<TCarAddDto>(zCarAddDto)
const UPD = validateSchema<TCarUpdateDto>(zCarUpdateDto)

const mwCarRest = { ID, ADD, UPD, AUTH }

export default mwCarRest
