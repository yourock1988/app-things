export default interface IAccount {
  nickname: string
  password: string
  role: string
  toJSON(): object
}
