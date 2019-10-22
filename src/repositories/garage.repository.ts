import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Garage, GarageRelations, Vehicle} from '../models';
import {MysqlDataDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {VehicleRepository} from './vehicle.repository';

export class GarageRepository extends DefaultCrudRepository<
  Garage,
  typeof Garage.prototype.Id,
  GarageRelations
> {

  public readonly vehicles: HasManyRepositoryFactory<Vehicle, typeof Garage.prototype.Id>;

  constructor(
    @inject('datasources.MysqlData') dataSource: MysqlDataDataSource, @repository.getter('VehicleRepository') protected vehicleRepositoryGetter: Getter<VehicleRepository>,
  ) {
    super(Garage, dataSource);
    this.vehicles = this.createHasManyRepositoryFactoryFor('vehicles', vehicleRepositoryGetter,);
  }
}
