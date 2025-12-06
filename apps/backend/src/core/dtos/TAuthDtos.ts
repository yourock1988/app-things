import z from 'zod'
import {
  zAuthSessionIdDto,
  zAuthSignUpDto,
  zAuthSignInDto,
  zAuthChangePasswordDto,
  zAuthUpdateProfileDto,
} from '../schemas/zAuthDtos.js'

export type TAuthSignUpDto = z.infer<typeof zAuthSignUpDto>
export type TAuthSignInDto = z.infer<typeof zAuthSignInDto>
export type TAuthChangePasswordDto = z.infer<typeof zAuthChangePasswordDto>
export type TAuthUpdateProfileDto = z.infer<typeof zAuthUpdateProfileDto>
export type TAuthSessionSchema = z.infer<typeof zAuthSessionIdDto>
