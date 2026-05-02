import EventEmitter from 'node:events'
import { IUserRepository } from './IUserRepository.js'
import { TUserAddDto, TUserUpdateDto } from './TUserDtos.js'
import User from './User.js'

export default class UserService extends EventEmitter {
  constructor(readonly userRepository: IUserRepository) {
    super()
  }

  getAll(): User[] {
    const users = this.userRepository.getAll()
    return users
  }

  getById(id: number): User | null {
    const user = this.userRepository.getById(id)
    return user
  }

  add(dto: TUserAddDto): User {
    const user = this.userRepository.add(dto)
    this.emit('user:added', user)
    return user
  }

  updateById(id: number, dto: TUserUpdateDto): User | null {
    const user = this.userRepository.updateById(id, {
      ...dto,
      money: dto.money * 10,
    })
    return user
  }

  removeById(id: number): boolean {
    return this.userRepository.removeById(id)
  }
}
