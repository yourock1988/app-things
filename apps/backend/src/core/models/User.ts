export default class User {
  constructor(
    readonly id: number,
    readonly nickname: string,
    readonly password: string,
    readonly email: string,
    readonly money: number,
    readonly isOnline: boolean
  ) {}

  sayHello(info: string) {
    global.console.log(`${info} : hello! i am ${this.nickname}`)
  }
}
