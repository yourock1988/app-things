import type { TTeapotRecord } from './TTeapotRecord.ts'

// eslint-disable-next-line no-restricted-syntax
const teapotsTable: TTeapotRecord[] = [
  {
    id: 4201,
    temperature: 30,
    accountId: 1,
    // ongoing: 'idle',
  },
  {
    id: 4202,
    temperature: 60,
    accountId: 2,
    // ongoing: 'idle',
  },
  {
    id: 4203,
    temperature: 90,
    accountId: 3,
    // ongoing: 'idle',
  },
]

export default teapotsTable
