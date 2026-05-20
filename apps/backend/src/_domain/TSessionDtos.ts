import type { z } from 'zod'
import type { zSessionAddDto, zSessionUpdateDto } from './zSessionDtos.ts'

export type TSessionAddDto = z.infer<typeof zSessionAddDto>
export type TSessionUpdateDto = z.infer<typeof zSessionUpdateDto>
