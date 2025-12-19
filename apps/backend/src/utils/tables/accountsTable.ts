import { TAccountRecord } from '../../infra/types/TAccountRecord.js'

const accountsTable: TAccountRecord[] = [
  {
    id: 1,
    nickname: 'admin',
    password: 'Qq1!ssss',
    email: 'admin@web-app.click',
    phone: '+380991234567',
    country: 'France',
    isAgree: true,
    role: 'admin',
    isLoggedIn: false,
    // favoriteNumbers: [42, 101],
    // authorizationsCount: 0,
    // authenticationsCount: 0,
    updatedAt: 1764588531111,
    createdAt: 1764588531111,
  },
  {
    id: 2,
    nickname: 'user',
    password: 'Qq1!ssss',
    email: 'user@web-app.click',
    phone: '+380997654321',
    country: 'Spain',
    isAgree: true,
    role: 'user',
    isLoggedIn: false,
    // favoriteNumbers: [33, 303],
    // authorizationsCount: 0,
    // authenticationsCount: 0,
    updatedAt: 1764588532222,
    createdAt: 1764588532222,
  },
]

export default accountsTable
