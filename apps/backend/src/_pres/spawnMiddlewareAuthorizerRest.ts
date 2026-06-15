import type { RequestHandler } from 'express-serve-static-core'
import type IAuthService from '../_domain/IAuthService.ts'

// spawnMiddlewareAuthorizerRest
// spawnMiddlewareAuthenticatorRest
export default function (authService: IAuthService): RequestHandler {
  return (req, res, next) => {
    const {
      cookies: { sessionid },
      route: { path },
      baseUrl,
      method,
    } = req
    const resource = baseUrl + path
    const session = authService.authN(sessionid)
    if (!session) {
      res.status(401).send()
      return
    }
    const { nickname } = session
    const isAccessGranted = authService.authZ(nickname, resource, method)
    if (!isAccessGranted) {
      res.status(403).send()
      return
    }
    // eslint-disable-next-line no-param-reassign
    res.locals ??= {}
    // eslint-disable-next-line no-param-reassign
    res.locals['account'] = authService.getByNickname(nickname) // ?
    next()
  }
}
