import EventEmitter from 'node:events'
import { IAccountRepository } from '../i-repositories/IAccountRepository.js'
import { TAuthSignUpDto } from '../dtos/TAuthDtos.js'
import Account from '../models/Account.js'

export default class AuthService extends EventEmitter {
  constructor(readonly accountRepository: IAccountRepository) {
    super()
  }

  signUp(dto: TAuthSignUpDto): Account | null {
    const existedAuth = this.accountRepository.getByNickname(dto.nickname)
    if (existedAuth) return null
    const appendedAccount = this.accountRepository.add(dto)
    return appendedAccount
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
