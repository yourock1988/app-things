import type Account from './Account.js'
import type {
  TAccountAddDto,
  TAccountUpdFullDto,
} from '../../_domain/TAccountDtos.js'

export interface IAccountRepository {
  getAll(): Account[]
  getById(id: number): Account | null
  add(dto: TAccountAddDto): Account
  updateInfoById(id: number, dto: TAccountUpdFullDto): Account | null
  removeById(id: number): boolean
  getByNickname(nickname: string): Account | null
}
