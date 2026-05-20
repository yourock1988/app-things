import type { z } from 'zod'
import type { zCarAddDto, zCarUpdateDto } from './zCarDtos.ts'

export type TCarAddDto = z.infer<typeof zCarAddDto>
export type TCarUpdateDto = z.infer<typeof zCarUpdateDto>
