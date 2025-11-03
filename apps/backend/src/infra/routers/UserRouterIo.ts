export default class UserRouterIo {
  constructor(readonly userControllerIo: any, readonly mwUserIo: any) {}

  registerHandlers(socket: any) {
    socket.on('user:add', (...args: any[]) =>
      this.userControllerIo.add(...args, socket)
    )
    socket.on('user:getAll', this.userControllerIo.getAll)
    socket.on('user:getById', this.userControllerIo.getById)
    socket.on('user:updateById', this.userControllerIo.updateById)
    socket.on('user:removeById', this.userControllerIo.removeById)
  }

  getMiddleware() {
    return this.mwUserIo
  }
}
