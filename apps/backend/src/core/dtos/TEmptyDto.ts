import z from 'zod'
import zEmptyDto from '../schemas/zEmptyDto.js'

export type TEmptyDto = z.infer<typeof zEmptyDto>
