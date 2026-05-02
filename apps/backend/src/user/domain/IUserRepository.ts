import { TUserAddDto, TUserUpdateDto } from './TUserDtos.js'
import User from './User.js'

export interface IUserRepository {
  getAll(): User[]
  getById(id: number): User | null
  add(dto: TUserAddDto): User
  updateById(id: number, dto: TUserUpdateDto): User | null
  removeById(id: number): boolean
}
