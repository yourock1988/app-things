export default class TeapotRouterIo {
  constructor(
    readonly teapotControllerIo: any,
    readonly mwTeapotIo: any,
  ) {}

  registerHandlers(socket: any) {
    socket.on('cl:teapot-show', this.teapotControllerIo.show)
    socket.on('cl:teapot-turn_on', (...args) =>
      this.teapotControllerIo.handleTurnOn(...args, socket),
    )
    socket.on('cl:teapot-turn_off', (...args) =>
      this.teapotControllerIo.handleTurnOff(...args, socket),
    )
    socket.on('cl:teapot-drain', (...args) =>
      this.teapotControllerIo.handleDrain(...args, socket),
    )
  }

  getMiddleware() {
    return this.mwTeapotIo
  }
}
