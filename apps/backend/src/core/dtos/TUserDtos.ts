export type TUserAddDto = {
  readonly nickname: string
  readonly password: string
  readonly email: string
}

export type TUserUpdateDto = {
  readonly id: number
  readonly password: string
  readonly email: string
  readonly money: number
}
