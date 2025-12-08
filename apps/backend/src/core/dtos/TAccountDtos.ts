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
export type TAccountUpdInfoDto = z.infer<typeof zAccountUpdInfoDto>
export type TAccountUpdRoleDto = z.infer<typeof zAccountUpdRoleDto>
export type TAccountUpdPasswordDto = z.infer<typeof zAccountUpdPasswordDto>
