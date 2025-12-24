import delayed from '../../../src/utils/delayed'

test('delay cb', () => {
  const fn = jest.fn()
  jest.useFakeTimers()

  delayed(fn)

  expect(fn).not.toHaveBeenCalled()
  jest.advanceTimersByTime(1000)
  expect(fn).toHaveBeenCalledTimes(1)
})
