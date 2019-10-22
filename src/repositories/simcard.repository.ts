import {DefaultCrudRepository} from '@loopback/repository';
import {Simcard, SimcardRelations} from '../models';
import {MysqlDataDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SimcardRepository extends DefaultCrudRepository<
  Simcard,
  typeof Simcard.prototype.Id,
  SimcardRelations
> {
  constructor(
    @inject('datasources.MysqlData') dataSource: MysqlDataDataSource,
  ) {
    super(Simcard, dataSource);
  }
}
