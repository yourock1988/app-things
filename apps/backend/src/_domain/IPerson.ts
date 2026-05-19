export default interface IPerson {
  get isOnline(): boolean

  sayHello(info: string): void

  toJSON(): object
}
