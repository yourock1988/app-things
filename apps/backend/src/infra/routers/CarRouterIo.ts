export default class CarRouterIo {
  constructor(readonly carControllerIo: any, readonly mwCarIo: any) {}

  registerHandlers(socket: any) {
    socket.on('car:add', (...args: any[]) =>
      this.carControllerIo.add(...args, socket)
    )
    socket.on('car:getAll', this.carControllerIo.getAll)
    socket.on('car:getById', this.carControllerIo.getById)
    socket.on('car:updateById', (...args: any[]) =>
      this.carControllerIo.updateById(...args, socket)
    )
    socket.on('car:removeById', (...args: any[]) =>
      this.carControllerIo.removeById(...args, socket)
    )
  }

  getMiddleware() {
    return this.mwCarIo
  }
}
