import {DefaultCrudRepository} from '@loopback/repository';
import {Vehicle, VehicleRelations} from '../models';
import {MysqlDataDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VehicleRepository extends DefaultCrudRepository<
  Vehicle,
  typeof Vehicle.prototype.Id,
  VehicleRelations
> {
  constructor(
    @inject('datasources.MysqlData') dataSource: MysqlDataDataSource,
  ) {
    super(Vehicle, dataSource);
  }
}
