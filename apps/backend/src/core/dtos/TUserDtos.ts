import { z } from 'zod'
import { zUserAddDto, zUserUpdateDto } from '../schemas/zUserDtos'

export type TUserAddDto = z.infer<typeof zUserAddDto>
export type TUserUpdateDto = z.infer<typeof zUserUpdateDto>
