import { TAccountRecord } from '../../infra/repositories/TAccountRecord.js'

const accountsTable: TAccountRecord[] = [
  {
    id: 420,
    nickname: 'admin',
    password: 'Qq1!ssss',
    email: 'admin@web-app.click',
    phone: '+380991234567',
    country: 'France',
    isAgree: true,
    role: 'admin',
    isLoggedIn: false,
    favoriteNumbers: [42, 101],
    authorizationsCount: 0,
    authenticationsCount: 0,
    createdAt: 1764588532761,
    updatedAt: 1764588532761,
  },
]

export default accountsTable
