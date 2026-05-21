/* eslint-disable no-param-reassign */

import type IAuthService from '../_domain/IAuthService.ts'

// spawnMiddlewareAuthorizerIo
export default function (authService: IAuthService) {
  return (ctx, args: any[], next: any) => {
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
