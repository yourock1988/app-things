import { z } from 'zod'
import zTeapotDto from '../schemas/zTeapotDtos'

export type TTeapotDto = z.infer<typeof zTeapotDto>
