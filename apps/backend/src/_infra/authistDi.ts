import type TAuthist from '../_pres/TAuthist.ts'
import type IAuthService from '../_domain/IAuthService.ts'
import mwAuthenticateIo from '../_pres/mwAuthenticateIo.ts'
import mwAuthorizeIo from '../_pres/mwAuthorizeIo.ts'
import mwAuthorizeRest from '../_pres/mwAuthorizeRest.ts'

export default function authistDi(authService: IAuthService): TAuthist {
  return {
    AUTHrest: mwAuthorizeRest(authService),
    AUTHNio: mwAuthenticateIo(authService),
    AUTHZio: mwAuthorizeIo(authService),
  }
}
