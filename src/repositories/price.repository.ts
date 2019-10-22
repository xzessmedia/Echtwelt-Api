import {DefaultCrudRepository} from '@loopback/repository';
import {Price, PriceRelations} from '../models';
import {MysqlDataDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PriceRepository extends DefaultCrudRepository<
  Price,
  typeof Price.prototype.Id,
  PriceRelations
> {
  constructor(
    @inject('datasources.MysqlData') dataSource: MysqlDataDataSource,
  ) {
    super(Price, dataSource);
  }
}
