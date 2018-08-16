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

    querySnapshot.forEach((playerDoc) => {
      const playerDataWithId = { ...playerDoc.data(), ...{ id: playerDoc.id } };
      players.push(new Player(playerDataWithId));
    });

    return players;
  }

  /**
   * @param {Player} player to save
   * @returns ID of the newly created Player
   */
  async createPlayer(player) {
    if (!(player instanceof Player)) {
      throw Error('Players can only be created out of Player instances');
    }
    return this.connection().collection(PLAYERS_COLLECTION_NAME).add(
      // Firestore accepts only object types as its arguments, which is kinda weird,
      // so convert it to object using JSON.
      // Support for class instances might be on its way: https://github.com/firebase/firebase-js-sdk/issues/311
      JSON.parse(JSON.stringify(player)),
    ).id;
  }
}
