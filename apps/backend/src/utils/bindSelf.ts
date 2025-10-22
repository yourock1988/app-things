/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function (self: any) {
  Object.getOwnPropertyNames(self.constructor.prototype)
    .slice(1)
    .forEach(p => (self[p] = self[p].bind(self)))
}
