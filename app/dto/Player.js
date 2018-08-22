import Document from './Document';
import PlayerStats from './PlayerStats';

export default class Player extends Document {
  constructor({
    firstName, lastName, nickName, stats, ...rest
  }) {
    super(rest);

    this.firstName = firstName;
    this.lastName = lastName;
    this.nickName = nickName || '';
    this.stats = stats || new PlayerStats({
      wins: 0,
      losses: 0,
      goalsScored: 0,
      goalsConceded: 0,
    });

    this.validate();
  }

  /**
   * Get full name, with the nick name included
   */
  getFullCoolName() {
    return `${this.firstName} "${this.nickName}" ${this.lastName}`;
  }

  validate() {
    if (!(this.firstName)) {
      throw Error('Player first name is required!');
    }
    if (!(this.lastName)) {
      throw Error('Player last name is required!');
    }
  }
}
