import type {
  TAccountAddDto,
  TAccountGetDto,
} from '../../_domain/TAccountDtos.ts'
import type IAccount from '../../_domain/IAccount.ts'
import type ISession from '../../_domain/ISession.ts'
import type IAuthService from '../../_domain/IAuthService.ts'
import type IAccountService from '../../_domain/IAccountService.ts'
import type ISessionService from '../../_domain/ISessionService.ts'
import RBAC from './RBAC.ts'
import ACL from './ACL.ts'

export default class AuthService implements IAuthService {
  private readonly accountService: IAccountService

  private readonly sessionService: ISessionService

  constructor(
    accountService: IAccountService,
    sessionService: ISessionService,
  ) {
    this.accountService = accountService
    this.sessionService = sessionService
  }

  authN(sessionId: string): ISession | null {
    const session = this.sessionService.getBySessionId(sessionId)
    return session
  }

  authZ(nickname: string, from: string, method: string, id?: number): boolean {
    const account = this.accountService.getByNickname(nickname)
    if (!account) return false
    const isOwner = id && ACL[from]?.[id] === nickname
    const permissions = RBAC[from]
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
