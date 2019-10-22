import {DefaultCrudRepository} from '@loopback/repository';
import {Location, LocationRelations} from '../models';
import {MysqlDataDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class LocationRepository extends DefaultCrudRepository<
  Location,
  typeof Location.prototype.Id,
  LocationRelations
> {
  constructor(
    @inject('datasources.MysqlData') dataSource: MysqlDataDataSource,
  ) {
    super(Location, dataSource);
  }
}
