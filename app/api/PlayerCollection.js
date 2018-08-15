import Collection from './Collection';
import Player from '../dto/Player';

const PLAYERS_COLLECTION_NAME = 'Players';

export default class PlayerCollection extends Collection {
  /**
   * Might throw is data returned from remote source doesn't match with Player
   * @returns Player[]
   */
  async getPlayers() {
    const players = [];
    const querySnapshot = await this.connection().collection(PLAYERS_COLLECTION_NAME).get();

    querySnapshot.forEach((player) => {
      players.push(new Player(player.data()));
    });

    return players;
  }
}
