import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Character, CharacterRelations, BankAccount, Bills, Permission, Vehicle, Estate, Simcard} from '../models';
import {MysqlDataDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {BankAccountRepository} from './bank-account.repository';
import {BillsRepository} from './bills.repository';
import {PermissionRepository} from './permission.repository';
import {VehicleRepository} from './vehicle.repository';
import {EstateRepository} from './estate.repository';
import {SimcardRepository} from './simcard.repository';

export class CharacterRepository extends DefaultCrudRepository<
  Character,
  typeof Character.prototype.Id,
  CharacterRelations
> {

  public readonly bankAccounts: HasManyRepositoryFactory<BankAccount, typeof Character.prototype.Id>;

  public readonly bills: HasManyRepositoryFactory<Bills, typeof Character.prototype.Id>;

  public readonly permissions: HasManyRepositoryFactory<Permission, typeof Character.prototype.Id>;

  public readonly vehicles: HasManyRepositoryFactory<Vehicle, typeof Character.prototype.Id>;

  public readonly estates: HasManyRepositoryFactory<Estate, typeof Character.prototype.Id>;

  public readonly simcards: HasManyRepositoryFactory<Simcard, typeof Character.prototype.Id>;

  constructor(
    @inject('datasources.MysqlData') dataSource: MysqlDataDataSource, @repository.getter('BankAccountRepository') protected bankAccountRepositoryGetter: Getter<BankAccountRepository>, @repository.getter('BillsRepository') protected billsRepositoryGetter: Getter<BillsRepository>, @repository.getter('PermissionRepository') protected permissionRepositoryGetter: Getter<PermissionRepository>, @repository.getter('VehicleRepository') protected vehicleRepositoryGetter: Getter<VehicleRepository>, @repository.getter('EstateRepository') protected estateRepositoryGetter: Getter<EstateRepository>, @repository.getter('SimcardRepository') protected simcardRepositoryGetter: Getter<SimcardRepository>,
  ) {
    super(Character, dataSource);
    this.simcards = this.createHasManyRepositoryFactoryFor('simcards', simcardRepositoryGetter,);
    this.estates = this.createHasManyRepositoryFactoryFor('estates', estateRepositoryGetter,);
    this.vehicles = this.createHasManyRepositoryFactoryFor('vehicles', vehicleRepositoryGetter,);
    this.permissions = this.createHasManyRepositoryFactoryFor('permissions', permissionRepositoryGetter,);
    this.bills = this.createHasManyRepositoryFactoryFor('bills', billsRepositoryGetter,);
    this.bankAccounts = this.createHasManyRepositoryFactoryFor('bankAccounts', bankAccountRepositoryGetter,);
  }
}
