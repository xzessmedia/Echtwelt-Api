import {DefaultCrudRepository} from '@loopback/repository';
import {BankAccount, BankAccountRelations} from '../models';
import {MysqlDataDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class BankAccountRepository extends DefaultCrudRepository<
  BankAccount,
  typeof BankAccount.prototype.Id,
  BankAccountRelations
> {
  constructor(
    @inject('datasources.MysqlData') dataSource: MysqlDataDataSource,
  ) {
    super(BankAccount, dataSource);
  }
}
