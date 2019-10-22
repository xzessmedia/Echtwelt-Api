import { Entity, model, property } from '@loopback/repository';

@model()
export class ItemData extends Entity {
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
    type: 'string',
    required: true,
  })
  Tag: string;

  @property({
    type: 'number',
    required: true,
  })
  Weight: number;

  @property({
    type: 'number',
    required: true,
  })
  Size: number;

  @property({
    type: 'number',
    required: true,
  })
  MaxStackSize: number;


  constructor(data?: Partial<ItemData>) {
    super(data);
  }
}

export interface ItemDataRelations {
  // describe navigational properties here
}

export type ItemDataWithRelations = ItemData & ItemDataRelations;
