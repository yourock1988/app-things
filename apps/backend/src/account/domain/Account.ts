import type IAccount from '../../_domain/IAccount.ts'

export default class Account implements IAccount {
  /* eslint-disable lines-between-class-members */
  readonly id: number
  readonly nickname: string
  readonly password: string
  readonly email: string
  readonly phone: string
  readonly country: string
  readonly isAgree: boolean
  readonly role: string
  readonly isLoggedIn: boolean
  readonly updatedAt: number
  readonly createdAt: number
  /* eslint-enable lines-between-class-members */

  constructor(
    id: number,
    nickname: string,
    password: string,
    email: string,
    phone: string,
    country: string,
    isAgree: boolean,
    role: string,
    isLoggedIn: boolean,
    updatedAt: number,
    createdAt: number,
  ) {
    this.id = id
    this.nickname = nickname
    this.password = password
    this.email = email
    this.phone = phone
    this.country = country
    this.isAgree = isAgree
    this.role = role
    this.isLoggedIn = isLoggedIn
    this.updatedAt = updatedAt
    this.createdAt = createdAt
  }

  toJSON(): Account {
    return { ...this }
  }
}
