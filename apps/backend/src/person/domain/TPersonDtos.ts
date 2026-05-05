import type { z } from 'zod'
import type { zPersonAddDto, zPersonUpdateDto } from './zPersonDtos.js'

export type TPersonAddDto = z.infer<typeof zPersonAddDto>
export type TPersonUpdateDto = z.infer<typeof zPersonUpdateDto>
