import AuthService from '../../core/services/AuthService.js'
// import zSessIdField from '../../core/schemas/zSessIdField.js'

/* eslint-disable no-param-reassign */

export default function mwAuthorizeIo(authService: AuthService) {
  return function (socket, next) {
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

    const session = authService.authN(socket.auth.sessionId)
    if (!session) {
      next(new Error('unauthorized'))
      return
    }
    // socket.account = { nickname: session.nickname }
    // next()

    const { nickname } = session
    const resource = socket.nsp.name
    const isAccessGranted = authService.authZ(nickname, resource, 'connected')
    if (!isAccessGranted) {
      next(new Error('forbidden'))
      return
    }
    next()
  }
}
