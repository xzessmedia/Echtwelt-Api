import { Entity, model, property } from '@loopback/repository';

@model()
export class Location extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;

  @property({
    type: 'number',
    required: true,
  })
  Name: number;

  @property({
    type: 'number',
    required: true,
  })
  Icon: number;

  @property({
    type: 'number',
    required: true,
  })
  Color: number;

  @property({
    type: 'object',
    required: true,
  })
  Position: object;

  @property({
    type: 'string',
    required: true,
  })
  Category: string;

  @property({
    type: 'string',
    required: true,
  })
  LocationType: string;

  @property({
    type: 'number',
  })
  marketId?: number;

  constructor(data?: Partial<Location>) {
    super(data);
  }
}

export interface LocationRelations {
  // describe navigational properties here
}

export type LocationWithRelations = Location & LocationRelations;
