import { Entity, model, property, belongsTo } from '@loopback/repository';

@model()
export class BankAccount extends Entity {
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
    type: 'number',
    required: true,
  })
  Amount: number;

  @property({
    type: 'number',
    required: true,
  })
  DispositionAmount: number;

  @property({
    type: 'number',
    required: true,
  })
  PinCode: number;

  @property({
    type: 'number',
    required: true,
  })
  WrongTries: number;

  @property({
    type: 'boolean',
    required: true,
  })
  IsLocked: boolean;

  @property({
    type: 'number',
  })
  characterId?: number;

  @property({
    type: 'number',
  })
  companyId?: number;

  constructor(data?: Partial<BankAccount>) {
    super(data);
  }
}

export interface BankAccountRelations {
  // describe navigational properties here
}

export type BankAccountWithRelations = BankAccount & BankAccountRelations;
