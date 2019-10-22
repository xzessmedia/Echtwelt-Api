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
  Estate,
} from '../models';
import {CompanyRepository} from '../repositories';

export class CompanyEstateController {
  constructor(
    @repository(CompanyRepository) protected companyRepository: CompanyRepository,
  ) { }

  @get('/companies/{id}/estates', {
    responses: {
      '200': {
        description: 'Array of Estate\'s belonging to Company',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Estate)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Estate>,
  ): Promise<Estate[]> {
    return this.companyRepository.estates(id).find(filter);
  }

  @post('/companies/{id}/estates', {
    responses: {
      '200': {
        description: 'Company model instance',
        content: {'application/json': {schema: getModelSchemaRef(Estate)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Company.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estate, {
            title: 'NewEstateInCompany',
            exclude: ['Id'],
            optional: ['companyId']
          }),
        },
      },
    }) estate: Omit<Estate, 'Id'>,
  ): Promise<Estate> {
    return this.companyRepository.estates(id).create(estate);
  }

  @patch('/companies/{id}/estates', {
    responses: {
      '200': {
        description: 'Company.Estate PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estate, {partial: true}),
        },
      },
    })
    estate: Partial<Estate>,
    @param.query.object('where', getWhereSchemaFor(Estate)) where?: Where<Estate>,
  ): Promise<Count> {
    return this.companyRepository.estates(id).patch(estate, where);
  }

  @del('/companies/{id}/estates', {
    responses: {
      '200': {
        description: 'Company.Estate DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Estate)) where?: Where<Estate>,
  ): Promise<Count> {
    return this.companyRepository.estates(id).delete(where);
  }
}
