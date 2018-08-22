import Collection from './Collection';
import Player from '../dto/Player';
import Match from '../dto/Match';

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

  updatePlayerStats(match) {
    if (!(match instanceof Match)) {
      throw Error('Players can only be created out of Player instances');
    }
    // Smells, Firestore specific batch-function, although we try to keep things generic
    const batch = this.connection().batch();
    const { away, home } = match;
    const collection = this.connection().collection(PLAYERS_COLLECTION_NAME);
    let stats;
    let playerDocRef;

    home.forEach((player) => {
      playerDocRef = collection.doc(player.getId());
      stats = this.updateSinglePlayerStats(
        player, match.homeScore > match.awayScore, match.homeScore, match.awayScore,
      );

      batch.update(playerDocRef, {
        stats: JSON.parse(JSON.stringify(stats)),
      });
    });

    away.forEach((player) => {
      playerDocRef = collection.doc(player.getId());
      stats = this.updateSinglePlayerStats(
        player, match.awayScore > match.homeScore, match.awayScore, match.homeScore,
      );

      batch.update(playerDocRef, {
        // See comments above why we mess with JSON
        stats: JSON.parse(JSON.stringify(stats)),
      });
    });

    return batch.commit();
  }

  /* eslint-disable class-methods-use-this */
  updateSinglePlayerStats(player, didWin, goalsScored, goalsConceded) {
    const { stats } = player;

    if (didWin) {
      stats.wins += 1;
    } else {
      stats.losses += 1;
    }

    stats.goalsScored = goalsScored + stats.goalsScored;
    stats.goalsConceded = goalsConceded + stats.goalsConceded;

    return stats;
  }
  /* eslint-enable class-methods-use-this */
}
