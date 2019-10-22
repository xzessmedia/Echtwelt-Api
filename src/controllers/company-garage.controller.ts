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
  Garage,
} from '../models';
import {CompanyRepository} from '../repositories';

export class CompanyGarageController {
  constructor(
    @repository(CompanyRepository) protected companyRepository: CompanyRepository,
  ) { }

  @get('/companies/{id}/garages', {
    responses: {
      '200': {
        description: 'Array of Garage\'s belonging to Company',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Garage)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Garage>,
  ): Promise<Garage[]> {
    return this.companyRepository.garages(id).find(filter);
  }

  @post('/companies/{id}/garages', {
    responses: {
      '200': {
        description: 'Company model instance',
        content: {'application/json': {schema: getModelSchemaRef(Garage)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Company.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Garage, {
            title: 'NewGarageInCompany',
            exclude: ['Id'],
            optional: ['companyId']
          }),
        },
      },
    }) garage: Omit<Garage, 'Id'>,
  ): Promise<Garage> {
    return this.companyRepository.garages(id).create(garage);
  }

  @patch('/companies/{id}/garages', {
    responses: {
      '200': {
        description: 'Company.Garage PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Garage, {partial: true}),
        },
      },
    })
    garage: Partial<Garage>,
    @param.query.object('where', getWhereSchemaFor(Garage)) where?: Where<Garage>,
  ): Promise<Count> {
    return this.companyRepository.garages(id).patch(garage, where);
  }

  @del('/companies/{id}/garages', {
    responses: {
      '200': {
        description: 'Company.Garage DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Garage)) where?: Where<Garage>,
  ): Promise<Count> {
    return this.companyRepository.garages(id).delete(where);
  }
}
