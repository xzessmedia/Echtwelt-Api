import {DefaultCrudRepository} from '@loopback/repository';
import {Estate, EstateRelations} from '../models';
import {MysqlDataDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EstateRepository extends DefaultCrudRepository<
  Estate,
  typeof Estate.prototype.Id,
  EstateRelations
> {
  constructor(
    @inject('datasources.MysqlData') dataSource: MysqlDataDataSource,
  ) {
    super(Estate, dataSource);
  }
}
