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
  Simcard,
} from '../models';
import {CompanyRepository} from '../repositories';

export class CompanySimcardController {
  constructor(
    @repository(CompanyRepository) protected companyRepository: CompanyRepository,
  ) { }

  @get('/companies/{id}/simcards', {
    responses: {
      '200': {
        description: 'Array of Simcard\'s belonging to Company',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Simcard)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Simcard>,
  ): Promise<Simcard[]> {
    return this.companyRepository.simcards(id).find(filter);
  }

  @post('/companies/{id}/simcards', {
    responses: {
      '200': {
        description: 'Company model instance',
        content: {'application/json': {schema: getModelSchemaRef(Simcard)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Company.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Simcard, {
            title: 'NewSimcardInCompany',
            exclude: ['Id'],
            optional: ['companyId']
          }),
        },
      },
    }) simcard: Omit<Simcard, 'Id'>,
  ): Promise<Simcard> {
    return this.companyRepository.simcards(id).create(simcard);
  }

  @patch('/companies/{id}/simcards', {
    responses: {
      '200': {
        description: 'Company.Simcard PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Simcard, {partial: true}),
        },
      },
    })
    simcard: Partial<Simcard>,
    @param.query.object('where', getWhereSchemaFor(Simcard)) where?: Where<Simcard>,
  ): Promise<Count> {
    return this.companyRepository.simcards(id).patch(simcard, where);
  }

  @del('/companies/{id}/simcards', {
    responses: {
      '200': {
        description: 'Company.Simcard DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Simcard)) where?: Where<Simcard>,
  ): Promise<Count> {
    return this.companyRepository.simcards(id).delete(where);
  }
}
