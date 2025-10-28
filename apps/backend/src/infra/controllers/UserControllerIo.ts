import { Server } from 'socket.io'
import UserService from '../../core/services/UserService.js'
import { TUserAddDto, TUserUpdateDto } from '../../core/dtos/TUserDtos.js'
import User from '../../core/models/User.js'

type TAckFn<T> = (result: T) => void

export default class UserControllerIo {
  constructor(readonly userService: UserService, io: Server) {
    userService.on('user:added', (u: User) => io.emit('user:added', u))
  }

  getAll(_: string, ack: TAckFn<User[]>) {
    const users = this.userService.getAll()
    ack?.(users)
  }

  getById(id: number, ack: TAckFn<User | null>) {
    const user = this.userService.getById(+id)
    ack?.(user)
  }

  add(dto: TUserAddDto, ack: TAckFn<User>) {
    const user = this.userService.add(dto)
    ack?.(user)
    // TODO: socket.broadcast.emit('user:added-lol', user)
  }

  updateById(id: number, dto: TUserUpdateDto, ack: TAckFn<User | null>) {
    const user = this.userService.updateById(id, dto)
    ack?.(user)
  }
}
