import { Entity, model, property, hasMany } from '@loopback/repository';
import { Character } from './character.model';

@model()
export class Player extends Entity {
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
  FirstSeenAt: string;

  @property({
    type: 'date',
    required: true,
  })
  LastSeenAt: string;

  @property({
    type: 'string',
    required: true,
  })
  SocialClubName: string;

  @property({
    type: 'string',
    required: true,
  })
  EMail: string;

  @property({
    type: 'string',
    required: true,
  })
  Password: string;

  @property({
    type: 'boolean',
    required: true,
  })
  IsBanned: boolean;

  @hasMany(() => Character)
  characters: Character[];

  constructor(data?: Partial<Player>) {
    super(data);
  }
}

export interface PlayerRelations {
  // describe navigational properties here
}

export type PlayerWithRelations = Player & PlayerRelations;
