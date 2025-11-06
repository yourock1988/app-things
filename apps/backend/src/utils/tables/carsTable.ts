import { TCarRecord } from '../../infra/repositories/TCarRecord.js'

const carsTable: TCarRecord[] = [
  {
    id: 1001,
    type: 'sedan',
    brand: 'Mercedes',
    model: 'S600',
    price: 6000,
    engine: 'V8',
    hasTurbo: false,
    hp: 600,
    isRunning: false,
  },
  {
    id: 1002,
    type: 'coupe',
    brand: 'Audi',
    model: 'A8',
    price: 8000,
    engine: 'V12',
    hasTurbo: true,
    hp: 800,
    isRunning: true,
  },
]

export default carsTable
