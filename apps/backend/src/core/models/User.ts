export default class User {
  constructor(
    readonly id: number,
    readonly nickname: string,
    readonly password: string,
    readonly email: string,
    readonly money: number
  ) {}

  sayHello(info: string) {
    global.console.log(`${info} : hello! i am ${this.nickname}`)
  }

  // eslint-disable-next-line class-methods-use-this
  get isOnline() {
    return Math.random() > 0.5
  }

  toJSON() {
    return { ...this, isOnline: this.isOnline }
  }
}
