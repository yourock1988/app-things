import EventEmitter from 'node:events'
import { IAccountRepository } from '../i-repositories/IAccountRepository.js'
import { TAuthSignInDto, TAuthSignUpDto } from '../dtos/TAuthDtos.js'
import Account from '../models/Account.js'
import { ISessionRepository } from '../i-repositories/ISessionRepository.js'
import Session from '../models/Session.js'

export default class AuthService extends EventEmitter {
  constructor(
    readonly accountRepository: IAccountRepository,
    readonly sessionRepository: ISessionRepository
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
    if (
      account.role === 'admin' &&
      resource === '/api/v0/cars/' &&
      method === 'GET'
    ) {
      return true
    }
    return false
  }

  signUp(dto: TAuthSignUpDto): Account | null {
    const account = this.accountRepository.getByNickname(dto.nickname)
    if (account) return null
    const appendedAccount = this.accountRepository.add(dto)
    return appendedAccount
  }

  signIn(dto: TAuthSignInDto): Session | null {
    const account = this.accountRepository.getByNickname(dto.nickname)
    if (!account) return null
    if (account.password !== dto.password) return null
    const sessionAddDto = { nickname: account.nickname }
    const appendedSession = this.sessionRepository.add(sessionAddDto)
    return appendedSession
  }

  // getAll(): Auth[] {
  //   const auths = this.accountRepository.getAll()
  //   // auths.forEach(auth => auth.sayHello('all'))
  //   return auths
  // }

  // getById(id: number): Auth | null {
  //   const auth = this.accountRepository.getById(id)
  //   // auth?.sayHello('only')
  //   return auth
  // }

  // add(dto: TAuthAddDto): Auth | null {
  //   const existedAuth = this.accountRepository.getByNickname(dto.nickname)
  //   if (existedAuth) return null
  //   const auth = this.accountRepository.add(dto)
  //   // auth.sayHello('new')
  //   this.emit('auth:added', auth)
  //   return auth
  // }

  // updateById(id: number, dto: TAuthUpdateInfoDto): Auth | null {
  //   const auth = this.accountRepository.updateInfoById(id, {
  //     ...dto,
  //     favoriteNumbers: dto.favoriteNumbers.concat(42),
  //   })
  //   // auth?.sayHello('upd')
  //   return auth
  // }

  // removeById(id: number): boolean {
  //   return this.accountRepository.removeById(id)
  // }
}
