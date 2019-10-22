import {DefaultCrudRepository} from '@loopback/repository';
import {Setting, SettingRelations} from '../models';
import {MysqlDataDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SettingRepository extends DefaultCrudRepository<
  Setting,
  typeof Setting.prototype.Id,
  SettingRelations
> {
  constructor(
    @inject('datasources.MysqlData') dataSource: MysqlDataDataSource,
  ) {
    super(Setting, dataSource);
  }
}
