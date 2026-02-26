import delayed from '../../../src/utils/delayed'

test('delay cb', () => {
  const fn = vi.fn()
  vi.useFakeTimers()

  delayed(fn)

  expect(fn).not.toHaveBeenCalled()
  vi.advanceTimersByTime(1000)
  expect(fn).toHaveBeenCalledTimes(1)
})
