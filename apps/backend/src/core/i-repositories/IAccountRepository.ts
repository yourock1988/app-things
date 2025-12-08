import { TAccountAddDto, TAccountUpdInfoDto } from '../dtos/TAccountDtos.js'
import Account from '../models/Account.js'

export interface IAccountRepository {
  getAll(): Account[]
  getById(id: number): Account | null
  add(dto: TAccountAddDto): Account
  updateInfoById(id: number, dto: TAccountUpdInfoDto): Account | null
  removeById(id: number): boolean
  getByNickname(nickname: string): Account | null
}
