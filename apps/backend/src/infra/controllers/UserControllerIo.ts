import { Server, Namespace } from 'socket.io'
import UserService from '../../core/services/UserService.js'
import SocketError from '../../SocketError.js'
import User from '../../core/models/User.js'

export default class UserControllerIo {
  constructor(
    readonly userService: UserService,
    private userNamespace: Namespace | null = null,
    private io: Server | null = null,
  ) {
    userService.on('bc-sv:user:added', (user: User) =>
      io?.emit('user:added', user),
    )
  }

  init(userNamespace: Namespace, io: Server) {
    this.userNamespace = userNamespace
    this.io = io
  }

  getAll(ctx, args) {
    const ack = args.at(2)
    const users = this.userService.getAll()
    ack?.(null, users)
  }

  getById(ctx, args) {
    const { id } = args.at(0)
    const ack = args.at(2)
    const user = this.userService.getById(+id)
    if (user) ack?.(null, user)
    else ack?.(new SocketError(404, 'getById', `user id ${id} not exists`))
  }

  add(ctx, args) {
    const ack = args.at(2)
    const dto = args.at(1)
    const user = this.userService.add(dto).toJSON()
    ack?.(null, user)
    ctx.socket.broadcast.emit('bc-cl:user:added', user)
    // this.io.emit('bc-sv:user:added', user)
  }

  updateById(ctx, args) {
    const { id } = args.at(0)
    const dto = args.at(1)
    const ack = args.at(2)
    const user = this.userService.updateById(id, dto)
    if (user) {
      const userJson = user.toJSON()
      ack?.(null, userJson)
      ctx.socket.broadcast.emit('bc-cl:user:updated', userJson)
    } else {
      ack?.(new SocketError(404, 'updateById', `user id ${id} not exists`))
    }
  }

  removeById(ctx, args) {
    const { id } = args.at(0)
    const ack = args.at(2)
    const hasBeenExists = this.userService.removeById(id)
    if (hasBeenExists) {
      ack?.(null)
      ctx.socket.broadcast.emit('bc-cl:user:deleted', id)
    } else {
      ack?.(new SocketError(404, 'removeById', `user id ${id} not exists`))
    }
  }
}
