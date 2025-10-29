import { zUserAddDto, zUserUpdateDto } from '../../core/schemas/zUserDtos.js'
import { TUserAddDto, TUserUpdateDto } from '../../core/dtos/TUserDtos.js'
import validateSchema from '../../utils/validateSchema.js'

const userAdd = validateSchema<TUserAddDto>(zUserAddDto)
const userUpdate = validateSchema<TUserUpdateDto>(zUserUpdateDto)

const mwUserRest = { userAdd, userUpdate }

export default mwUserRest
