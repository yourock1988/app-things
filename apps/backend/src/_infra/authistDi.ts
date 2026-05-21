import type { TAuthist } from '../_pres/TAuthist.ts'
import type IAuthService from '../_domain/IAuthService.ts'
import spawnMiddlewareAuthenticatorIo from '../_pres/spawnMiddlewareAuthenticatorIo.ts'
import spawnMiddlewareAuthorizerIo from '../_pres/spawnMiddlewareAuthorizerIo.ts'
import spawnMiddlewareAuthorizerRest from '../_pres/spawnMiddlewareAuthorizerRest.ts'

export default function authistDi(authService: IAuthService): TAuthist {
  return {
    AUTHNio: spawnMiddlewareAuthenticatorIo(authService),
    AUTHZio: spawnMiddlewareAuthorizerIo(authService),
    AUTHrest: spawnMiddlewareAuthorizerRest(authService),
  }
}
