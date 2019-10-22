import { Entity, model, property } from '@loopback/repository';

@model()
export class Key extends Entity {
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
  Tag: string;

  @property({
    type: 'boolean',
    required: true,
  })
  IsActive: boolean;


  constructor(data?: Partial<Key>) {
    super(data);
  }
}

export interface KeyRelations {
  // describe navigational properties here
}

export type KeyWithRelations = Key & KeyRelations;
