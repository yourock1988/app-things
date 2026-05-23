import type { NextFunction, Request, Response } from 'express'
import type { RequestHandler } from 'express-serve-static-core'
import type IAuthService from '../_domain/IAuthService.ts'

// spawnMiddlewareAuthorizerRest
// spawnMiddlewareAuthenticatorRest
export default function (authService: IAuthService): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
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
    req.locals ??= {}
    req.locals.account = authService.getByNickname(nickname)
    next()
  }
}
