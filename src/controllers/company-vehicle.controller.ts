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
  Company,
  Vehicle,
} from '../models';
import {CompanyRepository} from '../repositories';

export class CompanyVehicleController {
  constructor(
    @repository(CompanyRepository) protected companyRepository: CompanyRepository,
  ) { }

  @get('/companies/{id}/vehicles', {
    responses: {
      '200': {
        description: 'Array of Vehicle\'s belonging to Company',
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
    return this.companyRepository.vehicles(id).find(filter);
  }

  @post('/companies/{id}/vehicles', {
    responses: {
      '200': {
        description: 'Company model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehicle)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Company.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehicle, {
            title: 'NewVehicleInCompany',
            exclude: ['Id'],
            optional: ['companyId']
          }),
        },
      },
    }) vehicle: Omit<Vehicle, 'Id'>,
  ): Promise<Vehicle> {
    return this.companyRepository.vehicles(id).create(vehicle);
  }

  @patch('/companies/{id}/vehicles', {
    responses: {
      '200': {
        description: 'Company.Vehicle PATCH success count',
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
    return this.companyRepository.vehicles(id).patch(vehicle, where);
  }

  @del('/companies/{id}/vehicles', {
    responses: {
      '200': {
        description: 'Company.Vehicle DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Vehicle)) where?: Where<Vehicle>,
  ): Promise<Count> {
    return this.companyRepository.vehicles(id).delete(where);
  }
}
