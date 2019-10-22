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
  Market,
  Price,
} from '../models';
import {MarketRepository} from '../repositories';

export class MarketPriceController {
  constructor(
    @repository(MarketRepository) protected marketRepository: MarketRepository,
  ) { }

  @get('/markets/{id}/prices', {
    responses: {
      '200': {
        description: 'Array of Price\'s belonging to Market',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Price)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Price>,
  ): Promise<Price[]> {
    return this.marketRepository.prices(id).find(filter);
  }

  @post('/markets/{id}/prices', {
    responses: {
      '200': {
        description: 'Market model instance',
        content: {'application/json': {schema: getModelSchemaRef(Price)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Market.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Price, {
            title: 'NewPriceInMarket',
            exclude: ['Id'],
            optional: ['marketId']
          }),
        },
      },
    }) price: Omit<Price, 'Id'>,
  ): Promise<Price> {
    return this.marketRepository.prices(id).create(price);
  }

  @patch('/markets/{id}/prices', {
    responses: {
      '200': {
        description: 'Market.Price PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Price, {partial: true}),
        },
      },
    })
    price: Partial<Price>,
    @param.query.object('where', getWhereSchemaFor(Price)) where?: Where<Price>,
  ): Promise<Count> {
    return this.marketRepository.prices(id).patch(price, where);
  }

  @del('/markets/{id}/prices', {
    responses: {
      '200': {
        description: 'Market.Price DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Price)) where?: Where<Price>,
  ): Promise<Count> {
    return this.marketRepository.prices(id).delete(where);
  }
}
