import { Entity, model, property } from '@loopback/repository';

@model()
export class Permission extends Entity {
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

  @property({
    type: 'number',
  })
  characterId?: number;

  constructor(data?: Partial<Permission>) {
    super(data);
  }
}

export interface PermissionRelations {
  // describe navigational properties here
}

export type PermissionWithRelations = Permission & PermissionRelations;
