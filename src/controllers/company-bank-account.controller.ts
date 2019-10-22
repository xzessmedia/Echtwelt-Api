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
  BankAccount,
} from '../models';
import {CompanyRepository} from '../repositories';

export class CompanyBankAccountController {
  constructor(
    @repository(CompanyRepository) protected companyRepository: CompanyRepository,
  ) { }

  @get('/companies/{id}/bank-accounts', {
    responses: {
      '200': {
        description: 'Array of BankAccount\'s belonging to Company',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BankAccount)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<BankAccount>,
  ): Promise<BankAccount[]> {
    return this.companyRepository.bankAccounts(id).find(filter);
  }

  @post('/companies/{id}/bank-accounts', {
    responses: {
      '200': {
        description: 'Company model instance',
        content: {'application/json': {schema: getModelSchemaRef(BankAccount)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Company.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BankAccount, {
            title: 'NewBankAccountInCompany',
            exclude: ['Id'],
            optional: ['companyId']
          }),
        },
      },
    }) bankAccount: Omit<BankAccount, 'Id'>,
  ): Promise<BankAccount> {
    return this.companyRepository.bankAccounts(id).create(bankAccount);
  }

  @patch('/companies/{id}/bank-accounts', {
    responses: {
      '200': {
        description: 'Company.BankAccount PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BankAccount, {partial: true}),
        },
      },
    })
    bankAccount: Partial<BankAccount>,
    @param.query.object('where', getWhereSchemaFor(BankAccount)) where?: Where<BankAccount>,
  ): Promise<Count> {
    return this.companyRepository.bankAccounts(id).patch(bankAccount, where);
  }

  @del('/companies/{id}/bank-accounts', {
    responses: {
      '200': {
        description: 'Company.BankAccount DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(BankAccount)) where?: Where<BankAccount>,
  ): Promise<Count> {
    return this.companyRepository.bankAccounts(id).delete(where);
  }
}
