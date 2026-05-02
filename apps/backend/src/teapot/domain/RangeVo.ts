export default class RangeVo {
  constructor(
    readonly min: number,
    readonly max: number,
  ) {
    if (min > max) throw new Error('некорректный диапазон')
    Object.freeze(this)
  }

  calc(val) {
    return Math.max(this.min, Math.min(val, this.max))
  }
}
