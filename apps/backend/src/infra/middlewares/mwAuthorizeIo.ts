import AuthService from '../../core/services/AuthService.js'
import SocketError from '../../SocketError.js'
// import zSessIdField from '../../core/schemas/zSessIdField.js'

/* eslint-disable no-param-reassign */

export default function mwAuthorizeIo(authService: AuthService) {
  return function (ctx, args: any[], next: any) {
    // const {
    //   cookies: { sessionId },
    //   route: { path },
    //   baseUrl,
    //   method,
    // } = req
    // const resource = baseUrl + path
    // // const parsedSessionId = zSessIdField.safeParse(sessionId)
    // // if (!parsedSessionId.success) {
    // //   res.status(401).send()
    // //   return
    // // }
    // global.console.log('resource :>> ', resource)

    const session = authService.authN(ctx.socket.handshake.headers?.sessionid)
    if (!session) {
      global.console.log('unauthorized')
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
      global.console.log('forbidden')
      next(new SocketError(403, 'mwAuthorizeIo', 'forbidden'))
      return
    }
    next()
  }
}
