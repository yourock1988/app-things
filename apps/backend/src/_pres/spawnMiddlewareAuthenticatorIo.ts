/* eslint-disable no-param-reassign */

import type IAuthService from '../_domain/IAuthService.ts'

// spawnMiddlewareAuthenticatorIo
export default function (
  authService: IAuthService,
): ((ctx: any, args: any[], next: any) => void) & { msg?: string } {
  return (ctx, args: any[], next: any) => {
    const { sessionid } = ctx.socket.headersAuth
    const session = authService.authN(sessionid)
    if (!session) {
      const message = 'unauthorized'
      next({ _errors: [message], message, data: 401 })
      return
    }
    ctx.socket.account = { nickname: session.nickname }
    next()
  }
}
