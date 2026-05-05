import EventEmitter from 'node:events'
import type {
  TAccountAddDto,
  TAccountGetDto,
} from '../../_domain/TAccountDtos.js'
import type IAccount from '../../_domain/IAccount.js'
import type ISession from '../../_domain/ISession.js'
import type IAuthService from '../../_domain/IAuthService.js'
import type IAccountService from '../../_domain/IAccountService.js'
import type ISessionService from '../../_domain/ISessionService.js'
import RBAC from './RBAC.js'
import ACL from './ACL.js'

export default class AuthService extends EventEmitter implements IAuthService {
  constructor(
    readonly accountService: IAccountService,
    readonly sessionService: ISessionService,
  ) {
    super()
  }

  authN(sessionId: string): ISession | null {
    const session = this.sessionService.getBySessionId(sessionId)
    return session
  }

  authZ(nickname: string, resource: string, method: string, id?: any): boolean {
    const account = this.accountService.getByNickname(nickname)
    if (!account) return false
    const isOwner = id && ACL[resource]?.[id] === nickname
    const permissions = RBAC[resource]
    const hasAccess = permissions?.[account.role]?.includes(method)
    const hasControl = isOwner && permissions?.owner?.includes(method)
    if (hasAccess || hasControl) {
      return true
    }
    return false
  }

  signUp(dto: TAccountAddDto): IAccount | null {
    const account = this.accountService.getByNickname(dto.nickname)
    if (account) return null
    const appendedAccount = this.accountService.add(dto)
    return appendedAccount
  }

  signIn(dto: TAccountGetDto): ISession | null {
    const account = this.accountService.getByNickname(dto.nickname)
    if (!account) return null
    if (account.password !== dto.password) return null
    const sessionAddDto = { nickname: account.nickname }
    const appendedSession = this.sessionService.add(sessionAddDto)
    return appendedSession
  }

  getByNickname(nickname: string): IAccount | null {
    return this.accountService.getByNickname(nickname)
  }
}
