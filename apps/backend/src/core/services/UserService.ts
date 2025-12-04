import EventEmitter from 'node:events'
import { IUserRepository } from '../i-repositories/IUserRepository.js'
import { TUserAddDto, TUserUpdateDto } from '../dtos/TUserDtos.js'
import User from '../models/User.js'

export default class UserService extends EventEmitter {
  constructor(readonly userRepository: IUserRepository) {
    super()
  }

  getAll(): User[] {
    const users = this.userRepository.getAll()
    users.forEach(user => user.sayHello('all'))
    return users
  }

  getById(id: number): User | null {
    const user = this.userRepository.getById(id)
    user?.sayHello('only')
    return user
  }

  add(dto: TUserAddDto): User {
    const user = this.userRepository.add(dto)
    user.sayHello('new')
    this.emit('user:added', user)
    return user
  }

  updateById(id: number, dto: TUserUpdateDto): User | null {
    const user = this.userRepository.updateById(id, {
      ...dto,
      money: dto.money * 10,
      password: `${dto.password}!`,
    })
    user?.sayHello('upd')
    return user
  }

  removeById(id: number): boolean {
    return this.userRepository.removeById(id)
  }
}
