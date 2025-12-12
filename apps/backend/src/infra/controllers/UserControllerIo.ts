import { Server, Socket } from 'socket.io'
import { TUserAddDto, TUserUpdateDto } from '../../core/dtos/TUserDtos.js'
import UserService from '../../core/services/UserService.js'
import SocketError from '../../SocketError.js'
import User from '../../core/models/User.js'
import { TAckFn } from '../../TAckFn.js'

export default class UserControllerIo {
  constructor(
    readonly userService: UserService,
    readonly io: Server,
  ) {
    userService.on('bc-sv:user:added', (u: User) => io.emit('user:added', u))
  }

  getAll(_: string, ack: TAckFn<User[]>) {
    const users = this.userService.getAll()
    ack?.(null, users)
  }

  getById(id: number, ack: TAckFn<User | null>) {
    const user = this.userService.getById(+id)
    if (user) ack?.(null, user)
    else ack?.(new SocketError(404, 'getById', `user id ${id} not exists`))
  }

  add(dto: TUserAddDto, ack: TAckFn<User>, socket: Socket) {
    const user = this.userService.add(dto)
    ack?.(null, user)
    socket.broadcast.emit('bc-cl:user:added', user)
    // this.io.emit('bc-sv:user:added', user)
  }

  updateById(
    id: number,
    dto: TUserUpdateDto,
    ack: TAckFn<User | null>,
    socket: Socket,
  ) {
    const user = this.userService.updateById(id, dto)
    if (user) {
      ack?.(null, user)
      socket.broadcast.emit('bc-cl:user:updated', user)
    } else {
      ack?.(new SocketError(404, 'updateById', `user id ${id} not exists`))
    }
  }

  removeById(id: number, ack: TAckFn<never>, socket: Socket) {
    const hasBeenExists = this.userService.removeById(id)
    if (hasBeenExists) {
      ack?.(null)
      socket.broadcast.emit('bc-cl:user:deleted', id)
    } else {
      ack?.(new SocketError(404, 'removeById', `user id ${id} not exists`))
    }
  }
}
