import { TAccountAddDto, TAccountGetDto } from './TAccountDtos.js'
import IAccount from './IAccount.js'
import ISession from './ISession.js'

export default interface IAuthService {
  authN(sessionId: string): ISession | null

  authZ(nickname: string, resource: string, method: string, id?: any): boolean

  signUp(dto: TAccountAddDto): IAccount | null

  signIn(dto: TAccountGetDto): ISession | null

  getByNickname(nickname: string): IAccount | null

  on(type: string, listener: (arg: any) => void): this

  emit(eventName: string | symbol, ...args: any): boolean
}
