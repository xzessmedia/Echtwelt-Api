import { Entity, model, property, hasMany } from '@loopback/repository';
import { Vehicle } from './vehicle.model';

@model()
export class Garage extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;

  @property({
    type: 'string',
    required: true,
  })
  Name: string;

  @property({
    type: 'object',
    required: true,
  })
  Location: object;

  @property({
    type: 'boolean',
    required: true,
  })
  IsLocked: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  IsPublic: boolean;

  @hasMany(() => Vehicle)
  vehicles: Vehicle[];

  @property({
    type: 'number',
  })
  companyId?: number;

  constructor(data?: Partial<Garage>) {
    super(data);
  }
}

export interface GarageRelations {
  // describe navigational properties here
}

export type GarageWithRelations = Garage & GarageRelations;
