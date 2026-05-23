/* eslint-disable no-param-reassign */

import type IAuthService from '../_domain/IAuthService.ts'
import type { TMwareIo, TMwareIoCtx } from './TMwareIo.ts'

// spawnMiddlewareAuthenticatorIo
export default function (authService: IAuthService): TMwareIo {
  return (ctx: TMwareIoCtx, args: any[], next: any): void => {
    const { sessionid } = ctx.socket.headersAuth
    const session = authService.authN(sessionid)
    if (!session) {
      const message = 'unauthorized'
      next({ _errors: [message], message, data: 401 })
      return
    }
    ctx.socket.nickname = session.nickname
    next()
  }
}
