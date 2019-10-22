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
  Location,
} from '../models';
import {MarketRepository} from '../repositories';

export class MarketLocationController {
  constructor(
    @repository(MarketRepository) protected marketRepository: MarketRepository,
  ) { }

  @get('/markets/{id}/locations', {
    responses: {
      '200': {
        description: 'Array of Location\'s belonging to Market',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Location)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Location>,
  ): Promise<Location[]> {
    return this.marketRepository.locations(id).find(filter);
  }

  @post('/markets/{id}/locations', {
    responses: {
      '200': {
        description: 'Market model instance',
        content: {'application/json': {schema: getModelSchemaRef(Location)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Market.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Location, {
            title: 'NewLocationInMarket',
            exclude: ['Id'],
            optional: ['marketId']
          }),
        },
      },
    }) location: Omit<Location, 'Id'>,
  ): Promise<Location> {
    return this.marketRepository.locations(id).create(location);
  }

  @patch('/markets/{id}/locations', {
    responses: {
      '200': {
        description: 'Market.Location PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Location, {partial: true}),
        },
      },
    })
    location: Partial<Location>,
    @param.query.object('where', getWhereSchemaFor(Location)) where?: Where<Location>,
  ): Promise<Count> {
    return this.marketRepository.locations(id).patch(location, where);
  }

  @del('/markets/{id}/locations', {
    responses: {
      '200': {
        description: 'Market.Location DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Location)) where?: Where<Location>,
  ): Promise<Count> {
    return this.marketRepository.locations(id).delete(where);
  }
}
