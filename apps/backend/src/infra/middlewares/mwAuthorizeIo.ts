import AuthService from '../../core/services/AuthService.js'
import SocketError from '../../SocketError.js'

/* eslint-disable no-param-reassign */
export default function mwAuthorizeIo(authService: AuthService) {
  return function (ctx, args: any[], next: any) {
    const session = authService.authN(ctx.socket.handshake.headers?.sessionid)
    if (!session) {
      next(new SocketError(401, 'mwAuthorizeIo', 'unauthorized'))
      return
    }
    ctx.socket.account = { nickname: session.nickname }
    // next()

    const { nickname } = ctx.socket.account
    const resource = ctx.socket.nsp.name
    const method = ctx.eventName
    const isAccessGranted = authService.authZ(nickname, resource, method)
    if (!isAccessGranted) {
      next(new SocketError(403, 'mwAuthorizeIo', 'forbidden'))
      return
    }
    next()
  }
}
