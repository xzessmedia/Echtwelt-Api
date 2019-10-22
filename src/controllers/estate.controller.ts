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
import {Estate} from '../models';
import {EstateRepository} from '../repositories';

export class EstateController {
  constructor(
    @repository(EstateRepository)
    public estateRepository : EstateRepository,
  ) {}

  @post('/estates', {
    responses: {
      '200': {
        description: 'Estate model instance',
        content: {'application/json': {schema: getModelSchemaRef(Estate)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estate, {
            title: 'NewEstate',
            exclude: ['Id'],
          }),
        },
      },
    })
    estate: Omit<Estate, 'Id'>,
  ): Promise<Estate> {
    return this.estateRepository.create(estate);
  }

  @get('/estates/count', {
    responses: {
      '200': {
        description: 'Estate model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Estate)) where?: Where<Estate>,
  ): Promise<Count> {
    return this.estateRepository.count(where);
  }

  @get('/estates', {
    responses: {
      '200': {
        description: 'Array of Estate model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Estate)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Estate)) filter?: Filter<Estate>,
  ): Promise<Estate[]> {
    return this.estateRepository.find(filter);
  }

  @patch('/estates', {
    responses: {
      '200': {
        description: 'Estate PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estate, {partial: true}),
        },
      },
    })
    estate: Estate,
    @param.query.object('where', getWhereSchemaFor(Estate)) where?: Where<Estate>,
  ): Promise<Count> {
    return this.estateRepository.updateAll(estate, where);
  }

  @get('/estates/{id}', {
    responses: {
      '200': {
        description: 'Estate model instance',
        content: {'application/json': {schema: getModelSchemaRef(Estate)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Estate> {
    return this.estateRepository.findById(id);
  }

  @patch('/estates/{id}', {
    responses: {
      '204': {
        description: 'Estate PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estate, {partial: true}),
        },
      },
    })
    estate: Estate,
  ): Promise<void> {
    await this.estateRepository.updateById(id, estate);
  }

  @put('/estates/{id}', {
    responses: {
      '204': {
        description: 'Estate PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() estate: Estate,
  ): Promise<void> {
    await this.estateRepository.replaceById(id, estate);
  }

  @del('/estates/{id}', {
    responses: {
      '204': {
        description: 'Estate DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.estateRepository.deleteById(id);
  }
}
