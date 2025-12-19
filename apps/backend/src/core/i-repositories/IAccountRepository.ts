import { TAccountAddDto, TAccountUpdFullDto } from '../dtos/TAccountDtos.js'
import Account from '../models/Account.js'

export interface IAccountRepository {
  getAll(): Account[]
  getById(id: number): Account | null
  add(dto: TAccountAddDto): Account
  updateInfoById(id: number, dto: TAccountUpdFullDto): Account | null
  removeById(id: number): boolean
  getByNickname(nickname: string): Account | null
}
