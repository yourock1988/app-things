import type { z } from 'zod'
import type { zTeapotAddDto, zTeapotUpdateDto } from './zTeapotDtos.ts'

export type TTeapotAddDto = z.infer<typeof zTeapotAddDto>
export type TTeapotUpdateDto = z.infer<typeof zTeapotUpdateDto>
