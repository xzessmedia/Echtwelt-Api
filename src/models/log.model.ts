import {Entity, model, property} from '@loopback/repository';

@model()
export class Log extends Entity {
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
  })
  Source?: string;

  @property({
    type: 'string',
    required: true,
    default: "Default",
  })
  Category: string;

  @property({
    type: 'number',
  })
  LogType?: number;

  @property({
    type: 'string',
    required: true,
  })
  Message: string;


  constructor(data?: Partial<Log>) {
    super(data);
  }
}

export interface LogRelations {
  // describe navigational properties here
}

export type LogWithRelations = Log & LogRelations;
