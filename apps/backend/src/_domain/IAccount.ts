export default interface IAccount {
  id: number
  nickname: string
  password: string
  role: string
  toJSON(): object
}
