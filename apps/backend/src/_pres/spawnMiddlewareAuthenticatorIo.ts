/* eslint-disable no-param-reassign */

import type IAuthService from '../_domain/IAuthService.ts'
import type { TMwareIo } from './TMwareIo.ts'

// spawnMiddlewareAuthenticatorIo
export default function (authService: IAuthService): TMwareIo {
  return (ctx, _, next) => {
    const { sessionid } = ctx.socket.headersAuth
    const session = authService.authN(sessionid)
    if (!session) {
      const message = 'unauthorized'
      next({ message, data: 401 })
      return
    }
    ctx.socket.nickname = session.nickname
    next()
  }
}
