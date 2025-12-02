import z from 'zod'
import {
  zAccountAddDto,
  zAccountUpdateInfoDto,
  zAccountUpdateRoleDto,
  zAccountUpdatePasswordDto,
} from '../schemas/zAccountDtos.js'

export type TAccountAddDto = z.infer<typeof zAccountAddDto>
export type TAccountUpdateInfoDto = z.infer<typeof zAccountUpdateInfoDto>
export type TAccountUpdateRoleDto = z.infer<typeof zAccountUpdateRoleDto>
export type TAccountUpdatePasswordDto = z.infer<
  typeof zAccountUpdatePasswordDto
>
