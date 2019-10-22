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
  Vehicle,
} from '../models';
import {CharacterRepository} from '../repositories';

export class CharacterVehicleController {
  constructor(
    @repository(CharacterRepository) protected characterRepository: CharacterRepository,
  ) { }

  @get('/characters/{id}/vehicles', {
    responses: {
      '200': {
        description: 'Array of Vehicle\'s belonging to Character',
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
    return this.characterRepository.vehicles(id).find(filter);
  }

  @post('/characters/{id}/vehicles', {
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehicle)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Character.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehicle, {
            title: 'NewVehicleInCharacter',
            exclude: ['Id'],
            optional: ['characterId']
          }),
        },
      },
    }) vehicle: Omit<Vehicle, 'Id'>,
  ): Promise<Vehicle> {
    return this.characterRepository.vehicles(id).create(vehicle);
  }

  @patch('/characters/{id}/vehicles', {
    responses: {
      '200': {
        description: 'Character.Vehicle PATCH success count',
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
    return this.characterRepository.vehicles(id).patch(vehicle, where);
  }

  @del('/characters/{id}/vehicles', {
    responses: {
      '200': {
        description: 'Character.Vehicle DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Vehicle)) where?: Where<Vehicle>,
  ): Promise<Count> {
    return this.characterRepository.vehicles(id).delete(where);
  }
}
