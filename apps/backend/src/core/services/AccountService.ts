import EventEmitter from 'node:events'
import { IAccountRepository } from '../i-repositories/IAccountRepository.js'
import { TAccountAddDto, TAccountUpdateInfoDto } from '../dtos/TAccountDtos.js'
import Account from '../models/Account.js'

export default class AccountService extends EventEmitter {
  constructor(readonly accountRepository: IAccountRepository) {
    super()
  }

  getAll(): Account[] {
    const accounts = this.accountRepository.getAll()
    // accounts.forEach(account => account.sayHello('all'))
    return accounts
  }

  getById(id: number): Account | null {
    const account = this.accountRepository.getById(id)
    // account?.sayHello('only')
    return account
  }

  add(dto: TAccountAddDto): Account {
    // TODO: в репозиторий должны сохранятся модели, а не dto
    // TODO: точнее модель нужно конвертировать в запись
    // TODO: тоесть из dto нужно создать модель, а потом сконвертировать её в запись
    // TODO: а вот и нет. модель сущности может быть только у уже добавленной в репозиторий сущности.
    // TODO: не должно быть моделей, у которых нет записи в репозитории
    const account = this.accountRepository.add(dto)
    // account.sayHello('new')
    this.emit('account:added', account)
    return account
    // TODO: и на выход должен уходить либо dto либо json
    // TODO: не нужно работающую модель выплёвывать в контроллер
  }

  updateById(id: number, dto: TAccountUpdateInfoDto): Account | null {
    const account = this.accountRepository.updateInfoById(id, {
      ...dto,
      favoriteNumbers: dto.favoriteNumbers.concat(42),
    })
    // account?.sayHello('upd')
    return account
  }

  removeById(id: number): boolean {
    return this.accountRepository.removeById(id)
  }
}
