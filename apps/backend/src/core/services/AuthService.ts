import EventEmitter from 'node:events'
import { IAccountRepository } from '../i-repositories/IAccountRepository.js'
import Account from '../models/Account.js'
import { ISessionRepository } from '../i-repositories/ISessionRepository.js'
import Session from '../models/Session.js'
import accesses from '../accesses.json' with { type: 'json' }
import { TAccountAddDto, TAccountGetDto } from '../dtos/TAccountDtos.js'

type TAccessesJSON = Record<string, Record<string, string[]>>

export default class AuthService extends EventEmitter {
  constructor(
    readonly accountRepository: IAccountRepository,
    readonly sessionRepository: ISessionRepository,
  ) {
    super()
  }

  authN(sessionId: string): Session | null {
    const session = this.sessionRepository.getBySessionId(sessionId)
    return session
  }

  authZ(nickname: string, resource: string, method: string): boolean {
    const account = this.accountRepository.getByNickname(nickname)
    if (!account) return false
    const permissions = (accesses as TAccessesJSON)[resource]
    const hasAccess = permissions?.[account.role]?.includes(method)
    if (hasAccess) {
      return true
    }
    return false
  }

  signUp(dto: TAccountAddDto): Account | null {
    const account = this.accountRepository.getByNickname(dto.nickname)
    if (account) return null
    const appendedAccount = this.accountRepository.add(dto)
    return appendedAccount
  }

  signIn(dto: TAccountGetDto): Session | null {
    const account = this.accountRepository.getByNickname(dto.nickname)
    if (!account) return null
    if (account.password !== dto.password) return null
    const sessionAddDto = { nickname: account.nickname }
    const appendedSession = this.sessionRepository.add(sessionAddDto)
    return appendedSession
  }
}
