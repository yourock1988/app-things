import { TAccountAddDto, TAccountUpdFullDto } from './TAccountDtos.js'
import IAccount from './IAccount.js'

export default interface IAccountService {
  getAll(): IAccount[]

  getById(id: number): IAccount | null

  getByNickname(nickname: string): IAccount | null

  add(dto: TAccountAddDto): IAccount | null

  updateById(id: number, dto: TAccountUpdFullDto): IAccount | null

  removeById(id: number): boolean

  on(type: string, listener: (arg: any) => void): this

  emit(eventName: string | symbol, ...args: any): boolean
}
