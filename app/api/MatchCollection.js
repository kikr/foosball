import Collection from './Collection';
import Match from '../dto/Match';

const MATCH_COLLECTION_NAME = 'Matches';

export default class MatchCollection extends Collection {
  /**
   * Might throw is data returned from remote source doesn't match with Match
   * @returns Match[]
   */
  async getMatches() {
    const matches = [];
    const querySnapshot = await this.connection().collection(MATCH_COLLECTION_NAME).get();

    querySnapshot.forEach((matchDoc) => {
      const matchDataWithId = { ...matchDoc.data(), ...{ id: matchDoc.id } };
      matches.push(new Match(matchDataWithId));
    });

    return matches;
  }

  /**
   * @param {Match} match to save
   * @returns ID of the newly created match
   */
  async createMatch(match) {
    if (!(match instanceof Match)) {
      throw Error('Matches can only be created out of Match instances');
    }
    return this.connection().collection(MATCH_COLLECTION_NAME).add(
      // Firestore accepts only object types as its arguments, which is kinda weird,
      // so convert it to object using JSON.
      // Support for class instances might be on its way: https://github.com/firebase/firebase-js-sdk/issues/311
      JSON.parse(JSON.stringify(match)),
    ).id;
  }
}
