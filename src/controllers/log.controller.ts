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
import {Log} from '../models';
import {LogRepository} from '../repositories';

export class LogController {
  constructor(
    @repository(LogRepository)
    public logRepository : LogRepository,
  ) {}

  @post('/logs', {
    responses: {
      '200': {
        description: 'Log model instance',
        content: {'application/json': {schema: getModelSchemaRef(Log)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Log, {
            title: 'NewLog',
            exclude: ['Id'],
          }),
        },
      },
    })
    log: Omit<Log, 'Id'>,
  ): Promise<Log> {
    return this.logRepository.create(log);
  }

  @get('/logs/count', {
    responses: {
      '200': {
        description: 'Log model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Log)) where?: Where<Log>,
  ): Promise<Count> {
    return this.logRepository.count(where);
  }

  @get('/logs', {
    responses: {
      '200': {
        description: 'Array of Log model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Log)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Log)) filter?: Filter<Log>,
  ): Promise<Log[]> {
    return this.logRepository.find(filter);
  }

  @patch('/logs', {
    responses: {
      '200': {
        description: 'Log PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Log, {partial: true}),
        },
      },
    })
    log: Log,
    @param.query.object('where', getWhereSchemaFor(Log)) where?: Where<Log>,
  ): Promise<Count> {
    return this.logRepository.updateAll(log, where);
  }

  @get('/logs/{id}', {
    responses: {
      '200': {
        description: 'Log model instance',
        content: {'application/json': {schema: getModelSchemaRef(Log)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Log> {
    return this.logRepository.findById(id);
  }

  @patch('/logs/{id}', {
    responses: {
      '204': {
        description: 'Log PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Log, {partial: true}),
        },
      },
    })
    log: Log,
  ): Promise<void> {
    await this.logRepository.updateById(id, log);
  }

  @put('/logs/{id}', {
    responses: {
      '204': {
        description: 'Log PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() log: Log,
  ): Promise<void> {
    await this.logRepository.replaceById(id, log);
  }

  @del('/logs/{id}', {
    responses: {
      '204': {
        description: 'Log DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.logRepository.deleteById(id);
  }
}
