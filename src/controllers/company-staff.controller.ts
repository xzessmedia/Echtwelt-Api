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
  Staff,
} from '../models';
import {CompanyRepository} from '../repositories';

export class CompanyStaffController {
  constructor(
    @repository(CompanyRepository) protected companyRepository: CompanyRepository,
  ) { }

  @get('/companies/{id}/staff', {
    responses: {
      '200': {
        description: 'Array of Staff\'s belonging to Company',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Staff)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Staff>,
  ): Promise<Staff[]> {
    return this.companyRepository.staff(id).find(filter);
  }

  @post('/companies/{id}/staff', {
    responses: {
      '200': {
        description: 'Company model instance',
        content: {'application/json': {schema: getModelSchemaRef(Staff)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Company.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Staff, {
            title: 'NewStaffInCompany',
            exclude: ['Id'],
            optional: ['companyId']
          }),
        },
      },
    }) staff: Omit<Staff, 'Id'>,
  ): Promise<Staff> {
    return this.companyRepository.staff(id).create(staff);
  }

  @patch('/companies/{id}/staff', {
    responses: {
      '200': {
        description: 'Company.Staff PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Staff, {partial: true}),
        },
      },
    })
    staff: Partial<Staff>,
    @param.query.object('where', getWhereSchemaFor(Staff)) where?: Where<Staff>,
  ): Promise<Count> {
    return this.companyRepository.staff(id).patch(staff, where);
  }

  @del('/companies/{id}/staff', {
    responses: {
      '200': {
        description: 'Company.Staff DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Staff)) where?: Where<Staff>,
  ): Promise<Count> {
    return this.companyRepository.staff(id).delete(where);
  }
}
