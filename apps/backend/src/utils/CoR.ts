/* eslint-disable no-plusplus */

export default function CoR(...fns) {
  const handler = fns.pop()
  const middlewares = fns

  return (...data) => {
    let i = 0

    const next = (err?: object) => {
      if (err) return

      if (i < middlewares.length) {
        middlewares[i++](...data, next)
      } else {
        handler(...data)
      }
    }

    next()
  }
}
