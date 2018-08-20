import Document from './Document';

export default class Match extends Document {
  constructor(data) {
    super(data);
    Object.assign(this, data || {});
  }

  validate() {
    if (!(this.home)) {
      throw Error('Match home players are required!');
    }
    if (!(this.away)) {
      throw Error('Match away players are required!');
    }

    if (this.homeScore === undefined) {
      throw Error('Match home score is required!');
    }

    if (this.awayScore === undefined) {
      throw Error('Match away score is required!');
    }

    if (!(this.start)) {
      throw Error('Match start timestamp is required!');
    }

    if (this.duration === undefined) {
      throw Error('Match duration is required!');
    }
  }
}

export class MatchBuilder {
  constructor() {
    this.match = new Match();
  }

  setDuration(seconds) {
    this.match.duration = seconds;
    return this;
  }

  setStart(date) {
    this.match.start = date;
    return this;
  }

  setHomeScore(score) {
    this.match.homeScore = score;
    return this;
  }

  setAwayScore(score) {
    this.match.awayScore = score;
    return this;
  }

  setHome(players) {
    this.match.home = players;
    return this;
  }

  setAway(players) {
    this.match.away = players;
    return this;
  }

  build() {
    this.match.validate();
    return this.match;
  }
}
