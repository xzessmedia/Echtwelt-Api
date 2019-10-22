import {DefaultCrudRepository} from '@loopback/repository';
import {Permission, PermissionRelations} from '../models';
import {MysqlDataDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PermissionRepository extends DefaultCrudRepository<
  Permission,
  typeof Permission.prototype.Id,
  PermissionRelations
> {
  constructor(
    @inject('datasources.MysqlData') dataSource: MysqlDataDataSource,
  ) {
    super(Permission, dataSource);
  }
}
