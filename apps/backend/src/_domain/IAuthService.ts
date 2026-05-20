import type { TAccountAddDto, TAccountGetDto } from './TAccountDtos.ts'
import type IAccount from './IAccount.ts'
import type ISession from './ISession.ts'

export default interface IAuthService {
  authN(sessionId: string): ISession | null

  authZ(nickname: string, resource: string, method: string, id?: any): boolean

  signUp(dto: TAccountAddDto): IAccount | null

  signIn(dto: TAccountGetDto): ISession | null

  getByNickname(nickname: string): IAccount | null
}
