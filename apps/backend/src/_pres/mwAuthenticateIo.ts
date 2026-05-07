import IAuthService from '../_domain/IAuthService.js'

/* eslint-disable no-param-reassign */
export default function mwAuthenticateIo(authService: IAuthService) {
  return function (ctx, args: any[], next: any) {
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
