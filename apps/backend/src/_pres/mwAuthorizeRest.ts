import { NextFunction, Request, Response } from 'express'
import IAuthService from '../_domain/IAuthService.js'

export default function mwAuthorizeRest(authService: IAuthService) {
  return function (req: Request, res: Response, next: NextFunction) {
    const {
      cookies: { sessionId },
      route: { path },
      baseUrl,
      method,
    } = req
    const resource = baseUrl + path
    const session = authService.authN(sessionId)
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
