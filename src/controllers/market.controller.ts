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
import {Market} from '../models';
import {MarketRepository} from '../repositories';

export class MarketController {
  constructor(
    @repository(MarketRepository)
    public marketRepository : MarketRepository,
  ) {}

  @post('/markets', {
    responses: {
      '200': {
        description: 'Market model instance',
        content: {'application/json': {schema: getModelSchemaRef(Market)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Market, {
            title: 'NewMarket',
            exclude: ['Id'],
          }),
        },
      },
    })
    market: Omit<Market, 'Id'>,
  ): Promise<Market> {
    return this.marketRepository.create(market);
  }

  @get('/markets/count', {
    responses: {
      '200': {
        description: 'Market model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Market)) where?: Where<Market>,
  ): Promise<Count> {
    return this.marketRepository.count(where);
  }

  @get('/markets', {
    responses: {
      '200': {
        description: 'Array of Market model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Market)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Market)) filter?: Filter<Market>,
  ): Promise<Market[]> {
    return this.marketRepository.find(filter);
  }

  @patch('/markets', {
    responses: {
      '200': {
        description: 'Market PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Market, {partial: true}),
        },
      },
    })
    market: Market,
    @param.query.object('where', getWhereSchemaFor(Market)) where?: Where<Market>,
  ): Promise<Count> {
    return this.marketRepository.updateAll(market, where);
  }

  @get('/markets/{id}', {
    responses: {
      '200': {
        description: 'Market model instance',
        content: {'application/json': {schema: getModelSchemaRef(Market)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Market> {
    return this.marketRepository.findById(id);
  }

  @patch('/markets/{id}', {
    responses: {
      '204': {
        description: 'Market PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Market, {partial: true}),
        },
      },
    })
    market: Market,
  ): Promise<void> {
    await this.marketRepository.updateById(id, market);
  }

  @put('/markets/{id}', {
    responses: {
      '204': {
        description: 'Market PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() market: Market,
  ): Promise<void> {
    await this.marketRepository.replaceById(id, market);
  }

  @del('/markets/{id}', {
    responses: {
      '204': {
        description: 'Market DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.marketRepository.deleteById(id);
  }
}
