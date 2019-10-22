import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Company, CompanyRelations, Staff, Bills, Vehicle, Garage, Estate, Simcard, BankAccount} from '../models';
import {MysqlDataDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {StaffRepository} from './staff.repository';
import {BillsRepository} from './bills.repository';
import {VehicleRepository} from './vehicle.repository';
import {GarageRepository} from './garage.repository';
import {EstateRepository} from './estate.repository';
import {SimcardRepository} from './simcard.repository';
import {BankAccountRepository} from './bank-account.repository';

export class CompanyRepository extends DefaultCrudRepository<
  Company,
  typeof Company.prototype.Id,
  CompanyRelations
> {

  public readonly staff: HasManyRepositoryFactory<Staff, typeof Company.prototype.Id>;

  public readonly bills: HasManyRepositoryFactory<Bills, typeof Company.prototype.Id>;

  public readonly vehicles: HasManyRepositoryFactory<Vehicle, typeof Company.prototype.Id>;

  public readonly garages: HasManyRepositoryFactory<Garage, typeof Company.prototype.Id>;

  public readonly estates: HasManyRepositoryFactory<Estate, typeof Company.prototype.Id>;

  public readonly simcards: HasManyRepositoryFactory<Simcard, typeof Company.prototype.Id>;

  public readonly bankAccounts: HasManyRepositoryFactory<BankAccount, typeof Company.prototype.Id>;

  constructor(
    @inject('datasources.MysqlData') dataSource: MysqlDataDataSource, @repository.getter('StaffRepository') protected staffRepositoryGetter: Getter<StaffRepository>, @repository.getter('BillsRepository') protected billsRepositoryGetter: Getter<BillsRepository>, @repository.getter('VehicleRepository') protected vehicleRepositoryGetter: Getter<VehicleRepository>, @repository.getter('GarageRepository') protected garageRepositoryGetter: Getter<GarageRepository>, @repository.getter('EstateRepository') protected estateRepositoryGetter: Getter<EstateRepository>, @repository.getter('SimcardRepository') protected simcardRepositoryGetter: Getter<SimcardRepository>, @repository.getter('BankAccountRepository') protected bankAccountRepositoryGetter: Getter<BankAccountRepository>,
  ) {
    super(Company, dataSource);
    this.bankAccounts = this.createHasManyRepositoryFactoryFor('bankAccounts', bankAccountRepositoryGetter,);
    this.simcards = this.createHasManyRepositoryFactoryFor('simcards', simcardRepositoryGetter,);
    this.estates = this.createHasManyRepositoryFactoryFor('estates', estateRepositoryGetter,);
    this.garages = this.createHasManyRepositoryFactoryFor('garages', garageRepositoryGetter,);
    this.vehicles = this.createHasManyRepositoryFactoryFor('vehicles', vehicleRepositoryGetter,);
    this.bills = this.createHasManyRepositoryFactoryFor('bills', billsRepositoryGetter,);
    this.staff = this.createHasManyRepositoryFactoryFor('staff', staffRepositoryGetter,);
  }
}
