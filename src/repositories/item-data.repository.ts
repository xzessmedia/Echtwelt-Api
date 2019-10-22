import {DefaultCrudRepository} from '@loopback/repository';
import {ItemData, ItemDataRelations} from '../models';
import {MysqlDataDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ItemDataRepository extends DefaultCrudRepository<
  ItemData,
  typeof ItemData.prototype.Id,
  ItemDataRelations
> {
  constructor(
    @inject('datasources.MysqlData') dataSource: MysqlDataDataSource,
  ) {
    super(ItemData, dataSource);
  }
}
