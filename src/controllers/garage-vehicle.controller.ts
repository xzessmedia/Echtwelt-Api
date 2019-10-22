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
  Garage,
  Vehicle,
} from '../models';
import {GarageRepository} from '../repositories';

export class GarageVehicleController {
  constructor(
    @repository(GarageRepository) protected garageRepository: GarageRepository,
  ) { }

  @get('/garages/{id}/vehicles', {
    responses: {
      '200': {
        description: 'Array of Vehicle\'s belonging to Garage',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehicle)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Vehicle>,
  ): Promise<Vehicle[]> {
    return this.garageRepository.vehicles(id).find(filter);
  }

  @post('/garages/{id}/vehicles', {
    responses: {
      '200': {
        description: 'Garage model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehicle)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Garage.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehicle, {
            title: 'NewVehicleInGarage',
            exclude: ['Id'],
            optional: ['garageId']
          }),
        },
      },
    }) vehicle: Omit<Vehicle, 'Id'>,
  ): Promise<Vehicle> {
    return this.garageRepository.vehicles(id).create(vehicle);
  }

  @patch('/garages/{id}/vehicles', {
    responses: {
      '200': {
        description: 'Garage.Vehicle PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehicle, {partial: true}),
        },
      },
    })
    vehicle: Partial<Vehicle>,
    @param.query.object('where', getWhereSchemaFor(Vehicle)) where?: Where<Vehicle>,
  ): Promise<Count> {
    return this.garageRepository.vehicles(id).patch(vehicle, where);
  }

  @del('/garages/{id}/vehicles', {
    responses: {
      '200': {
        description: 'Garage.Vehicle DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Vehicle)) where?: Where<Vehicle>,
  ): Promise<Count> {
    return this.garageRepository.vehicles(id).delete(where);
  }
}
