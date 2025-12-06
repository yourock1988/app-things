import { NextFunction, Request, Response } from 'express'
import AuthService from '../../core/services/AuthService.js'

export default function mwAuthorize(authService: AuthService) {
  return function (req: Request, res: Response, next: NextFunction) {
    const {
      cookies: { sessionId },
      method,
      originalUrl,
      baseUrl,
      path,
    } = req

    global.console.log(originalUrl)
    global.console.log(baseUrl)
    global.console.log(path)
    global.console.log(originalUrl === baseUrl + path)

    const session = authService.authN(sessionId)
    if (!session) {
      res.status(401).send()
      return
    }

    const { nickname } = session
    const isAccessGranted = authService.authZ(nickname, originalUrl, method)

    if (!isAccessGranted) {
      res.status(403).send()
      return
    }

    next()
  }
}
