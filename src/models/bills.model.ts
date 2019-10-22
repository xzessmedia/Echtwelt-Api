import { Entity, model, property } from '@loopback/repository';

@model()
export class Bills extends Entity {
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
  Subject: string;

  @property({
    type: 'number',
    required: true,
  })
  Amount: number;

  @property({
    type: 'boolean',
    required: true,
  })
  IsPaid: boolean;

  @property({
    type: 'number',
  })
  characterId?: number;

  @property({
    type: 'number',
  })
  companyId?: number;

  constructor(data?: Partial<Bills>) {
    super(data);
  }
}

export interface BillsRelations {
  // describe navigational properties here
}

export type BillsWithRelations = Bills & BillsRelations;
