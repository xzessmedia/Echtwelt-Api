import {Entity, model, property, hasMany} from '@loopback/repository';
import {Location} from './location.model';
import {Price} from './price.model';

@model()
export class Market extends Entity {
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

  @hasMany(() => Location)
  locations: Location[];

  @hasMany(() => Price)
  prices: Price[];

  constructor(data?: Partial<Market>) {
    super(data);
  }
}

export interface MarketRelations {
  // describe navigational properties here
}

export type MarketWithRelations = Market & MarketRelations;
