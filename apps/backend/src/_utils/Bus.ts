function preware(socket: any, next) {
  const { headers, auth } = socket.handshake
  // eslint-disable-next-line no-param-reassign
  socket.headersAuth = { ...headers, ...auth }
  next()
}

export default class Bus {
  constructor(readonly io: any) {}

  use(pathName: any, router: any) {
    const nsp = this.io
      .of(pathName)
      .use(preware)
      .use(router.authN)
      .use(router.authZ)
      .on('connection', router.connector)

    router.init(nsp, this.io)
  }
}
