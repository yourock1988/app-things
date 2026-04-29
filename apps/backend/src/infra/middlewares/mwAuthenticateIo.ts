import AuthService from '../../core/services/AuthService.js'

/* eslint-disable no-param-reassign */
export default function mwAuthenticateIo(authService: AuthService) {
  return function (ctx, args: any[], next: any) {
    const sessionId =
      ctx.socket.handshake.auth?.sessionid ??
      ctx.socket.handshake.headers?.sessionid
    const session = authService.authN(sessionId)
    if (!session) {
      const message = 'unauthorized'
      next({ _errors: [message], message, data: 401 })
      return
    }
    ctx.socket.account = { nickname: session.nickname }
    next()
  }
}
