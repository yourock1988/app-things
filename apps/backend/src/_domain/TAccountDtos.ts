import type z from 'zod'
import type {
  zAccountGetDto,
  zAccountAddDto,
  zAccountUpdInfoDto,
  zAccountUpdRoleDto,
  zAccountUpdPasswordDto,
  zAccountUpdFullDto,
} from './zAccountDtos.js'

export type TAccountGetDto = z.infer<typeof zAccountGetDto>
export type TAccountAddDto = z.infer<typeof zAccountAddDto>
export type TAccountUpdInfoDto = z.infer<typeof zAccountUpdInfoDto>
export type TAccountUpdRoleDto = z.infer<typeof zAccountUpdRoleDto>
export type TAccountUpdPasswordDto = z.infer<typeof zAccountUpdPasswordDto>
export type TAccountUpdFullDto = z.infer<typeof zAccountUpdFullDto>
