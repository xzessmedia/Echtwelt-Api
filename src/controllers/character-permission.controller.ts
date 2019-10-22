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
  Permission,
} from '../models';
import {CharacterRepository} from '../repositories';

export class CharacterPermissionController {
  constructor(
    @repository(CharacterRepository) protected characterRepository: CharacterRepository,
  ) { }

  @get('/characters/{id}/permissions', {
    responses: {
      '200': {
        description: 'Array of Permission\'s belonging to Character',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Permission)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Permission>,
  ): Promise<Permission[]> {
    return this.characterRepository.permissions(id).find(filter);
  }

  @post('/characters/{id}/permissions', {
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: getModelSchemaRef(Permission)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Character.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permission, {
            title: 'NewPermissionInCharacter',
            exclude: ['Id'],
            optional: ['characterId']
          }),
        },
      },
    }) permission: Omit<Permission, 'Id'>,
  ): Promise<Permission> {
    return this.characterRepository.permissions(id).create(permission);
  }

  @patch('/characters/{id}/permissions', {
    responses: {
      '200': {
        description: 'Character.Permission PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permission, {partial: true}),
        },
      },
    })
    permission: Partial<Permission>,
    @param.query.object('where', getWhereSchemaFor(Permission)) where?: Where<Permission>,
  ): Promise<Count> {
    return this.characterRepository.permissions(id).patch(permission, where);
  }

  @del('/characters/{id}/permissions', {
    responses: {
      '200': {
        description: 'Character.Permission DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Permission)) where?: Where<Permission>,
  ): Promise<Count> {
    return this.characterRepository.permissions(id).delete(where);
  }
}
