import z from 'zod'
import {
  zAccountGetDto,
  zAccountAddDto,
  zAccountUpdInfoDto,
  zAccountUpdRoleDto,
  zAccountUpdPasswordDto,
} from '../schemas/zAccountDtos.js'

export type TAccountGetDto = z.infer<typeof zAccountGetDto>
export type TAccountAddDto = z.infer<typeof zAccountAddDto>
export type TAccountUpdateInfoDto = z.infer<typeof zAccountUpdInfoDto>
export type TAccountUpdateRoleDto = z.infer<typeof zAccountUpdRoleDto>
export type TAccountUpdatePasswordDto = z.infer<typeof zAccountUpdPasswordDto>
