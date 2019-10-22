import { Entity, model, property, belongsTo } from '@loopback/repository';

@model()
export class Vehicle extends Entity {
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
  RegisteredAt: string;

  @property({
    type: 'string',
    required: true,
  })
  Numberplate: string;

  @property({
    type: 'string',
    required: true,
  })
  Model: string;

  @property({
    type: 'number',
    required: true,
  })
  VehicleType: number;

  @property({
    type: 'number',
    required: true,
  })
  Health: number;

  @property({
    type: 'number',
  })
  garageId?: number;

  @property({
    type: 'number',
  })
  characterId?: number;

  @property({
    type: 'number',
  })
  companyId?: number;

  constructor(data?: Partial<Vehicle>) {
    super(data);
  }
}

export interface VehicleRelations {
  // describe navigational properties here
}

export type VehicleWithRelations = Vehicle & VehicleRelations;
