import { z } from 'zod'

import { zUserAddDto, zUserUpdateDto } from '../schemas/zUserDtos'

export type TUserAddDto = z.infer<typeof zUserAddDto>

export type TUserUpdateDto = z.infer<typeof zUserUpdateDto>

// export type TUserAddDto = {
//   readonly nickname: string
//   readonly password: string
//   readonly email: string
// }

// export type TUserUpdateDto = {
//   readonly id: number
//   readonly password: string
//   readonly email: string
//   readonly money: number
// }
