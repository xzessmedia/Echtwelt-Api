import {DefaultCrudRepository} from '@loopback/repository';
import {Bills, BillsRelations} from '../models';
import {MysqlDataDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class BillsRepository extends DefaultCrudRepository<
  Bills,
  typeof Bills.prototype.Id,
  BillsRelations
> {
  constructor(
    @inject('datasources.MysqlData') dataSource: MysqlDataDataSource,
  ) {
    super(Bills, dataSource);
  }
}
