import { Entity, model, property } from '@loopback/repository';

@model()
export class Price extends Entity {
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
    type: 'number',
    required: true,
  })
  BuyPrice: number;

  @property({
    type: 'number',
    required: true,
  })
  SellPrice: number;

  @property({
    type: 'number',
    required: true,
  })
  ModFactor: number;

  @property({
    type: 'number',
    required: true,
  })
  BaseBuyPrice: number;

  @property({
    type: 'number',
    required: true,
  })
  BaseSellPrice: number;

  @property({
    type: 'number',
  })
  marketId?: number;

  constructor(data?: Partial<Price>) {
    super(data);
  }
}

export interface PriceRelations {
  // describe navigational properties here
}

export type PriceWithRelations = Price & PriceRelations;
