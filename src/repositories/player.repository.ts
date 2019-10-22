import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Player, PlayerRelations, Character} from '../models';
import {MysqlDataDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CharacterRepository} from './character.repository';

export class PlayerRepository extends DefaultCrudRepository<
  Player,
  typeof Player.prototype.Id,
  PlayerRelations
> {

  public readonly characters: HasManyRepositoryFactory<Character, typeof Player.prototype.Id>;

  constructor(
    @inject('datasources.MysqlData') dataSource: MysqlDataDataSource, @repository.getter('CharacterRepository') protected characterRepositoryGetter: Getter<CharacterRepository>,
  ) {
    super(Player, dataSource);
    this.characters = this.createHasManyRepositoryFactoryFor('characters', characterRepositoryGetter,);
  }
}
