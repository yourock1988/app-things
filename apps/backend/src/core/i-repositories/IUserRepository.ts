import { TUserAddDto, TUserUpdateDto } from '../dtos/TUserDtos.js'
import User from '../models/User.js'

export interface IUserRepository {
  getAll(): User[]
  getById(id: number): User | null
  add(dto: TUserAddDto): User
  updateById(id: number, dto: TUserUpdateDto): User | null
  removeById(id: number): boolean
}
