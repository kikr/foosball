import Document from './Document';

export default class Match extends Document {
  constructor(data) {
    super(data);
    Object.assign(this, data || {});
  }

  setDuration(seconds) {
    this.duration = seconds;
  }

  setStart(date) {
    this.start = date;
  }

  setHomeScore(score) {
    this.homeScore = score;
  }

  setAwayScore(score) {
    this.awayScore = score;
  }

  setHome(players) {
    this.home = players;
  }

  setAway(players) {
    this.away = players;
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
