import type IPerson from '../../_domain/IPerson.ts'

export default class Person implements IPerson {
  /* eslint-disable lines-between-class-members */
  private readonly id: number
  private readonly nickname: string
  private readonly password: string
  private readonly email: string
  private readonly money: number
  /* eslint-enable lines-between-class-members */

  constructor(
    id: number,
    nickname: string,
    password: string,
    email: string,
    money: number,
  ) {
    this.id = id
    this.nickname = nickname
    this.password = password
    this.email = email
    this.money = money
  }

  // eslint-disable-next-line
  sayHello(info: string): void {
    // global.console.log(`${info} : hello! i am ${this.nickname}`)
  }

  // eslint-disable-next-line class-methods-use-this
  get isOnline(): boolean {
    return Math.random() > 0.5
  }

  toJSON() {
    return { ...this, isOnline: this.isOnline }
  }
}
