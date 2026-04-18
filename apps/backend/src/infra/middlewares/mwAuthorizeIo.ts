import AccountService from '../../core/services/AccountService.js'
import AuthService from '../../core/services/AuthService.js'
import SocketError from '../../SocketError.js'

/* eslint-disable no-param-reassign */
export default function mwAuthorizeIo(
  authService: AuthService,
  accountService: AccountService,
) {
  return function (ctx, args: any[], next: any) {
    const { nickname } = ctx.socket.account
    const resource = ctx.socket.nsp.name
    const method = ctx.eventName
    const isAccessGranted = authService.authZ(nickname, resource, method)
    if (!isAccessGranted) {
      next(new SocketError(403, 'mwAuthorizeIo', 'forbidden'))
      return
    }
    ctx.socket.account = accountService.getByNickname(nickname)
    next()
  }
}
