import { Entity, model, property } from '@loopback/repository';

@model()
export class Staff extends Entity {
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
  JoinedAt: string;

  @property({
    type: 'number',
    required: true,
  })
  Level: number;

  @property({
    type: 'number',
  })
  companyId?: number;

  constructor(data?: Partial<Staff>) {
    super(data);
  }
}

export interface StaffRelations {
  // describe navigational properties here
}

export type StaffWithRelations = Staff & StaffRelations;
