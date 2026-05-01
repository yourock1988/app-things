import IAuthService from '../_domain/IAuthService.js'

/* eslint-disable no-param-reassign */
export default function mwAuthorizeIo(authService: IAuthService) {
  return function (ctx, args: any[], next: any) {
    const { id } = args?.at(0) ?? {}
    const { nickname } = ctx.socket.account
    const resource = ctx.socket.nsp.name
    const method = ctx.eventName
    const isAccessGranted = authService.authZ(nickname, resource, method, id)
    if (!isAccessGranted) {
      const message = 'forbidden'
      next({ _errors: [message], message, data: 403 })
      return
    }
    ctx.socket.account = authService.getByNickname(nickname)
    next()
  }
}
