import EventEmitter from 'node:events'
// import { IAccountRepository } from '../i-repositories/IAccountRepository.js'
// import { ISessionRepository } from '../i-repositories/ISessionRepository.js'
import { TAccountAddDto, TAccountGetDto } from '../dtos/TAccountDtos.js'
// import accesses from '../accesses.json' with { type: 'json' }
import accesses from '../accesses.js'
import Account from '../models/Account.js'
import Session from '../models/Session.js'
import ACL from '../ACL.js'
import AccountService from './AccountService.js'
import SessionService from './SessionService.js'

// type TAccessesJSON = Record<string, Record<string, string[]>>

export default class AuthService extends EventEmitter {
  constructor(
    readonly accountService: AccountService,
    readonly sessionService: SessionService,
  ) {
    super()
  }

  authN(sessionId: string): Session | null {
    const session = this.sessionService.getBySessionId(sessionId)
    return session
  }

  authZ(nickname: string, resource: string, method: string, id?: any): boolean {
    const account = this.accountService.getByNickname(nickname)
    if (!account) return false
    // const permissions = (accesses as TAccessesJSON)[resource]
    const isOwner = id && ACL[resource]?.[id] === nickname
    const permissions = accesses[resource]
    const hasAccess = permissions?.[account.role]?.includes(method)
    const hasControl = isOwner && permissions?.owner?.includes(method)
    if (hasAccess || hasControl) {
      return true
    }
    return false
  }

  signUp(dto: TAccountAddDto): Account | null {
    const account = this.accountService.getByNickname(dto.nickname)
    if (account) return null
    const appendedAccount = this.accountService.add(dto)
    return appendedAccount
  }

  signIn(dto: TAccountGetDto): Session | null {
    const account = this.accountService.getByNickname(dto.nickname)
    if (!account) return null
    if (account.password !== dto.password) return null
    const sessionAddDto = { nickname: account.nickname }
    const appendedSession = this.sessionService.add(sessionAddDto)
    return appendedSession
  }
}
