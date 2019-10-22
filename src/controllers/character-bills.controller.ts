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
  Bills,
} from '../models';
import {CharacterRepository} from '../repositories';

export class CharacterBillsController {
  constructor(
    @repository(CharacterRepository) protected characterRepository: CharacterRepository,
  ) { }

  @get('/characters/{id}/bills', {
    responses: {
      '200': {
        description: 'Array of Bills\'s belonging to Character',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Bills)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Bills>,
  ): Promise<Bills[]> {
    return this.characterRepository.bills(id).find(filter);
  }

  @post('/characters/{id}/bills', {
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: getModelSchemaRef(Bills)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Character.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bills, {
            title: 'NewBillsInCharacter',
            exclude: ['Id'],
            optional: ['characterId']
          }),
        },
      },
    }) bills: Omit<Bills, 'Id'>,
  ): Promise<Bills> {
    return this.characterRepository.bills(id).create(bills);
  }

  @patch('/characters/{id}/bills', {
    responses: {
      '200': {
        description: 'Character.Bills PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bills, {partial: true}),
        },
      },
    })
    bills: Partial<Bills>,
    @param.query.object('where', getWhereSchemaFor(Bills)) where?: Where<Bills>,
  ): Promise<Count> {
    return this.characterRepository.bills(id).patch(bills, where);
  }

  @del('/characters/{id}/bills', {
    responses: {
      '200': {
        description: 'Character.Bills DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Bills)) where?: Where<Bills>,
  ): Promise<Count> {
    return this.characterRepository.bills(id).delete(where);
  }
}
