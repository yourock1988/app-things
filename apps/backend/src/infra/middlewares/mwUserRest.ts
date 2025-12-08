import { zUserAddDto, zUserUpdateDto } from '../../core/schemas/zUserDtos.js'
import { TUserAddDto, TUserUpdateDto } from '../../core/dtos/TUserDtos.js'
import validateSchema from '../../utils/validateSchema.js'
import zParamsIdDto from '../../core/schemas/zParamsIdDto.js'
import validateSchemaRestParams from '../../utils/validateSchemaRestParams.js'
import { authMW as AUTH } from '../di/authDi.js'

const ID = validateSchemaRestParams(zParamsIdDto)
const ADD = validateSchema<TUserAddDto>(zUserAddDto)
const UPD = validateSchema<TUserUpdateDto>(zUserUpdateDto)

const mwUserRest = { ID, ADD, UPD, AUTH }

export default mwUserRest
