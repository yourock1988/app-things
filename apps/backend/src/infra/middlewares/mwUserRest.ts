import { zUserAddDto, zUserUpdateDto } from '../../core/schemas/zUserDtos.js'
import { TUserAddDto, TUserUpdateDto } from '../../core/dtos/TUserDtos.js'
import validateSchema from '../../utils/validateSchema.js'

export const userAdd = validateSchema<TUserAddDto>(zUserAddDto)
export const userUpdate = validateSchema<TUserUpdateDto>(zUserUpdateDto)
