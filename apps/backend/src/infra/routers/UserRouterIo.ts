export default class UserRouterIo {
  constructor(readonly userControllerIo: any, readonly mwUserIo: any) {}

  registerHandlers(socket: any) {
    socket.on('user:add', this.userControllerIo.add)
    socket.on('user:getAll', this.userControllerIo.getAll)
    socket.on('user:getById', this.userControllerIo.getById)
    socket.on('user:updateById', this.userControllerIo.updateById)
    socket.on('user:removeById', this.userControllerIo.removeById)
    socket.on('user:add', (user: any) =>
      socket.broadcast.emit('user:added-lol', user)
    )
  }

  getMiddleware() {
    return this.mwUserIo
  }
}
