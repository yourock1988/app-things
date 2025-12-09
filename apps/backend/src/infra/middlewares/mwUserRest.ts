import { zUserAddDto, zUserUpdateDto } from '../../core/schemas/zUserDtos.js'
import { TUserAddDto, TUserUpdateDto } from '../../core/dtos/TUserDtos.js'
import validateSchema from '../../utils/validateSchema.js'

import { authMW as AUTH } from '../di/authDi.js'

const ADD = validateSchema<TUserAddDto>(zUserAddDto)
const UPD = validateSchema<TUserUpdateDto>(zUserUpdateDto)

const mwUserRest = { ADD, UPD, AUTH }

export default mwUserRest
