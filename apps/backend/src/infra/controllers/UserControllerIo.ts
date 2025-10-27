import { Server } from 'socket.io'
import UserService from '../../core/services/UserService.js'
import { TUserAddDto, TUserUpdateDto } from '../../core/dtos/TUserDtos.js'
import User from '../../core/models/User.js'

type TAckFn<T> = (result: T) => void

// нехочу видеть в контроллере входящий поток

// а что если передвинуть создание io сервера прямо в DI контейнер нахуй ??

export default class UserControllerIo {
  sv: Server | undefined

  constructor(readonly userService: UserService) {
    // sv.on('connection', this.registerHandlers.bind(this))
  }

  setServer(sv: Server) {
    this.sv = sv
    this.userService.on('user:added', (u: User) => sv.emit('user:added', u))
  }

  // registerHandlers(socket: Socket) {
  //   socket.on('user:add', this.add)
  //   socket.on('user:getAll', this.getAll)
  //   socket.on('user:getById', this.getById)
  //   socket.on('user:updateById', this.updateById)
  //   socket.on('user:add', (user: User) =>
  //     socket.broadcast.emit('user:added-lol', user)
  //   )
  // }

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
    // TODO:
    // socket.broadcast.emit('user:added-lol', user)
  }

  updateById(id: number, dto: TUserUpdateDto, ack: TAckFn<User | null>) {
    const user = this.userService.updateById(id, dto)
    ack?.(user)
  }
}
