export default interface IPerson {
  id: number
  nickname: string
  password: string
  email: string
  money: number

  get isOnline(): boolean

  sayHello(info: string): void

  toJSON(): object
}
