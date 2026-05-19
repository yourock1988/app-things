import type { TAccountAddDto, TAccountGetDto } from './TAccountDtos.js'
import type IAccount from './IAccount.js'
import type ISession from './ISession.js'

export default interface IAuthService {
  authN(sessionId: string): ISession | null

  authZ(nickname: string, resource: string, method: string, id?: any): boolean

  signUp(dto: TAccountAddDto): IAccount | null

  signIn(dto: TAccountGetDto): ISession | null

  getByNickname(nickname: string): IAccount | null
}
