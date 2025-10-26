import User from '../models/User.js'
import { TUserAddDto, TUserUpdateDto } from '../dtos/TUserDtos.js'

export interface IUserRepository {
  getAll(): User[]
  getById(id: number): User | null
  add(dto: TUserAddDto): User
  updateById(id: number, dto: TUserUpdateDto): User | null
  removeById(id: number): void
}
