import { z } from 'zod'
import { zCarAddDto, zCarUpdateDto } from '../schemas/zCarDtos.js'

export type TCarAddDto = z.infer<typeof zCarAddDto>
export type TCarUpdateDto = z.infer<typeof zCarUpdateDto>
