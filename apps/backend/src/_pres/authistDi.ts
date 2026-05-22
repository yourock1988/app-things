import type { TAuthist } from './TAuthist.ts'
import type IAuthService from '../_domain/IAuthService.ts'
import spawnMiddlewareAuthenticatorIo from './spawnMiddlewareAuthenticatorIo.ts'
import spawnMiddlewareAuthorizerIo from './spawnMiddlewareAuthorizerIo.ts'
import spawnMiddlewareAuthorizerRest from './spawnMiddlewareAuthorizerRest.ts'

export default function authistDi(authService: IAuthService): TAuthist {
  const authist = {
    AUTHNio: spawnMiddlewareAuthenticatorIo(authService),
    AUTHZio: spawnMiddlewareAuthorizerIo(authService),
    AUTHrest: spawnMiddlewareAuthorizerRest(authService),
  }
  authist.AUTHNio.msg = 'authentication'
  authist.AUTHZio.msg = 'authorization'
  return authist
}
