export default class Account {
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
    readonly favoriteNumbers: number[],
    readonly authorizationsCount: number,
    readonly authenticationsCount: number,
    readonly createdAt: number,
    readonly updatedAt: number,
  ) {}

  toJSON() {
    return { ...this }
  }
}
