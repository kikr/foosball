import Document from './Document';

export default class Match extends Document {
  constructor({
    start,
    duration,
    awayScore,
    homeScore,
    home,
    away,
    ...rest
  }) {
    super(rest);

    this.duration = duration;
    this.start = start;
    this.homeScore = homeScore;
    this.awayScore = awayScore;
    this.home = home;
    this.away = away;
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
