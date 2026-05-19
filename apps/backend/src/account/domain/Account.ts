import type IAccount from '../../_domain/IAccount.js'

export default class Account implements IAccount {
  /* eslint-disable lines-between-class-members */
  private readonly id: number
  public readonly nickname: string
  public readonly password: string
  private readonly email: string
  private readonly phone: string
  private readonly country: string
  private readonly isAgree: boolean
  public readonly role: string
  private readonly isLoggedIn: boolean
  private readonly updatedAt: number
  private readonly createdAt: number
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

  toJSON() {
    return { ...this }
  }
}
