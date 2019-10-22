import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Player,
  Character,
} from '../models';
import {PlayerRepository} from '../repositories';

export class PlayerCharacterController {
  constructor(
    @repository(PlayerRepository) protected playerRepository: PlayerRepository,
  ) { }

  @get('/players/{id}/characters', {
    responses: {
      '200': {
        description: 'Array of Character\'s belonging to Player',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Character)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Character>,
  ): Promise<Character[]> {
    return this.playerRepository.characters(id).find(filter);
  }

  @post('/players/{id}/characters', {
    responses: {
      '200': {
        description: 'Player model instance',
        content: {'application/json': {schema: getModelSchemaRef(Character)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Player.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Character, {
            title: 'NewCharacterInPlayer',
            exclude: ['Id'],
            optional: ['playerId']
          }),
        },
      },
    }) character: Omit<Character, 'Id'>,
  ): Promise<Character> {
    return this.playerRepository.characters(id).create(character);
  }

  @patch('/players/{id}/characters', {
    responses: {
      '200': {
        description: 'Player.Character PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Character, {partial: true}),
        },
      },
    })
    character: Partial<Character>,
    @param.query.object('where', getWhereSchemaFor(Character)) where?: Where<Character>,
  ): Promise<Count> {
    return this.playerRepository.characters(id).patch(character, where);
  }

  @del('/players/{id}/characters', {
    responses: {
      '200': {
        description: 'Player.Character DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Character)) where?: Where<Character>,
  ): Promise<Count> {
    return this.playerRepository.characters(id).delete(where);
  }
}
