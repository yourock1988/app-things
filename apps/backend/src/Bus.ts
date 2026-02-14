export default class Bus {
  constructor(readonly io: any) {}

  use(pathName: any, router: any) {
    global.console.log('use', pathName)

    const nsp = this.io
      .of(pathName)
      .use(router.authN)
      .use(router.authZ)
      .on('connection', router.connector)

    router.init(nsp, this.io)
  }
}
