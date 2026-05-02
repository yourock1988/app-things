import { z } from 'zod'
import { zTeapotAddDto, zTeapotUpdateDto } from './zTeapotDtos.js'

export type TTeapotAddDto = z.infer<typeof zTeapotAddDto>
export type TTeapotUpdateDto = z.infer<typeof zTeapotUpdateDto>
