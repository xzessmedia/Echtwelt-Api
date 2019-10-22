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
import {Location} from '../models';
import {LocationRepository} from '../repositories';

export class LocationController {
  constructor(
    @repository(LocationRepository)
    public locationRepository : LocationRepository,
  ) {}

  @post('/locations', {
    responses: {
      '200': {
        description: 'Location model instance',
        content: {'application/json': {schema: getModelSchemaRef(Location)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Location, {
            title: 'NewLocation',
            exclude: ['Id'],
          }),
        },
      },
    })
    location: Omit<Location, 'Id'>,
  ): Promise<Location> {
    return this.locationRepository.create(location);
  }

  @get('/locations/count', {
    responses: {
      '200': {
        description: 'Location model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Location)) where?: Where<Location>,
  ): Promise<Count> {
    return this.locationRepository.count(where);
  }

  @get('/locations', {
    responses: {
      '200': {
        description: 'Array of Location model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Location)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Location)) filter?: Filter<Location>,
  ): Promise<Location[]> {
    return this.locationRepository.find(filter);
  }

  @patch('/locations', {
    responses: {
      '200': {
        description: 'Location PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Location, {partial: true}),
        },
      },
    })
    location: Location,
    @param.query.object('where', getWhereSchemaFor(Location)) where?: Where<Location>,
  ): Promise<Count> {
    return this.locationRepository.updateAll(location, where);
  }

  @get('/locations/{id}', {
    responses: {
      '200': {
        description: 'Location model instance',
        content: {'application/json': {schema: getModelSchemaRef(Location)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Location> {
    return this.locationRepository.findById(id);
  }

  @patch('/locations/{id}', {
    responses: {
      '204': {
        description: 'Location PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Location, {partial: true}),
        },
      },
    })
    location: Location,
  ): Promise<void> {
    await this.locationRepository.updateById(id, location);
  }

  @put('/locations/{id}', {
    responses: {
      '204': {
        description: 'Location PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() location: Location,
  ): Promise<void> {
    await this.locationRepository.replaceById(id, location);
  }

  @del('/locations/{id}', {
    responses: {
      '204': {
        description: 'Location DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.locationRepository.deleteById(id);
  }
}
