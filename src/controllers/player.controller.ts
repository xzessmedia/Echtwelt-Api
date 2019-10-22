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
import {Player} from '../models';
import {PlayerRepository} from '../repositories';

export class PlayerController {
  constructor(
    @repository(PlayerRepository)
    public playerRepository : PlayerRepository,
  ) {}

  @post('/players', {
    responses: {
      '200': {
        description: 'Player model instance',
        content: {'application/json': {schema: getModelSchemaRef(Player)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {
            title: 'NewPlayer',
            exclude: ['Id'],
          }),
        },
      },
    })
    player: Omit<Player, 'Id'>,
  ): Promise<Player> {
    return this.playerRepository.create(player);
  }

  @get('/players/count', {
    responses: {
      '200': {
        description: 'Player model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Player)) where?: Where<Player>,
  ): Promise<Count> {
    return this.playerRepository.count(where);
  }

  @get('/players', {
    responses: {
      '200': {
        description: 'Array of Player model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Player)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Player)) filter?: Filter<Player>,
  ): Promise<Player[]> {
    return this.playerRepository.find(filter);
  }

  @patch('/players', {
    responses: {
      '200': {
        description: 'Player PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {partial: true}),
        },
      },
    })
    player: Player,
    @param.query.object('where', getWhereSchemaFor(Player)) where?: Where<Player>,
  ): Promise<Count> {
    return this.playerRepository.updateAll(player, where);
  }

  @get('/players/{id}', {
    responses: {
      '200': {
        description: 'Player model instance',
        content: {'application/json': {schema: getModelSchemaRef(Player)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Player> {
    return this.playerRepository.findById(id);
  }

  @patch('/players/{id}', {
    responses: {
      '204': {
        description: 'Player PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {partial: true}),
        },
      },
    })
    player: Player,
  ): Promise<void> {
    await this.playerRepository.updateById(id, player);
  }

  @put('/players/{id}', {
    responses: {
      '204': {
        description: 'Player PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() player: Player,
  ): Promise<void> {
    await this.playerRepository.replaceById(id, player);
  }

  @del('/players/{id}', {
    responses: {
      '204': {
        description: 'Player DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.playerRepository.deleteById(id);
  }
}
