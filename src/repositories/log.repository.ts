import {DefaultCrudRepository} from '@loopback/repository';
import {Log, LogRelations} from '../models';
import {MysqlDataDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class LogRepository extends DefaultCrudRepository<
  Log,
  typeof Log.prototype.Id,
  LogRelations
> {
  constructor(
    @inject('datasources.MysqlData') dataSource: MysqlDataDataSource,
  ) {
    super(Log, dataSource);
  }
}
