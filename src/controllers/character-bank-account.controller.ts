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
  Character,
  BankAccount,
} from '../models';
import {CharacterRepository} from '../repositories';

export class CharacterBankAccountController {
  constructor(
    @repository(CharacterRepository) protected characterRepository: CharacterRepository,
  ) { }

  @get('/characters/{id}/bank-accounts', {
    responses: {
      '200': {
        description: 'Array of BankAccount\'s belonging to Character',
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
    return this.characterRepository.bankAccounts(id).find(filter);
  }

  @post('/characters/{id}/bank-accounts', {
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: getModelSchemaRef(BankAccount)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Character.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BankAccount, {
            title: 'NewBankAccountInCharacter',
            exclude: ['Id'],
            optional: ['characterId']
          }),
        },
      },
    }) bankAccount: Omit<BankAccount, 'Id'>,
  ): Promise<BankAccount> {
    return this.characterRepository.bankAccounts(id).create(bankAccount);
  }

  @patch('/characters/{id}/bank-accounts', {
    responses: {
      '200': {
        description: 'Character.BankAccount PATCH success count',
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
    return this.characterRepository.bankAccounts(id).patch(bankAccount, where);
  }

  @del('/characters/{id}/bank-accounts', {
    responses: {
      '200': {
        description: 'Character.BankAccount DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(BankAccount)) where?: Where<BankAccount>,
  ): Promise<Count> {
    return this.characterRepository.bankAccounts(id).delete(where);
  }
}
