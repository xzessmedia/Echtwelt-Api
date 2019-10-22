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
  Character,
  Simcard,
} from '../models';
import {CharacterRepository} from '../repositories';

export class CharacterSimcardController {
  constructor(
    @repository(CharacterRepository) protected characterRepository: CharacterRepository,
  ) { }

  @get('/characters/{id}/simcards', {
    responses: {
      '200': {
        description: 'Array of Simcard\'s belonging to Character',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Simcard)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Simcard>,
  ): Promise<Simcard[]> {
    return this.characterRepository.simcards(id).find(filter);
  }

  @post('/characters/{id}/simcards', {
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: getModelSchemaRef(Simcard)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Character.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Simcard, {
            title: 'NewSimcardInCharacter',
            exclude: ['Id'],
            optional: ['characterId']
          }),
        },
      },
    }) simcard: Omit<Simcard, 'Id'>,
  ): Promise<Simcard> {
    return this.characterRepository.simcards(id).create(simcard);
  }

  @patch('/characters/{id}/simcards', {
    responses: {
      '200': {
        description: 'Character.Simcard PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Simcard, {partial: true}),
        },
      },
    })
    simcard: Partial<Simcard>,
    @param.query.object('where', getWhereSchemaFor(Simcard)) where?: Where<Simcard>,
  ): Promise<Count> {
    return this.characterRepository.simcards(id).patch(simcard, where);
  }

  @del('/characters/{id}/simcards', {
    responses: {
      '200': {
        description: 'Character.Simcard DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Simcard)) where?: Where<Simcard>,
  ): Promise<Count> {
    return this.characterRepository.simcards(id).delete(where);
  }
}
