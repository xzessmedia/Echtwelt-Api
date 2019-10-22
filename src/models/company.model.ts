import { Entity, model, property, hasMany } from '@loopback/repository';
import { Staff } from './staff.model';
import { Bills } from './bills.model';
import { Vehicle } from './vehicle.model';
import { Garage } from './garage.model';
import { Estate } from './estate.model';
import { Simcard } from './simcard.model';
import { BankAccount } from './bank-account.model';

@model()
export class Company extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;

  @property({
    type: 'date',
    required: true,
  })
  CreatedAt: string;

  @property({
    type: 'string',
    required: true,
  })
  Name: string;

  @property({
    type: 'boolean',
    required: true,
  })
  IsActive: boolean;

  @hasMany(() => Staff)
  staff: Staff[];

  @hasMany(() => Bills)
  bills: Bills[];

  @hasMany(() => Vehicle)
  vehicles: Vehicle[];

  @hasMany(() => Garage)
  garages: Garage[];

  @hasMany(() => Estate)
  estates: Estate[];

  @hasMany(() => Simcard)
  simcards: Simcard[];

  @hasMany(() => BankAccount)
  bankAccounts: BankAccount[];

  constructor(data?: Partial<Company>) {
    super(data);
  }
}

export interface CompanyRelations {
  // describe navigational properties here
}

export type CompanyWithRelations = Company & CompanyRelations;
