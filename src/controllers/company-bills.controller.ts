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
  Bills,
} from '../models';
import {CompanyRepository} from '../repositories';

export class CompanyBillsController {
  constructor(
    @repository(CompanyRepository) protected companyRepository: CompanyRepository,
  ) { }

  @get('/companies/{id}/bills', {
    responses: {
      '200': {
        description: 'Array of Bills\'s belonging to Company',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Bills)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Bills>,
  ): Promise<Bills[]> {
    return this.companyRepository.bills(id).find(filter);
  }

  @post('/companies/{id}/bills', {
    responses: {
      '200': {
        description: 'Company model instance',
        content: {'application/json': {schema: getModelSchemaRef(Bills)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Company.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bills, {
            title: 'NewBillsInCompany',
            exclude: ['Id'],
            optional: ['companyId']
          }),
        },
      },
    }) bills: Omit<Bills, 'Id'>,
  ): Promise<Bills> {
    return this.companyRepository.bills(id).create(bills);
  }

  @patch('/companies/{id}/bills', {
    responses: {
      '200': {
        description: 'Company.Bills PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bills, {partial: true}),
        },
      },
    })
    bills: Partial<Bills>,
    @param.query.object('where', getWhereSchemaFor(Bills)) where?: Where<Bills>,
  ): Promise<Count> {
    return this.companyRepository.bills(id).patch(bills, where);
  }

  @del('/companies/{id}/bills', {
    responses: {
      '200': {
        description: 'Company.Bills DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Bills)) where?: Where<Bills>,
  ): Promise<Count> {
    return this.companyRepository.bills(id).delete(where);
  }
}
