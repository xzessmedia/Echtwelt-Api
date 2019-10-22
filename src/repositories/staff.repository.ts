import {DefaultCrudRepository} from '@loopback/repository';
import {Staff, StaffRelations} from '../models';
import {MysqlDataDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class StaffRepository extends DefaultCrudRepository<
  Staff,
  typeof Staff.prototype.Id,
  StaffRelations
> {
  constructor(
    @inject('datasources.MysqlData') dataSource: MysqlDataDataSource,
  ) {
    super(Staff, dataSource);
  }
}
