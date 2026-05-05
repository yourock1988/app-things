import type IAccount from '../../_domain/IAccount.js'

export default class Account implements IAccount {
  constructor(
    readonly id: number,
    readonly nickname: string,
    readonly password: string,
    readonly email: string,
    readonly phone: string,
    readonly country: string,
    readonly isAgree: boolean,
    readonly role: string,
    readonly isLoggedIn: boolean,
    // readonly favoriteNumbers: number[],
    // readonly authorizationsCount: number,
    // readonly authenticationsCount: number,
    readonly updatedAt: number,
    readonly createdAt: number,
  ) {}

  toJSON() {
    return { ...this }
  }
}
