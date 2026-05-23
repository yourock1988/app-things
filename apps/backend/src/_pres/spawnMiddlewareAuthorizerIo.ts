/* eslint-disable no-param-reassign */

import type IAuthService from '../_domain/IAuthService.ts'
import type { TMwareIo, TMwareIoCtx } from './TMwareIo.ts'

// spawnMiddlewareAuthorizerIo
export default function (authService: IAuthService): TMwareIo {
  return (ctx: TMwareIoCtx, args: any[], next: any): void => {
    const { id } = args?.at(0) ?? {}
    const { nickname } = ctx.socket
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
