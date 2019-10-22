import { Entity, model, property, hasMany, belongsTo } from '@loopback/repository';
import { BankAccount } from './bank-account.model';
import { Bills } from './bills.model';
import { Permission } from './permission.model';
import { Vehicle } from './vehicle.model';
import { Estate } from './estate.model';
import { Simcard } from './simcard.model';

@model()
export class Character extends Entity {
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
    type: 'boolean',
    required: true,
  })
  IsAlive: boolean;

  @property({
    type: 'date',
    required: true,
  })
  DiedAt: string;

  @property({
    type: 'string',
    required: true,
  })
  DeathBy: string;

  @property({
    type: 'string',
    required: true,
  })
  Firstname: string;

  @property({
    type: 'string',
    required: true,
  })
  Lastname: string;

  @property({
    type: 'date',
    required: true,
  })
  Birthdate: string;

  @property({
    type: 'boolean',
    required: true,
  })
  IsMale: boolean;

  @property({
    type: 'object',
    required: true,
  })
  LastLocation: object;

  @property({
    type: 'object',
    required: true,
  })
  Customization: object;

  @property({
    type: 'number',
    required: true,
  })
  Hunger: number;

  @property({
    type: 'number',
    required: true,
  })
  Thirst: number;

  @property({
    type: 'number',
    required: true,
  })
  Health: number;

  @property({
    type: 'number',
    required: true,
  })
  Armor: number;

  @property({
    type: 'number',
  })
  playerId?: number;

  @hasMany(() => BankAccount)
  bankAccounts: BankAccount[];

  @hasMany(() => Bills)
  bills: Bills[];

  @hasMany(() => Permission)
  permissions: Permission[];

  @hasMany(() => Vehicle)
  vehicles: Vehicle[];

  @hasMany(() => Estate)
  estates: Estate[];

  @hasMany(() => Simcard)
  simcards: Simcard[];

  constructor(data?: Partial<Character>) {
    super(data);
  }
}

export interface CharacterRelations {
  // describe navigational properties here
}

export type CharacterWithRelations = Character & CharacterRelations;
