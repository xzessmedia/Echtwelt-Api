import { Entity, model, property } from '@loopback/repository';

@model()
export class Simcard extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;

  @property({
    type: 'number',
    required: true,
    default: 5000,
  })
  Phonenumber: number;

  @property({
    type: 'number',
    required: true,
    default: 0.0,
  })
  Credits: number;

  @property({
    type: 'number',
    required: true,
    default: 0.0,
  })
  SimType: number;

  @property({
    type: 'boolean',
    required: true,
  })
  IsActive: boolean;

  @property({
    type: 'number',
  })
  characterId?: number;

  @property({
    type: 'number',
  })
  companyId?: number;

  constructor(data?: Partial<Simcard>) {
    super(data);
  }
}

export interface SimcardRelations {
  // describe navigational properties here
}

export type SimcardWithRelations = Simcard & SimcardRelations;
