export default class Bus {
  constructor(readonly io: any) {}

  use(pathName: any, router: any) {
    const nsp = this.io
      .of(pathName)
      .use(router.authN)
      .use(router.authZ)
      .on('connection', router.connector)

    router.init(nsp, this.io)
  }
}
