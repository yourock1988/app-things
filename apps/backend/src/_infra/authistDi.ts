import IAuthService from '../_domain/IAuthService.js'
import mwAuthenticateIo from '../_pres/mwAuthenticateIo.js'
import mwAuthorizeIo from '../_pres/mwAuthorizeIo.js'
import mwAuthorizeRest from '../_pres/mwAuthorizeRest.js'

export default function inject(authService: IAuthService) {
  return {
    AUTHrest: mwAuthorizeRest(authService),
    AUTHNio: mwAuthenticateIo(authService),
    AUTHZio: mwAuthorizeIo(authService),
  }
}
