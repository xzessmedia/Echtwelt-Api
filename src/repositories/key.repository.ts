import {DefaultCrudRepository} from '@loopback/repository';
import {Key, KeyRelations} from '../models';
import {MysqlDataDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class KeyRepository extends DefaultCrudRepository<
  Key,
  typeof Key.prototype.Id,
  KeyRelations
> {
  constructor(
    @inject('datasources.MysqlData') dataSource: MysqlDataDataSource,
  ) {
    super(Key, dataSource);
  }
}
