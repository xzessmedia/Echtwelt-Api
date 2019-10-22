import { Entity, model, property } from '@loopback/repository';

@model()
export class Setting extends Entity {
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
  Key: string;

  @property({
    type: 'object',
    required: true,
  })
  Value: object;

  @property({
    type: 'boolean',
    required: true,
  })
  IsActive: boolean;


  constructor(data?: Partial<Setting>) {
    super(data);
  }
}

export interface SettingRelations {
  // describe navigational properties here
}

export type SettingWithRelations = Setting & SettingRelations;
