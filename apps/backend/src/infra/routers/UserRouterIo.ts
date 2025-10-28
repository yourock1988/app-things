import mwUserIo from '../middlewares/mwUserIo.js'

export default class UserRouterIo {
  constructor(readonly userControllerIo: any) {}

  registerHandlers(socket: any) {
    socket.on('user:add', this.userControllerIo.add)
    socket.on('user:getAll', this.userControllerIo.getAll)
    socket.on('user:getById', this.userControllerIo.getById)
    socket.on('user:updateById', this.userControllerIo.updateById)
    socket.on('user:add', (user: any) =>
      socket.broadcast.emit('user:added-lol', user)
    )
  }

  // eslint-disable-next-line class-methods-use-this
  getMiddleware() {
    return mwUserIo
  }
}
