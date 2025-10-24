import EventEmitter from 'node:events'
import { TUserAddDto, TUserUpdateDto } from '../dtos/TUserDtos.js'
import { IUserRepository } from '../i-repositories/IUserRepository.js'

export default class UserService extends EventEmitter {
  constructor(readonly userRepository: IUserRepository) {
    super()
  }

  getAll() {
    const users = this.userRepository.getAll()
    users.forEach(user => user.sayHello('all'))
    return users
  }

  getById(id: number) {
    const user = this.userRepository.getById(id)
    user?.sayHello('only')
    return user
  }

  add(dto: TUserAddDto) {
    const user = this.userRepository.add(dto)
    user.sayHello('new')
    this.emit('user:added', user)
    return user
  }

  updateById(dto: TUserUpdateDto) {
    const user = this.userRepository.updateById(dto)
    user?.sayHello('upd')
    return user
  }

  removeById(id: number) {
    this.userRepository.removeById(id)
  }
}
