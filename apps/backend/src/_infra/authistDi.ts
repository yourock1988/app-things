import type TAuthist from '../_pres/TAuthist.js'
import type IAuthService from '../_domain/IAuthService.js'
import mwAuthenticateIo from '../_pres/mwAuthenticateIo.js'
import mwAuthorizeIo from '../_pres/mwAuthorizeIo.js'
import mwAuthorizeRest from '../_pres/mwAuthorizeRest.js'

export default function authistDi(authService: IAuthService): TAuthist {
  return {
    AUTHrest: mwAuthorizeRest(authService),
    AUTHNio: mwAuthenticateIo(authService),
    AUTHZio: mwAuthorizeIo(authService),
  }
}
