export default class RangeVo {
  private readonly min: number

  private readonly max: number

  constructor(min: number, max: number) {
    this.min = min
    this.max = max
    if (min > max) throw new Error('некорректный диапазон')
    Object.freeze(this)
  }

  calc(val: number): number {
    return Math.max(this.min, Math.min(val, this.max))
  }

  isMax(val: number): boolean {
    return val === this.max
  }
}
