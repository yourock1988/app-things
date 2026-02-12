import Teapot from '../../../../src/core/models/Teapot'

describe('создание чайника', () => {
  let teapot: Teapot
  beforeEach(() => {
    teapot = new Teapot(42, 0)
  })
  it('правильный id', () => {
    expect(teapot.id).toBe(42)
  })
  it('правильный isBoiled', () => {
    expect(teapot.isBoiled).toBe(false)
  })
  it('правильный isBoiling', () => {
    expect(teapot.isBoiling).toBe(false)
  })
  it('правильный toJSON', () => {
    const expextedJSON = `{"id":42,"temperature":0,"ongoing":"idle"}`
    expect(JSON.stringify(teapot)).toBe(expextedJSON)
  })
})

describe('кипячение', () => {
  let teapot: Teapot
  beforeEach(() => {
    teapot = new Teapot(42, 0)
  })
  afterEach(() => {
    teapot.turnOff()
  })
  // it('синхронный метод boil', () => {
  //   teapot.boil()
  //   expect(teapot.temperature).toBe(1)
  // })
  it('включаем чайник и смотрим статус', () => {
    teapot.turnOn()
    expect(teapot.isBoiling).toBe(true)
  })
  it('включаем чайник и смотрим нагрев', () => {
    jest.useFakeTimers()
    teapot.turnOn()
    jest.advanceTimersByTime(3300)

    expect(teapot.isBoiled).toBe(false)
    expect(teapot.isBoiling).toBe(true)
    expect(teapot.temperature).toBe(33)
  })
  it('чайник закипел', () => {
    jest.useFakeTimers()
    teapot.turnOn()
    jest.advanceTimersByTime(10000)

    expect(teapot.isBoiled).toBe(true)
    expect(teapot.isBoiling).toBe(false)
    expect(teapot.temperature).toBe(100)
  })
  it('выключили чайник на половине', () => {
    jest.useFakeTimers()
    teapot.turnOn()
    jest.advanceTimersByTime(5000)

    teapot.turnOff()

    expect(teapot.isBoiled).toBe(false)
    expect(teapot.isBoiling).toBe(false)
    expect(teapot.temperature).toBe(50)
  })
  it('чайник закипятили и вылили', () => {
    jest.useFakeTimers()
    teapot.turnOn()
    jest.advanceTimersByTime(10000)

    teapot.turnDrain()

    expect(teapot.isBoiled).toBe(false)
    expect(teapot.isBoiling).toBe(false)
    expect(teapot.temperature).toBe(0)
  })
})
