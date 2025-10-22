export default class Price {
  constructor(public amount: number, public currency: string) {
    if (amount < 0) throw new Error('Цена не может быть отрицательной')
    if (currency === '') throw new Error('Валюта не может быть пустой строкой')
    Object.freeze(this)
  }

  equals(other: Price): boolean {
    return this.amount === other.amount && this.currency === other.currency
  }
}
