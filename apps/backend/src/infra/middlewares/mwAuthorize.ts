import { NextFunction, Request, Response } from 'express'
import AuthService from '../../core/services/AuthService.js'
// import zSessIdField from '../../core/schemas/zSessIdField.js'

export default function mwAuthorize(authService: AuthService) {
  return function (req: Request, res: Response, next: NextFunction) {
    const {
      cookies: { sessionId },
      route: { path },
      baseUrl,
      method,
    } = req
    const resource = baseUrl + path
    // const parsedSessionId = zSessIdField.safeParse(sessionId)
    // if (!parsedSessionId.success) {
    //   res.status(401).send()
    //   return
    // }
    global.console.log('resource :>> ', resource)
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
    next()
  }
}
