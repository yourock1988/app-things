export default class UserRouterIo {
  constructor(readonly userControllerIo: any, readonly mwUserIo: any) {}

  registerHandlers(socket: any) {
    socket.on('user:add', (...args: any[]) =>
      this.userControllerIo.add(...args, socket)
    )
    socket.on('user:getAll', this.userControllerIo.getAll)
    socket.on('user:getById', this.userControllerIo.getById)
    socket.on('user:updateById', (...args: any[]) =>
      this.userControllerIo.updateById(...args, socket)
    )
    socket.on('user:removeById', (...args: any[]) =>
      this.userControllerIo.removeById(...args, socket)
    )
  }

  getMiddleware() {
    return this.mwUserIo
  }
}
