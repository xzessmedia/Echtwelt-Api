import {Entity, model, property} from '@loopback/repository';

@model()
export class Estate extends Entity {
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
    type: 'number',
    required: true,
  })
  EstateType: number;

  @property({
    type: 'string',
    required: true,
  })
  Interiour: string;

  @property({
    type: 'object',
    required: true,
  })
  SpawnpointInside: object;

  @property({
    type: 'object',
    required: true,
  })
  SpawnpointOutside: object;

  @property({
    type: 'object',
    required: true,
  })
  EntryLocation: object;

  @property({
    type: 'object',
    required: true,
  })
  ExitLocation: object;

  @property({
    type: 'number',
    required: true,
  })
  SellPrice: number;

  @property({
    type: 'number',
    required: true,
  })
  RentPrice: number;

  @property({
    type: 'boolean',
    required: true,
  })
  IsRentable: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  IsForSale: boolean;

  @property({
    type: 'number',
  })
  companyId?: number;

  @property({
    type: 'number',
  })
  characterId?: number;

  constructor(data?: Partial<Estate>) {
    super(data);
  }
}

export interface EstateRelations {
  // describe navigational properties here
}

export type EstateWithRelations = Estate & EstateRelations;
