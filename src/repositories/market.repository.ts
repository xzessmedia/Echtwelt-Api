import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Market, MarketRelations, Location, Price} from '../models';
import {MysqlDataDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {LocationRepository} from './location.repository';
import {PriceRepository} from './price.repository';

export class MarketRepository extends DefaultCrudRepository<
  Market,
  typeof Market.prototype.Id,
  MarketRelations
> {

  public readonly locations: HasManyRepositoryFactory<Location, typeof Market.prototype.Id>;

  public readonly prices: HasManyRepositoryFactory<Price, typeof Market.prototype.Id>;

  constructor(
    @inject('datasources.MysqlData') dataSource: MysqlDataDataSource, @repository.getter('LocationRepository') protected locationRepositoryGetter: Getter<LocationRepository>, @repository.getter('PriceRepository') protected priceRepositoryGetter: Getter<PriceRepository>,
  ) {
    super(Market, dataSource);
    this.prices = this.createHasManyRepositoryFactoryFor('prices', priceRepositoryGetter,);
    this.locations = this.createHasManyRepositoryFactoryFor('locations', locationRepositoryGetter,);
  }
}
