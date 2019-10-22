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
  Estate,
} from '../models';
import {CharacterRepository} from '../repositories';

export class CharacterEstateController {
  constructor(
    @repository(CharacterRepository) protected characterRepository: CharacterRepository,
  ) { }

  @get('/characters/{id}/estates', {
    responses: {
      '200': {
        description: 'Array of Estate\'s belonging to Character',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Estate)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Estate>,
  ): Promise<Estate[]> {
    return this.characterRepository.estates(id).find(filter);
  }

  @post('/characters/{id}/estates', {
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: getModelSchemaRef(Estate)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Character.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estate, {
            title: 'NewEstateInCharacter',
            exclude: ['Id'],
            optional: ['characterId']
          }),
        },
      },
    }) estate: Omit<Estate, 'Id'>,
  ): Promise<Estate> {
    return this.characterRepository.estates(id).create(estate);
  }

  @patch('/characters/{id}/estates', {
    responses: {
      '200': {
        description: 'Character.Estate PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estate, {partial: true}),
        },
      },
    })
    estate: Partial<Estate>,
    @param.query.object('where', getWhereSchemaFor(Estate)) where?: Where<Estate>,
  ): Promise<Count> {
    return this.characterRepository.estates(id).patch(estate, where);
  }

  @del('/characters/{id}/estates', {
    responses: {
      '200': {
        description: 'Character.Estate DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Estate)) where?: Where<Estate>,
  ): Promise<Count> {
    return this.characterRepository.estates(id).delete(where);
  }
}
