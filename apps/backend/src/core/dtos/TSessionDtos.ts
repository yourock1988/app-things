import { z } from 'zod'
import { zSessionAddDto, zSessionUpdateDto } from '../schemas/zSessionDtos'

export type TSessionAddDto = z.infer<typeof zSessionAddDto>
export type TSessionUpdateDto = z.infer<typeof zSessionUpdateDto>
