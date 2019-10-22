import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Key} from '../models';
import {KeyRepository} from '../repositories';

export class KeyController {
  constructor(
    @repository(KeyRepository)
    public keyRepository : KeyRepository,
  ) {}

  @post('/keys', {
    responses: {
      '200': {
        description: 'Key model instance',
        content: {'application/json': {schema: getModelSchemaRef(Key)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Key, {
            title: 'NewKey',
            exclude: ['Id'],
          }),
        },
      },
    })
    key: Omit<Key, 'Id'>,
  ): Promise<Key> {
    return this.keyRepository.create(key);
  }

  @get('/keys/count', {
    responses: {
      '200': {
        description: 'Key model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Key)) where?: Where<Key>,
  ): Promise<Count> {
    return this.keyRepository.count(where);
  }

  @get('/keys', {
    responses: {
      '200': {
        description: 'Array of Key model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Key)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Key)) filter?: Filter<Key>,
  ): Promise<Key[]> {
    return this.keyRepository.find(filter);
  }

  @patch('/keys', {
    responses: {
      '200': {
        description: 'Key PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Key, {partial: true}),
        },
      },
    })
    key: Key,
    @param.query.object('where', getWhereSchemaFor(Key)) where?: Where<Key>,
  ): Promise<Count> {
    return this.keyRepository.updateAll(key, where);
  }

  @get('/keys/{id}', {
    responses: {
      '200': {
        description: 'Key model instance',
        content: {'application/json': {schema: getModelSchemaRef(Key)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Key> {
    return this.keyRepository.findById(id);
  }

  @patch('/keys/{id}', {
    responses: {
      '204': {
        description: 'Key PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Key, {partial: true}),
        },
      },
    })
    key: Key,
  ): Promise<void> {
    await this.keyRepository.updateById(id, key);
  }

  @put('/keys/{id}', {
    responses: {
      '204': {
        description: 'Key PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() key: Key,
  ): Promise<void> {
    await this.keyRepository.replaceById(id, key);
  }

  @del('/keys/{id}', {
    responses: {
      '204': {
        description: 'Key DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.keyRepository.deleteById(id);
  }
}
